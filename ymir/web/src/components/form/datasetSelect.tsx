import type { DefaultOptionType } from 'antd/lib/select'
import type { FC, ReactNode } from 'react'

import { useEffect, useState } from 'react'
import { Col, ConfigProvider, Row, Select, SelectProps } from 'antd'
import { useSelector } from 'umi'

import t from '@/utils/t'
import useRequest from '@/hooks/useRequest'
import EmptyState from '@/components/empty/Dataset'
import Dataset from '@/components/form/option/Dataset'
import { Dataset as DatasetType } from '@/constants'

interface Props extends SelectProps<any, OptionType> {
  pid: number
  filter?: number[]
  allowEmpty?: boolean
  filters?: (ds: DatasetType[]) => DatasetType[]
  renderLabel?: (d: DatasetType) => ReactNode
  onReady?: Function
  extra?: ReactNode
  changeByUser?: boolean
}
interface DatasetOption extends DatasetType {
  disabled?: boolean
}
type OptionType = DefaultOptionType & {
  dataset?: DatasetType
}
const defaultLabelRender = (dataset: DatasetType) => <Dataset dataset={dataset} />

const DatasetSelect: FC<Props> = ({
  pid,
  filter = [],
  allowEmpty,
  filters,
  value,
  onChange = () => {},
  renderLabel = defaultLabelRender,
  onReady = () => {},
  extra,
  changeByUser,
  ...resProps
}) => {
  const datasets = useSelector(({ dataset }) => dataset.allDatasets[pid])
  const [options, setOptions] = useState<OptionType[]>([])
  const { run: getDatasets } = useRequest('dataset/queryAllDatasets', {
    debounceWait: 300,
    loading: false,
    cacheKey: 'datasetSelect',
    refreshDeps: [pid],
    ready: !!pid,
    onSuccess: () => {
      setVal(value)
    },
  })
  const [val, setVal] = useState(value)

  useEffect(() => setVal(value), [value])

  useEffect(() => {
    pid && fetchDatasets()
  }, [pid])

  useEffect(() => {
    onReady(datasets || [])
  }, [datasets])

  useEffect(() => {
    let selected = null
    if (options.length && value && !changeByUser) {
      if (resProps.mode) {
        selected = options.filter((opt) => value.includes(opt.value))
      } else {
        selected = options.find((opt) => value === opt.value)
      }
      if (selected) {
        onChange(value, selected)
      } else {
        onChange(undefined, [])
        setVal(undefined)
      }
    }
  }, [options])

  useEffect(() => {
    const needReload = datasets?.some((ds) => ds.needReload)
    if (needReload) {
      fetchDatasets()
    }
  }, [datasets])

  useEffect(() => {
    const list = datasets || []
    let dss: DatasetOption[] = filters ? filters(list) : list

    dss = allowEmpty ? dss : filterEmptyAsset(dss)
    const opts = dss.map((item) => {
      return {
        label: renderLabel(item),
        dataset: item,
        value: item.id,
        disabled: item.disabled,
      }
    })
    setOptions(opts)
  }, [filters, datasets])

  function fetchDatasets() {
    getDatasets({ pid, force: true })
  }

  function filterEmptyAsset(datasets: DatasetType[]) {
    return datasets.filter((ds) => ds.assetCount)
  }

  const select = (
    <ConfigProvider renderEmpty={() => <EmptyState />}>
      <Select
        value={val}
        placeholder={t('task.train.form.training.datasets.placeholder')}
        onChange={onChange}
        showArrow
        allowClear
        showSearch
        options={options}
        filterOption={(input, option) => option?.dataset?.name?.toLowerCase()?.indexOf(input.toLowerCase()) >= 0}
        {...resProps}
      ></Select>
    </ConfigProvider>
  )

  return extra ? (
    <Row gutter={20} wrap={false}>
      <Col flex={1}>{select}</Col>
      <Col>{extra}</Col>
    </Row>
  ) : (
    select
  )
}

export default DatasetSelect
