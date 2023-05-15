import { TASKTYPES } from '../task'

type QueueItem = {
  total: number
  index: number
  id: number
  hash: string
  time: string
  duration: string
  gpuCount: number
  type: TASKTYPES
  typeLabel: string
  userId: number
  userName?: string
}
type Queue = QueueItem[]

export { Queue, QueueItem }
