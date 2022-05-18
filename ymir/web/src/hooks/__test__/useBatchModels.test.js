import { renderHook, act } from '@testing-library/react-hooks'
import useBatchModels from "../useBatchModels"
const mockDispatch = jest.fn(({ payload }) => payload)
jest.mock('umi', () => ({
  useDispatch() {
    return mockDispatch
  }
}))


describe('hooks: useBatchModels', () => {
  it('test normal progress.', async () => {
    const { result } = renderHook(() => useBatchModels())
    const ids = [1, 3, 4, 6]

    const [initModel, getModels] = result.current

    expect(initModel).toEqual([])

    await act(async () => {
      getModels(ids)
    })
    expect(result.current[0]).toEqual(ids)
  })
  it('test ids length === 0', async () => {
    const { result } = renderHook(() => useBatchModels())
    const [_, getModels] = result.current
    await act(async () => {
      getModels([])
    })
    expect(mockDispatch).toHaveBeenCalled()

    expect(result.current[0]).toEqual([])
  })
})
