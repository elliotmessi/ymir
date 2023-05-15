import { Actions } from '@/constants/log.actions'

type QueryParams = {
  pid?: number
  type?: number
  name?: string
  startTime?: string
  endTime?: string
  limit?: number
  offset?: number
  desc?: boolean
}

type WriteLogFromRequest = {
  type: Actions
  success?: boolean
  result?: any
  request?: any
  name?: string
}

type LogParams = {
  type: Actions
  content: string
  state?: number
  pid?: number
  tid?: number
}

export { QueryParams, LogParams, WriteLogFromRequest }
