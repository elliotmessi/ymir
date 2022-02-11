import { Parameter } from "./parameter";

enum Type {
  TRAINING = 1,
  MINING = 2,
  LABEL = 3,
  FILTER = 4,
  IMPORT = 5,
}
export interface Dataset {
  id: number,
  name: string,
  hash: string,
  type: Type,
  state: number,
  assetCount: number,
  keywordCount: number,
  taskId: number,
  createDatetime: number,
  updateDatetime: number,
  parameters: Parameter,
  config: Array<Object>,
  keywords: Array<string>,
  ignoredKeywords: Array<string>,
  source: Type,
  progress: number,
}