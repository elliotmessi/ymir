import { useEffect } from "react"
import useBatchModels from "../useBatchModels"
import { renderHook, act } from '@testing-library/react-hooks'

jest.mock('umi', () => ({
  useDispatch() {
    return jest.fn(ids => ids)
  }
}))

const batchModels = renderHook(() => useBatchModels())

describe('hooks: useBatchModels', () => {
  it('test normal progress.', async () => {
    const ids = [1,3,4,6]
    const { result: { current: [models, getModels] } } = batchModels()

    act(() => {
      getModels(ids)
    })
    expect(models).toEqual()
  })
})
