import { render } from '@testing-library/react'
import { ErrorBoundary } from './boundary'

describe('ErrorBoundary', () => {
  it('should render children when no errors', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Im rendering</div>
      </ErrorBoundary>
    )

    expect(getByText(/im rendering/i)).toBeDefined()
  })

  it('should render fallback when children have uncaught errors', () => {
    const ComponentThatThrows = () => {
      throw new Error('I wreck stuff')
    }

    const { getByText } = render(
      <ErrorBoundary>
        <ComponentThatThrows />
      </ErrorBoundary>
    )

    expect(getByText(/Woops, we encountered an unexpected error/i)).toBeDefined()
  })
})
