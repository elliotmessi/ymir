import { ComponentProps, FC, useEffect } from 'react'
import { Col, Row, Space, Tag } from 'antd'

import t from '@/utils/t'
import { invalidState } from '@/constants/common'

import ObjectTypeTag from '@/components/project/ObjectTypeTag'
import VersionName from '@/components/result/VersionName'
import StateTag from '@/components/task/StateTag'
import useModal from '@/hooks/useModal'
import DatasetMoreInfo from './DatasetMoreInfo'
import { MoreIcon } from '@/components/common/Icons'
import { Prediction } from '@/constants'

const DatasetInfo: FC<{ dataset?: Prediction | YModels.Dataset }> = ({ dataset }) => {
  if (!dataset) {
    return null
  }
  const pred = 'pred' in dataset
  const inferClass = pred ? dataset?.inferClass : []
  const [MoreInfoModal, showMoreInfo] = useModal<ComponentProps<typeof DatasetMoreInfo>>(DatasetMoreInfo, {
    width: '50%',
    bodyStyle: { padding: 20 },
  })
  useEffect(() => {
    showMoreInfo(false)
  }, [dataset])
  return (
    <>
      <div>
        <Space wrap={true}>
          {!pred ? (
            <strong>
              <VersionName result={dataset} />
            </strong>
          ) : null}
          <span>{t('dataset.detail.pager.total', { total: dataset.assetCount })}</span>
          <ObjectTypeTag type={dataset.type} />
          {!pred && invalidState(dataset.state) ? <StateTag mode={'icon'} state={dataset.state} code={dataset.task.error_code} /> : null}
          {!pred ? (
            <span onClick={() => showMoreInfo()}>
              <MoreIcon />
            </span>
          ) : null}
          {pred && inferClass ? (
            <div>
              {t('dataset.detail.infer.class')}
              {inferClass?.map((cls) => (
                <Tag key={cls}>{cls}</Tag>
              ))}
            </div>
          ) : null}
        </Space>
      </div>
      <MoreInfoModal key={dataset.id} task={dataset.task} />
    </>
  )
}

export default DatasetInfo
