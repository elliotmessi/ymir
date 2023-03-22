import { useDispatch } from 'umi'
import { useRequest as useAhRequest } from 'ahooks'
import { useEffect } from 'react'

type Options<D, P extends any[]> = Parameters<typeof useAhRequest<D, P>>[1] & {
  loading?: boolean
}

const useRequest = <TData, TParams extends any[] = [params?: { [key: string]: any }]>(effect: string, options: Options<TData, TParams> = {}) => {
  const dispatch = useDispatch()
  const { loading = true } = options
  const setLoading = (loading: Boolean) =>
    dispatch({
      type: 'common/setLoading',
      payload: loading,
    })

  const fetch = <D, P>(...args: P[]): Promise<D> => {
    const payload = args[0]
    return dispatch({
      type: effect,
      payload,
    })
  }
  const defaultOpts = {
    manual: true,
  }
  const request = useAhRequest<TData, TParams>(fetch, { ...defaultOpts, ...options })

  useEffect(() => {
    setLoading(loading ? true : !request.loading)
  }, [request.loading])

  return request
}

export default useRequest
