import { renderHook, act } from '@testing-library/react-hooks'
import useBatchModels from "../useBatchModels"

jest.mock('umi', () => ({
  useDispatch() {
    return jest.fn(({ payload }) => payload)
  }
}))

const { result } = renderHook(() => useBatchModels())

describe('hooks: useBatchModels', () => {
  it('test normal progress.', async () => {
    const ids = [1,3,4,6]

    expect(result.current[0]).toEqual([])

    await act(async () => {
      result.current[1](ids)
    })
    expect(result.current[0]).toEqual(ids)
  })
})
