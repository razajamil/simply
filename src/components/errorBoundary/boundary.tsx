import React from 'react'
import { Fallback } from './fallback'

type Props = {
  children: React.ReactNode
}

type State = {
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

/**
 * renders a Fallback component on oncaught errors
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // log the error to error reporting services like Sentry

    this.setState({
      error,
      errorInfo,
    })
  }
  render() {
    const { error } = this.state

    if (error) {
      return <Fallback />
    }

    return this.props.children
  }
}
