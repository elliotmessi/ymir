import { renderHook, act } from '@testing-library/react-hooks'
import useAddKeywords from "../useAddKeywords"

jest.mock('umi', () => ({
  useDispatch() {
    return jest.fn(({ payload }) => ({ failed: ['person'] }))
  }
}))


const { result, rerender } = renderHook((dry_run) => useAddKeywords(dry_run))
describe('hooks: useAddKeywords', () => {
  const keywords = ['cat', 'dog', 'person']
  it('dry_run = false', async () => {

    const [_, add] = result.current
    const {repeated, newer} = result.current[0]

    expect(repeated).toEqual([])
    expect(newer).toEqual([])

    await act(async () => {
      add(keywords)
    })
    const { repeated: newRepeated, newer: newNewer } = result.current[0]
    
  })

  it('dry_run = true', async () => {

    rerender(true)

    expect(result.current[0]).toEqual([])

    await act(async () => {
      result.current[1](ids)
    })
    expect(result.current[0]).toEqual(ids)
  })
})
