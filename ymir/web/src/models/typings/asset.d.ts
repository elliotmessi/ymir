import { evaluationTags } from '@/constants/asset'
import { AssetQueryParams } from '@/services/typings/asset'

type Params = Omit<AssetQueryParams, 'cm'> & { cm?: evaluationTags; datasetKeywords?: string[] }

export { Params }
