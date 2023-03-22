import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'antd'

type Props = {
  gid: number
  selectChange: (keys: number[]) => void
}

const DatasetItems: FC<Props> = ({ gid, selectChange }) => {
  const versions = useSelector<YStates.Root, YModels.Dataset[]>(({ dataset }) => dataset.versions[gid])
  const columns = getColumns(gid)
  const [selected, setSelected] = useState<number[]>([])

  useEffect(() => selectChange(selected), [selected])

  return (
    <Table
      dataSource={versions}
      // onChange={tableChange}
      rowKey={(record) => record.id}
      rowSelection={{
        selectedRowKeys: selected,
        onChange: (keys) => setSelected(keys as number[]),
      }}
      rowClassName={(record, index) => (index % 2 === 0 ? '' : 'oddRow')}
      columns={columns}
      pagination={false}
    />
  )
}

export default DatasetItems
