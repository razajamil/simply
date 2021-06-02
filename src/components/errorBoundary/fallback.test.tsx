import { render } from '@testing-library/react'
import { Fallback } from './fallback'

describe('Fallback', () => {
  it('should render text showing something went wrong', () => {
    const { getByText } = render(<Fallback />)

    expect(
      getByText(/Woops, we encountered an unexpected error/i)
    ).toBeDefined()
  })
})
