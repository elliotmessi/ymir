import React, { useEffect, useState } from "react"
import { connect } from "dva"
import { Select, Card, Input, Radio, Button, Form, Row, Col, ConfigProvider, Space, InputNumber, Tag, message } from "antd"
import { formLayout } from "@/config/antd"
import { useHistory, useParams, useLocation } from "umi"

import t from "@/utils/t"
import { string2Array, generateName } from '@/utils/string'
import { TYPES } from '@/constants/image'
import Breadcrumbs from "@/components/common/breadcrumb"
import EmptyState from '@/components/empty/dataset'
import EmptyStateModel from '@/components/empty/model'
import { randomNumber } from "@/utils/number"
import ImageSelect from "@/components/form/imageSelect"
import styles from "./index.less"
import commonStyles from "../common.less"
import ModelSelect from "@/components/form/modelSelect"
import KeywordRates from "@/components/dataset/keywordRates"
import CheckProjectDirty from "@/components/common/CheckProjectDirty"
import LiveCodeForm from "../components/liveCodeForm"
import { removeLiveCodeConfig } from "../components/liveCodeConfig"
import DockerConfigForm from "../components/dockerConfigForm"
import useFetch from '@/hooks/useFetch'
import TrainFormat from "../components/trainFormat"
import DatasetSelect from "../../../components/form/datasetSelect"

const { Option } = Select

const TrainType = [{ value: "detection", label: 'task.train.form.traintypes.detect', checked: true }]
const TrainDevices = [
  { value: false, label: 'task.train.device.local', checked: true, },
  { value: true, label: 'task.train.device.openpai', },
]

const duplicatedOptions = [
  { value: 1, label: 'task.train.duplicated.option.train' },
  { value: 2, label: 'task.train.duplicated.option.validation' }
]

