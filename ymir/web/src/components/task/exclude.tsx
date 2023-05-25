import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { Form, message } from 'antd'
import { useHistory, useParams } from 'umi'

import { formLayout } from '@/config/antd'
import t from '@/utils/t'
import { MergeType as DatasetMergeType } from '@/constants/dataset'
import useFetch from '@/hooks/useFetch'

import DatasetSelect from '@/components/form/datasetSelect'
import Desc from '@/components/form/desc'
import MergeType from '@/components/form/items/MergeType'
import SubmitButtons from './SubmitButtons'
import Dataset from '@/components/form/option/Dataset'

import { Dataset as DatasetType, Task } from '@/constants'

type Props = {
  did: number
  eid?: number[]
  bottom?: ReactNode
  ok?: (task: Task) => void
}
const { useWatch, useForm } = Form

const Merge: FC<Props> = ({ did, eid, ok = () => {} }) => {
  const [dataset, getDataset, setDataset] = useFetch('dataset/getDataset', {})
  const [mergeResult, merge] = useFetch('task/merge')
  const pageParams = useParams<{ id: string }>()
  const pid = Number(pageParams.id)
  const [form] = useForm()
  const [group, setGroup] = useState<number>()
  const excludes: number[] = useWatch('excludes', form)
  const type = useWatch('type', form)
  const selectedDataset = useWatch('dataset', form)

  const initialValues = {
    excludes: eid,
  }

  useEffect(() => {
    did && getDataset({ id: did })
  }, [did])

  useEffect(() => dataset.id && setGroup(dataset.groupId), [dataset])

  useEffect(() => {
    if (mergeResult) {
      ok(mergeResult)
      message.info(t('task.fusion.create.success.msg'))
    }
  }, [mergeResult])

  const onFinish = (values: any) => {
    const originDataset = did ? did : values.dataset
    let datasets = [originDataset, ...(values.includes || [])].filter((True) => True)

    const params = {
      ...values,
      group: type ? group : undefined,
      projectId: pid,
      datasets,
    }
    merge(params)
  }

  function filter(datasets: DatasetType[], ids: number[] = []) {
    return datasets.filter((ds) => ![...ids, did].includes(ds.id))
  }

  const originFilter = useCallback((datasets) => filter(datasets, excludes), [excludes])

  const excludesFilter = useCallback((datasets) => filter(datasets, [selectedDataset]), [selectedDataset])

  const generate2ExistGroup = (type: DatasetMergeType) => type === DatasetMergeType.Exist

  return (
    <Form form={form} name="mergeForm" {...formLayout} initialValues={initialValues} onFinish={onFinish}>
      <MergeType form={form} initialValue={DatasetMergeType.Exist} />
      {did ? (
        <Form.Item label={t('task.fusion.form.dataset')}>
          <Dataset dataset={dataset} />
        </Form.Item>
      ) : generate2ExistGroup(type) || dataset.id ? (
        <Form.Item name="dataset" label={t('task.fusion.form.dataset')} rules={[{ required: true }]}>
          <DatasetSelect
            pid={pid}
            onChange={(_, option) => {
              if (!Array.isArray(option)) {
                setDataset(option?.dataset || {})
                setGroup(option?.dataset?.groupId || undefined)
              }
            }}
            filters={originFilter}
          />
        </Form.Item>
      ) : null}
      <Form.Item label={t('task.fusion.form.merge.exclude.label')} name="excludes" tooltip={t('tip.task.merge.exclude')}>
        <DatasetSelect placeholder={t('task.fusion.form.datasets.placeholder')} mode="multiple" pid={pid} filters={excludesFilter} showArrow />
      </Form.Item>
      <Desc />
      <Form.Item wrapperCol={{ offset: 8 }}>
        <SubmitButtons />
      </Form.Item>
    </Form>
  )
}

export default Merge
