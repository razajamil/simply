import { People } from './features/people'
import { Box } from '@material-ui/core'
import { ErrorBoundary } from './components/errorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <Box p={4} display='flex' flex='1' justifyContent='center'>
        <Box minWidth={400} maxWidth={1200} flex='1'>
          <People />
        </Box>
      </Box>
    </ErrorBoundary>
  )
}

export default App
