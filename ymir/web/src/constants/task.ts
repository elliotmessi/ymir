export enum TASKTYPES {
  TRAINING = 1,
  MINING = 2,
  LABEL = 3,
  FILTER = 4,
  IMPORT = 5,
  COPY = 7,
  MERGE = 8,
  INFERENCE = 15,
  FUSION = 11,
  MODELIMPORT = 13,
  MODELCOPY = 14,
  IMAGEIMPORT = 17,
  EXCLUDE = 18,
  SYS = 105,
}

export enum TASKSTATES {
  PENDING = 1,
  DOING = 2,
  FINISH = 3,
  FAILURE = 4,
  TERMINATED = 100,
}

export const isFinalState = (state: TASKSTATES) => {
  return [TASKSTATES.FINISH, TASKSTATES.FAILURE, TASKSTATES.TERMINATED].includes(state)
}

export const getTaskTypeLabel = (type: TASKTYPES) => {
  const prefix = 'task.type.'
  const maps: { [key: number]: string } = {
    [TASKTYPES.TRAINING]: 'task.type.train',
    [TASKTYPES.MINING]: 'task.type.mining',
    [TASKTYPES.LABEL]: 'task.type.label',
    [TASKTYPES.FUSION]: 'task.type.fusion',
    [TASKTYPES.FILTER]: 'task.type.filter',
    [TASKTYPES.MERGE]: 'task.type.merge',
    [TASKTYPES.COPY]: 'task.type.copy',
    [TASKTYPES.INFERENCE]: 'task.type.inference',
    [TASKTYPES.IMPORT]: 'task.type.import',
    [TASKTYPES.MODELIMPORT]: 'task.type.modelimport',
    [TASKTYPES.MODELCOPY]: 'task.type.modelcopy',
    [TASKTYPES.IMAGEIMPORT]: 'task.type.imageimport',
    [TASKTYPES.EXCLUDE]: 'task.type.exclude',
    [TASKTYPES.SYS]: 'task.type.sys',
  }
  return maps[type] ? `${prefix}${maps[type]}` : String(type)
}