function Train({ allDatasets, datasetCache, keywords, ...func }) {
  const pageParams = useParams()
  const pid = Number(pageParams.id)
  const history = useHistory()
  const location = useLocation()
  const { mid, image, iterationId, outputKey, currentStage, test } = location.query
  const stage = string2Array(mid)
  const did = Number(location.query.did)
  const [project, setProject] = useState({})
  const [selectedKeywords, setSelectedKeywords] = useState([])
  const [dataset, setDataset] = useState({})
  const [trainSet, setTrainSet] = useState(null)
  const [testSet, setTestSet] = useState(null)
  const [validationDataset, setValidationDataset] = useState(null)
  const [trainDataset, setTrainDataset] = useState(null)
  const [testingSetIds, setTestingSetIds] = useState([])
  const [form] = Form.useForm()
  const [seniorConfig, setSeniorConfig] = useState([])
  const [gpu_count, setGPU] = useState(0)
  const [projectDirty, setProjectDirty] = useState(false)
  const [live, setLiveCode] = useState(false)
  const [openpai, setOpenpai] = useState(false)
  const [duplicationChecked, setDuplicationChecked] = useState(false)
  const [strategy, setStrategy] = useState(0)
  const [allDuplicated, setAllDulplicated] = useState(false)
  const [duplicated, checkDuplication] = useFetch('dataset/checkDuplication', 0)
  const [sys, getSysInfo] = useFetch('common/getSysInfo', {})

  const renderRadio = (types) => <Radio.Group options={types.map(type => ({ ...type, label: t(type.label) }))} />

  useEffect(() => {
    getSysInfo()
    fetchProject()
  }, [])

  useEffect(() => {
    setGPU(sys.gpu_count)
    setOpenpai(!!sys.openpai_enabled)
  }, [sys])

  useEffect(() => {
    form.setFieldsValue({ openpai: openpai })
  }, [openpai])

  useEffect(() => {
    func.getKeywords({ limit: 100000 })
  }, [])

  useEffect(() => {
    const dss = allDatasets.filter(ds => ds.keywords.some(kw => project?.keywords?.includes(kw)))
    const isValid = dss.some(ds => ds.id === did)
    const visibleValue = isValid ? did : null
    setTrainSet(visibleValue)
    setTestingSetIds(project?.testingSets || [])
    form.setFieldsValue({ datasetId: visibleValue })
  }, [allDatasets, project])

  useEffect(() => {
    did && func.getDataset(did)
  }, [did])

  useEffect(() => {
    const dst = datasetCache[did]
    dst && setDataset(dst)
  }, [datasetCache])

  useEffect(() => {
    pid && func.getDatasets(pid)
  }, [pid])

  useEffect(() => {
    form.setFieldsValue({ hyperparam: seniorConfig })
  }, [seniorConfig])

  useEffect(() => {
    setDuplicationChecked(false)
    setAllDulplicated(false)
  }, [trainSet, testSet])

  useEffect(() => {
    if (duplicationChecked) {
      const allValidation = duplicated === validationDataset?.assetCount
      const allTrain = duplicated === trainDataset?.assetCount

      setStrategy(allValidation && !allTrain ? 2 : 1)
      setAllDulplicated(allValidation && allTrain)
    }
  }, [duplicationChecked, duplicated])

  async function fetchProject() {
    const project = await func.getProject(pid)
    project && setProject(project)
    setSelectedKeywords(project.keywords)
    form.setFieldsValue({ keywords: project.keywords })
  }

  function trainSetChange(value, option) {
    setTrainSet(value)
    setTrainDataset(option?.dataset)
  }
  function validationSetChange(value, option) {
    setTestSet(value)
    setValidationDataset(option?.dataset)
  }

  function imageChange(_, image = {}) {
    const { configs } = image
    const configObj = (configs || []).find(conf => conf.type === TYPES.TRAINING) || {}
    setLiveCode(image.liveCode || false)
    setConfig(removeLiveCodeConfig(configObj.config))
  }

  function setConfig(config = {}) {
    const params = Object.keys(config).filter(key => key !== 'gpu_count').map(key => ({ key, value: config[key] }))
    setSeniorConfig(params)
  }

  const onFinish = async (values) => {

    const config = {
      ...values.hyperparam?.reduce(
        (prev, { key, value }) => key && value ? { ...prev, [key]: value } : prev,
        {}),
      ...(values.live || {}),
    }
    values.trainFormat && (config['export_format'] = values.trainFormat)

    const gpuCount = form.getFieldValue('gpu_count')

    config['gpu_count'] = gpuCount || 0

    const img = (form.getFieldValue('image') || '').split(',')
    const imageId = Number(img[0])
    const image = img[1]
    const params = {
      ...values,
      strategy,
      name: 'group_' + randomNumber(),
      projectId: pid,
      keywords: iterationId ? project.keywords : values.keywords,
      image,
      imageId,
      config,
    }
    const result = await func.createTrainTask(params)
    if (result) {
      if (iterationId) {
        func.updateIteration({ id: iterationId, currentStage, [outputKey]: result.result_model.id })
      }
      await func.clearCache()
      const group = result.result_model?.model_group_id || ''
      history.replace(`/home/project/${pid}/model#${group}`)
    }
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo)
  }

  async function checkDuplicated() {
    if (trainSet && testSet) {
      await checkDuplication({ pid, trainSet, validationSet: testSet })
      setDuplicationChecked(true)
    }
  }

  const duplicatedRender = () => {
    const allValidation = duplicated === validationDataset?.assetCount
    const allTrain = duplicated === trainDataset?.assetCount
    const disabled = allValidation ? 1 : (allTrain ? 2 : null)
    return duplicated ? (allDuplicated ? t('task.train.action.duplicated.all') : <div>
      <span>{t('task.train.duplicated.tip', { duplicated })}</span>
      <Radio.Group
        value={strategy}
        onChange={({ target: { value } }) => setStrategy(value)}
        options={duplicatedOptions.map(opt => ({ ...opt, disabled: disabled === opt.value, label: t(opt.label) }))}
      />
    </div>) : t('task.train.action.duplicated.no')
  }

  const matchKeywords = dataset => dataset.keywords.some(kw => selectedKeywords.includes(kw))
  const trainsetFilters = datasets => datasets.filter(ds => {
    const notTestSet = ds.id !== testSet
    const notTestingSet = !testingSetIds.includes(ds.id)
    return matchKeywords(ds) && notTestSet && notTestingSet
  })

  const validationSetFilters = datasets => datasets.filter(ds => {
    const notTrainSet = ds.id !== trainSet
    return matchKeywords(ds) && notTrainSet
  })

  const getCheckedValue = (list) => list.find((item) => item.checked)["value"]
  const initialValues = {
    name: generateName('train_model'),
    datasetId: did ? did : undefined,
    testset: Number(test) ? Number(test) : undefined,
    image: image ? parseInt(image) : undefined,
    modelStage: stage,
    trainType: getCheckedValue(TrainType),
    openpai: getCheckedValue(TrainDevices),
    gpu_count: 1,
  }
  return (
    <div className={commonStyles.wrapper}>
      <Breadcrumbs />
      <Card className={commonStyles.container} title={t('breadcrumbs.task.training')}>
        <div className={commonStyles.formContainer}>
          <CheckProjectDirty style={{ marginBottom: 20, width: '100%' }} pid={pid} initialCheck={true} callback={(dirty) => setProjectDirty(dirty)} />
          <Form
            name='trainForm'
            className={styles.form}
            {...formLayout}
            form={form}
            initialValues={initialValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label={t('dataset.column.model')}
              name='name'
              rules={[
                { required: true, whitespace: true, message: t('model.add.form.name.placeholder') },
                { type: 'string', min: 2, max: 80 },
              ]}
            >
              <Input placeholder={t('model.add.form.name.placeholder')} autoComplete='off' allowClear />
            </Form.Item>
            
            <Form.Item name='image' label={t('task.train.form.image.label')} rules={[
              { required: true, message: t('task.train.form.image.required') }
            ]} tooltip={t('tip.task.train.image')}>
              <ImageSelect placeholder={t('task.train.form.image.placeholder')} onChange={imageChange} />
            </Form.Item>

            {openpai ? <Form.Item label={t('task.train.form.platform.label')} name='openpai'>
              {renderRadio(TrainDevices)}
            </Form.Item> : null}

            <ConfigProvider renderEmpty={() => <EmptyState add={() => history.push(`/home/dataset/add/${pid}`)} />}>
              <Form.Item
                label={t('task.train.form.trainsets.label')}
                required
                name="datasetId"
                rules={[
                  { required: true, message: t('task.train.form.trainset.required') },
                ]}
              >
                <DatasetSelect
                  pid={pid}
                  filters={trainsetFilters}
                  onChange={trainSetChange}
                />
              </Form.Item>
              {trainSet ?
                <Form.Item label={t('dataset.train.form.samples')}>
                  <KeywordRates dataset={trainSet}></KeywordRates>
                </Form.Item> : null}
              <Form.Item
                label={t('task.train.form.testsets.label')}
                name="testset"
                rules={[
                  { required: true, message: t('task.train.form.testset.required') },
                ]}
                tooltip={t('tip.task.filter.testsets')}
                extra={duplicationChecked ? duplicatedRender() : null}
              >
                <DatasetSelect
                  pid={pid}
                  filters={validationSetFilters}
                  placeholder={t('task.train.form.test.datasets.placeholder')}
                  onChange={validationSetChange}
                  extra={<Button disabled={!trainSet || !testSet} type="primary" onClick={checkDuplicated}>{t('task.train.action.duplicated')}</Button>}
                />
              </Form.Item>
            </ConfigProvider>
            {iterationId ? <Form.Item label={t('task.train.form.keywords.label')}>
              {project?.keywords?.map(keyword => <Tag key={keyword}>{keyword}</Tag>)}
            </Form.Item> :
              <Form.Item
                label={t('task.train.form.keywords.label')}
                name="keywords"
                rules={[
                  { required: true, message: t('project.add.form.keyword.required') }
                ]}
                tooltip={t('tip.task.filter.keywords')}
              >
                <Select mode="multiple" showArrow
                  placeholder={t('project.add.form.keyword.required')}
                  onChange={setSelectedKeywords}
                  filterOption={(value, option) => [option.value, ...(option.aliases || [])].some(key => key.indexOf(value) >= 0)}>
                  {keywords.map(keyword => (
                    <Select.Option key={keyword.name} value={keyword.name} aliases={keyword.aliases}>
                      <Row>
                        <Col flex={1}>{keyword.name}</Col>
                      </Row>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>}
            <ConfigProvider renderEmpty={() => <EmptyStateModel id={pid} />}>
              <Form.Item
                label={t('task.detail.label.premodel')}
                name="modelStage"
                tooltip={t('tip.task.train.model')}
              >
                <ModelSelect placeholder={t('task.train.form.model.placeholder')} pid={pid} />
              </Form.Item>
            </ConfigProvider>

            <Form.Item
              hidden
              label={t('task.train.form.traintype.label')}
              name="trainType"
            >
              {renderRadio(TrainType)}
            </Form.Item>

            <Form.Item
              label={t('task.gpu.count')}
              tooltip={t('tip.task.filter.gpucount')}
            >
              <Form.Item noStyle name="gpu_count">
                <InputNumber min={0} max={gpu_count} precision={0} />
              </Form.Item>
              <span style={{ marginLeft: 20 }}>{t('task.gpu.tip', { count: gpu_count })}</span>
            </Form.Item>
            <Form.Item hidden={!live} label={t('task.train.export.format')} tooltip={t('tip.train.export.format')} name='trainFormat' initialValue={'ark:raw'}>
              <TrainFormat />
            </Form.Item>
            <LiveCodeForm form={form} live={live} />
            <DockerConfigForm seniorConfig={seniorConfig} form={form} />
            <Form.Item wrapperCol={{ offset: 8 }}>
              <Space size={20}>
                <Form.Item name='submitBtn' noStyle>
                  <Button type="primary" size="large" disabled={projectDirty || allDuplicated} htmlType="submit">
                    {t('common.action.train')}
                  </Button>
                </Form.Item>
                <Form.Item name='backBtn' noStyle>
                  <Button size="large" onClick={() => history.goBack()}>
                    {t('task.btn.back')}
                  </Button>
                </Form.Item>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  )
}

const props = (state) => {
  return {
    allDatasets: state.dataset.allDatasets,
    datasetCache: state.dataset.dataset,
    keywords: state.keyword.keywords.items,
  }
}

const dis = (dispatch) => {
  return {
    getProject(id) {
      return dispatch({
        type: "project/getProject",
        payload: { id },
      })
    },
    getDatasets(pid, force = true) {
      return dispatch({
        type: "dataset/queryAllDatasets",
        payload: { pid, force },
      })
    },
    getDataset(id, force) {
      return dispatch({
        type: "dataset/getDataset",
        payload: { id, force },
      })
    },
    clearCache() {
      return dispatch({ type: "model/clearCache", })
    },
    createTrainTask(payload) {
      return dispatch({
        type: "task/createTrainTask",
        payload,
      })
    },
    updateIteration(params) {
      return dispatch({
        type: 'iteration/updateIteration',
        payload: params,
      })
    },
    getKeywords() {
      return dispatch({
        type: 'keyword/getKeywords',
        payload: { limit: 10000 },
      })
    },
  }
}

export default connect(props, dis)(Train)
