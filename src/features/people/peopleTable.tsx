import { ApiStatus } from '../../resources/api'
import { Person } from '../../resources/people'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { Box, CircularProgress } from '@material-ui/core'

type PeopleTableProps = {
  people: Array<Person>
  page: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextPage: () => void
  previousPage: () => void
  apiStatus: ApiStatus
  selectedPerson?: Person
  onClickPerson: (person: Person) => void
}

/**
 * renders list of people
 * allows navigation back and forth between pages of people
 *
 * TODO: Part of this component can be extracted to create a reusable paginated table */
export const PeopleTable = (props: PeopleTableProps) => {
  const {
    people,
    apiStatus,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    selectedPerson,
    onClickPerson,
  } = props

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box minHeight={587} display='flex' flex='1'>
          {people.length ? (
            <TableContainer component={Paper}>
              <Table aria-label='star wars cast'>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align='right'>Height (cm)</TableCell>
                    <TableCell align='right'>Mass</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {people.map((person) => (
                    <TableRow
                      aria-label={`view ${person.name}'s details button`}
                      key={person.url}
                      selected={selectedPerson?.url === person.url}
                      hover={true}
                      style={{ cursor: 'pointer' }}
                      onClick={() => onClickPerson(person)}
                    >
                      <TableCell component='th' scope='row'>
                        {person.name}
                      </TableCell>
                      <TableCell align='right'>{person.height}</TableCell>
                      <TableCell align='right'>{person.mass}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              flex='1'
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Grid>

      <Grid item container justify='flex-end' xs={12}>
        <Box marginTop={2}>
          <ButtonGroup color='primary'>
            <Button
              aria-label='previous page'
              disabled={!hasPreviousPage}
              onClick={previousPage}
            >
              Previous
            </Button>
            <Button
              aria-label='next page'
              disabled={apiStatus === 'loading' || !hasNextPage}
              onClick={nextPage}
            >
              Next
            </Button>
          </ButtonGroup>
        </Box>
      </Grid>
    </Grid>
  )
}
