import { useEffect } from "react"
import useBatchModels from "../useBatchModels"
import { renderHook } from '@testing-library/react-hooks'

jest.mock('umi', () => ({
  useDispatch() {
    return jest.fn(ids => ids)
  }
}))

describe('hooks: useBatchModels', () => {
  it('test normal progress.', () => {
    const ids = [1,3,4,6]
    const [models, getModels] = useBatchModels()
    getModels(ids)
    useEffect(() => {
      if (models.length) {
        expect(models).toEqual(ids)
      }
    }, [models])
  })
})
