import { FC } from 'react'
import t from '@/utils/t'
import { Space } from 'antd'
import EditNameBox from '@/components/form/editNameBox'
import { useRef } from 'react'
import { RefProps } from '../form/editBox'
import { EditIcon } from '@/components/common/Icons'

const GroupActions: FC<{ group: YModels.Group; fresh?: (g: YModels.Group) => void }> = ({ group, fresh }) => {
  const box = useRef<RefProps>(null)
  const edit = (record?: YModels.Group) => {
    box.current?.show()
  }
  return (
    <Space>
      <a onClick={() => edit()} title={t('common.modify')}>
        <EditIcon />
      </a>
      <EditNameBox ref={box} record={group} max={80} handle={fresh} />
    </Space>
  )
}

export default GroupActions
