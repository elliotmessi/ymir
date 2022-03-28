import React, { useEffect, useState } from "react"
import { Card, Space } from "antd"
import { useLocation, useParams, connect } from "umi"

import t from "@/utils/t"
import Breadcrumbs from "@/components/common/breadcrumb"
import Iteration from './components/iteration'
import Datasets from '@/components/dataset/list'
import Models from '@/components/model/list'

import s from "./detail.less"
import Prepare from "./components/prepare"

const tabsTitle = [
  { tab: t('project.tab.set.title'), key: 'set', },
  { tab: t('project.tab.model.title'), key: 'model', },
]

function ProjectDetail(func) {
  const location = useLocation()
  const { id } = useParams()
  const [project, setProject] = useState({})
  const [active, setActive] = useState(tabsTitle[0].key)
  const content = {
    'set': <Datasets pid={id} />,
    'model': <Models pid={id} />
  }

  useEffect(() => {
    id && fetchProject()
  }, [id])

  useEffect(() => {
    const locationHash = location.hash.replace(/^#/, '')
    if (locationHash) {
      setActive(locationHash)
    }
  }, [location.hash])

  async function fetchProject(force) {
    const result = await func.getProject(id, force)
    if (result) {
      setProject(result)
    }
  }

  return (
    <div className={s.projectDetail}>
      <Breadcrumbs />
      <div className={s.header}>
        <Space className={s.detailPanel}>
          <span className={s.name}>{project.name}</span>
          <span className={s.iterationInfo}>{t('project.detail.info.iteration', { current: project.currentStage, target: project.targetIteration })}</span>
          <span>{t('project.train_classes')}: {project?.keywords?.join(',')}</span>
          <span>{t('project.target.map')}: {project.targetMap}</span>
          <span>{project.description}</span>
        </Space>
        {project.round > 0 ?
          <Iteration project={project} /> : <Prepare project={project} callback={() => fetchProject(true)} />}
      </div>
      <Card tabList={tabsTitle} activeTabKey={active} onTabChange={(key) => setActive(key)}
        style={{ margin: '-20px -5vw 0', background: 'transparent' }}
        headStyle={{ padding: '0 5vw', background: '#fff', marginBottom: '20px' }}
        bodyStyle={{ padding: '0 5vw' }}>
        {content[active]}
      </Card>
    </div>
  )
}


const actions = (dispacth) => {
  return {
    getProject(id, force) {
      return dispacth({
        type: 'project/getProject',
        payload: { id, force },
      })
    }
  }
}

export default connect(null, actions)(ProjectDetail)
