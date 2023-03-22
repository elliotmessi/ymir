import { useEffect, useState } from 'react'
import { useSelector } from 'umi'
type Result = YModels.Result | YModels.Result[]
const useSyncState = <DataType extends Result>(fresh: Function) => {
  const [data, setData] = useState<DataType>()

  const tasks = useSelector(({ socket }) => socket.tasks)

  useEffect(() => {
    if (!tasks || !data) {
      return
    }
    let syncData = Array.isArray(data) ? data : [data]
    const matchData = syncData.filter((dt) => tasks.some((task) => task.hash === dt.hash))
    const updatedData = matchData.map((dt) => {
      const task = tasks.find((tk) => tk.hash === dt.hash)
      // if (task?.reload) {
      //   return fresh()
      // }
      return task
        ? {
            ...dt,
            state: task.result_state,
            progress: task.percent,
            taskState: task.state,
            task: { state: task.state, percent: task.percent },
          }
        : undefined
    })
  }, [tasks])

  return [data, setData]
}

export default useSyncState
