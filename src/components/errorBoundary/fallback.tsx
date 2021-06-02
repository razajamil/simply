/**
 * basic fallback that gives user option to reload the window
 * uses basic html and css to make sure there are no issues with the fallback itself as this is an absolute last resort
 *
 * TODO: Better looking fallback can be nested in another ErrorBoundary
 */
export const Fallback = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h3>Woops, we encountered an unexpected error.</h3>
      <div>
        <button onClick={() => window.location.reload()}>
          Click here to try again
        </button>
      </div>
    </div>
  )
}
