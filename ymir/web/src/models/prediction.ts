import { diffTime } from '@/utils/date'
import { actions } from '@/constants/common'
import { transferPrediction } from '@/constants/prediction'
import { batchAct, evaluate, getPrediction, getPredictions } from '@/services/prediction'
import { createEffect, createReducers, transferList } from './_utils'
type PredictionsPayload = { pid: number; force?: boolean; [key: string]: any }
type PredictionPayload = { id: number; force?: boolean }

const reducersList = [
  { name: 'UpdatePredictions', field: 'predictions' },
  { name: 'UpdatePrediction', field: 'prediction' },
]

const hideAction = (type: actions) =>
  createEffect<{ pid: number; ids: number[] }>(function* ({ payload: { pid, ids = [] } }, { call, put }) {
    const { code, result } = yield call(batchAct, type, pid, ids)
    if (code === 0) {
      return result
    }
  })

const PredictionModel: YStates.PredictionStore = {
  namespace: 'prediction',
  state: {
    predictions: {},
    prediction: {},
  },
  effects: {
    getPredictions: createEffect<PredictionsPayload>(async function ({ payload }, { call, select, put }) {
      const { pid, force, ...params } = payload
      if (!force) {
        const list = await select(({ prediction }) => prediction.predictions[pid])
        if (list) {
          return list
        }
      }
      const { code, result } = await call<YModels.Response<YModels.ResponseResultList>>(getPredictions, { pid, ...params })
      if (code === 0 && result) {
        type originData = YModels.BackendData & { create_datatime: string }
        const sorter = (a: originData, b: originData) => diffTime(b.create_datetime, a.create_datetime)
        const groupByModel = ({ items, total }: YModels.ResponseResultList) => ({
          items: Object.values(items)
            .map((list) =>
              list.sort(sorter).map((item: originData, index: number) => ({
                ...item,
                rowSpan: index === 0 ? list.length : 0,
              })),
            )
            .sort(([a], [b]) => sorter(a, b))
            .map((its, index) => its.map((it: originData) => ({ ...it, odd: index % 2 === 0 })))
            .flat(),
          total,
        })

        const listResponse = groupByModel(result)
        const predictions = transferList<YModels.Prediction>(listResponse, transferPrediction)

        const getIds = (key: keyof YModels.InferenceParams) => {
          const ids = predictions.items
            .map((ds) => {
              const param = ds.task?.parameters || {}
              return param[key]
            })
            .filter((notEmpty) => notEmpty)
          return [...new Set(ids)]
        }
        const modelIds = getIds('model_id')
        const datasetIds = getIds('dataset_id')
        if (modelIds.length) {
          await put({
            type: 'model/batchLocalModels',
            payload: modelIds,
          })
        }
        if (datasetIds.length) {
          await put({
            type: 'dataset/batchLocalDatasets',
            payload: { pid, ids: datasetIds },
          })
        }
        await put({
          type: 'updatePredictions',
          payload: predictions,
        })
        return predictions
      }
    }),
    getPrediction: createEffect<PredictionPayload>(function* ({ payload }, { call, select, put }) {
      const { id, force } = payload
      if (!force) {
        const pred = yield select(({ prediction }) => prediction.prediction[id])
        if (pred) {
          return pred
        }
      }
      const { code, result } = yield call(getPrediction, id)
      if (code === 0) {
        const prediction = transferPrediction(result)

        if (prediction.projectId) {
          const presult = yield put.resolve<{ id: number }, YModels.Project>({
            type: 'project/getProject',
            payload: { id: prediction.projectId },
          })
          if (presult) {
            prediction.project = presult
          }
        }
        yield put({
          type: 'updatePrediction',
          payload: { id: prediction.id, prediction },
        })
        return prediction
      }
    }),
    getHiddenList: createEffect<PredictionsPayload>(function* ({ payload }, { put }) {
      const query = { order_by: 'update_datetime', ...payload, visible: false }
      return yield put({
        type: 'getPredictions',
        payload: query,
      })
    }),

    hide: hideAction(actions.hide),
    restore: hideAction(actions.restore),

    evaluate: createEffect<YParams.EvaluationParams>(function* ({ payload }, { call, put }) {
      const { code, result } = yield call(evaluate, payload)
      if (code === 0) {
        return result
      }
    }),
  },
  reducers: createReducers(reducersList),
}

export default PredictionModel
