import { Stages, StageList } from '@/constants/iteration'
import Fusion from "@/components/task/fusion"
import { useEffect, useState } from 'react'
import useFetch from '@/hooks/useFetch'
import { Space } from 'antd'

const Action = (Comp) => (props) => <Comp {...props} />

const StepAction = ({ stages, iteration, project, prevIteration }) => {
  const [updated, updateIteration] = useFetch('iteration/updateIteration')
  const result = useSelector(({ dataset, model }) => {
    const isModel = currentContent?.value === Stages.training
    const res = isModel ? model.model: dataset.dataset
    return res[currentContent?.result] || {}
  })

  const comps = {
    [Stages.prepareMining]: {
      comp: Fusion, query: {
        did: project.miningSet?.id,
        merging: project.miningSet.id || 0,
        strategy: project.miningStrategy,
        chunk: project.chunkSize || undefined,
      },
    },
    [Stages.mining]: {
      comp: Fusion, query: {
        did: iteration.miningSet,
        mid: prevIteration.id ? [prevIteration.model, null] : project.modelStage,
      },
    },
    [Stages.labelling]: {
      comp: Fusion, query: {
        did: iteration.miningResult,
      },
    },
    [Stages.merging]: {
      comp: Fusion, query: {
        did: prevIteration.trainUpdateSet || project.trainSetVersion,
        mid: iteration.labelSet,
      },
    },
    [Stages.training]: {
      comp: Fusion, query: {
        did: iteration.trainUpdateSet,
        test: iteration.testSet,
      },
    },
    [Stages.next]: {
      comp: Fusion, query: {}
    },
  }
  const contents = stages.reduce((prev, stage) => {
    return {
      ...prev,
      [stage.value]: {
        ...stage,
        ...comps[stage.value],
      }
    }
  }, {})
  const fixedQuery = {
    iterationId: iteration.id,
    currentStage: iteration.currentStage,
    from: 'iteration'
  }
  const [currentContent, setCurrentContent] = useState(null)

  useEffect(() => {
    iteration?.currentStage && setCurrentContent(contents[iteration.currentStage])
  }, [iteration?.currentStage])

  useEffect(() => {
    if (updated) {
      message.info(t('task.fusion.create.success.msg'))
      clearCache()
      history.replace(`/home/project/${pid}/iterations`)
    }
  }, [updated])

  const CurrentAction = Action(currentContent?.comp || Fusion)

  const next = (result) => {
    if (!currentContent.next) {
      // next iteration
      callback({
        type: 'create',
        data: {
          round: project.round + 1,
        },
      })
    } else {
      // next
      callback({
        type: 'update',
        params: {
          id: iteration.id,
          currentStage: currentContent.next,
        },
      })
    }
  }

  const skip = () => {
    // skip
    callback({
      type: 'skip',
      params: {
        id: iteration.id,
        currentStage: stages.next,
        [currentContent.output]: 0,
      }
    })
  }

  const ok = (result) => {
    // update current stage
    callback({
      type: 'update',
      params: {
        id: iteration.id,
        currentStage: currentContent.value,
        [currentContent.output]: result.id,
      }
    })
  }

  return currentContent ?
    <CurrentAction
      step={currentContent}
      result={result}
      {...fixedQuery}
      {...(currentContent?.query || {})}
      ok={ok}
      next={next}
      skip={skip}
    /> : null
}

export default StepAction
