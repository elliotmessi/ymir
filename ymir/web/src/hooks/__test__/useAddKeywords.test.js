import { renderHook, act } from '@testing-library/react-hooks'
import umi from 'umi'
import useAddKeywords from "../useAddKeywords"

const mockResult = { failed: ['person'] }
const mockDispatch = jest.fn()

jest.mock('umi', () => ({
  useDispatch() {
    return mockDispatch
  }
}))


describe('hooks: useAddKeywords', () => {
  const keywords = ['cat', 'dog', 'person']
  const normalTest = dry_run => it(`dry_run = ${dry_run}`, async () => {
    const { result } = renderHook(() => useAddKeywords(dry_run))
    mockDispatch.mockImplementationOnce(() => mockResult)

    const [_, add] = result.current
    const { repeated, newer } = result.current[0]

    // initial
    expect(repeated).toEqual([])
    expect(newer).toEqual([])

    await act(async () => {
      add(keywords)
    })
    const { repeated: newRepeated, newer: newNewer } = result.current[0]
    expect(mockDispatch).toHaveBeenCalled()
    expect(newRepeated).toEqual(mockResult.failed)
    expect(newNewer).toEqual(['cat', 'dog'])
  })
  normalTest()
  normalTest(false)
  normalTest(true)

  it('keyword length === 0', async () => {
    const { result } = renderHook((dry_run) => useAddKeywords(dry_run))
    mockDispatch = jest.fn()

    const [_, add] = result.current

    await act(async () => {
      add([])
    })
    const { repeated, newer } = result.current[0]
    expect(mockDispatch).toHaveBeenCalled(3)
    expect(repeated).toEqual([])
    expect(newer).toEqual([])
  })
})
