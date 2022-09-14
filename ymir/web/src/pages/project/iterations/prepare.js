import { useEffect, useState } from "react"
import { Row, Col, Form, Button } from "antd"
import { useLocation } from 'umi'
import { connect } from "dva"

import t from '@/utils/t'
import useFetch from '@/hooks/useFetch'

import s from "./iteration.less"
import Stage from "./prepareStage"
import generateStages from "./generateStages"

function Prepare({ project = {}, fresh = () => { }, ...func }) {
  const location = useLocation()
  const [validPrepare, setValidPrepare] = useState(false)
  const [id, setId] = useState(null)
  const [stages, setStages] = useState([])
  const [result, updateProject] = useFetch('project/updateProject')
  const [mergeResult, merge] = useFetch('task/merge')
  const [createdResult, createIteration] = useFetch('iteration/createIteration')
  const [form] = Form.useForm()

  useEffect(() => {
    project.id && setId(project.id)
    project.id && updatePrepareStatus()
  }, [project])

  useEffect(() => setStages(generateStages(project)), [project])

  useEffect(() => {
    if (result) {
      fresh(result)
    }
  }, [result])

  useEffect(() => {
    if (mergeResult) {
      updateAndCreateIteration(mergeResult.id)
    }
  }, [mergeResult])

  useEffect(() => {
    if (createdResult) {
      fresh(createdResult)
      window.location.reload()
    }
  }, [createdResult])

  const formChange = (value, values) => {
    updateProject({ id, ...value })
    updatePrepareStatus(values)
  }

  function create() {
    const params = {
      iterationRound: 1,
      projectId: project.id,
      prevIteration: 0,
      testSet: project?.testSet?.id,
    }
    createIteration(params)
  }

  async function updateAndCreateIteration(trainSetVersion) {
    const updateResult = updateProject({ id, trainSetVersion })
    if (updateResult) {
      create()
    }
  }

  function mergeTrainSet() {
    const params = {
      projectId: id,
      group: project.trainSet.id,
      datasets: [project.candidateTrainSet, project.trainSetVersion],
    }
    merge(params)
  }

  function updatePrepareStatus() {
    const fields = stages.filter(stage => !stage.option).map(stage => stage.field)
    const valid = fields.every(field => project[field]?.id || project[field])
    setValidPrepare(valid)
  }

  function start() {
    if (project.candidateTrainSet) {
      mergeTrainSet()
    } else {
      createIteration()
    }
  }

  return (
    <div className={s.iteration}>
      <Form layout="vertical" form={form} onValuesChange={formChange}>
        <Row style={{ justifyContent: 'flex-end' }}>
          {stages.map((stage, index) => (
            <Col key={stage.field} span={6}>
              <Stage stage={stage} form={form} project={project} pid={id} />
            </Col>
          ))}
        </Row>
        <div className={s.createBtn}>
          <Button type='primary' disabled={!validPrepare} onClick={start}>{t('project.prepare.start')}</Button>
        </div>
      </Form>
    </div>
  )
}

export default Prepare
