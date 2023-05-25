import React from 'react'
import { Form, Card } from 'antd'
import { Location, useLocation } from 'umi'

import t from '@/utils/t'

import Breadcrumbs from '@/components/common/breadcrumb'

import commonStyles from '../common.less'
import Exclude from '@/components/task/exclude'
import useSubmitHandle from '../components/useSubmitHandle'

function MergePage() {
  const location: Location = useLocation()
  const query = location.query || {}
  const did = Number(query.did)
  const eid = query.eid ? (query.eid as string).split(',').map(Number) : undefined
  const submitHandle = useSubmitHandle()

  return (
    <div className={commonStyles.wrapper}>
      <Breadcrumbs />
      <Card className={commonStyles.container} title={t('task.fusion.header.merge')}>
        <Exclude did={did} eid={eid} ok={submitHandle} />
      </Card>
    </div>
  )
}

export default MergePage
