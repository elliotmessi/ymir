import { Result } from "@/interface/common"

interface Stage {
  id: number,
  name: string,
  map: number,
}
export interface ModelGroup {
  id: number,
  projectId: number,
  name: string,
  createTime: string,
}
export interface ModelVersion extends Result {
  map: number,
  url: string,
  stages?: Array<Stage>,
  recommendStage: number,
}
