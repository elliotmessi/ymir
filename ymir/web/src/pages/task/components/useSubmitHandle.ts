import { useHistory, useParams } from 'umi'
import useFetch from '@/hooks/useFetch'

function useSubmitHandle(type = 'dataset') {
  const history = useHistory()
  const { id: pid } = useParams<{ id: string }>()
  const [_d, clearDatasetCache] = useFetch('dataset/clearCache')
  const [_m, clearModelCache] = useFetch('model/clearCache')

  const handle = (result: { [key: string]: any } = {}) => {
    const group = (result[`result_${type}`] || result || {})[`${type}_group_id`]
    let redirect = `/home/project/${pid}/${type}#${group || ''}`
    history.replace(redirect)
    clearModelCache()
    clearDatasetCache()
  }
  return handle
}

export default useSubmitHandle
