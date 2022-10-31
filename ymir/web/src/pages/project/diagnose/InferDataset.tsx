import getColumns from "@/components/table/Columns"
import useFetch from "@/hooks/useFetch"
import { InferDataset } from "@/interface/dataset"
import { Card, Table, TableColumnsType, TableColumnType } from "antd"
import React, { useEffect } from "react"
import { useParams } from "umi"

import s from './index.less'

const InferDataset: React.FC = () => {
  const { id: pid } = useParams<{ id?: string }>()
  const [{ items: datasets, total }, getDatasets] = useFetch('dataset/queryInferDatasets', { items: [], total: 0 })
  const cols = getColumns<InferDataset>('inferDataset')
  const actions: TableColumnType<InferDataset> = {
    dataIndex: 'action',
    title: 'action',
    
  }
  const columns = [
    ...cols,
  ]
  useEffect(() => getDatasets({ projectId: pid, }), [pid])
  return <div className={s.inferDataset}>
    <Card title="推理结果">
      <Table
        columns={columns}
        dataSource={datasets}
      />
    </Card>
  </div>
}

export default InferDataset
