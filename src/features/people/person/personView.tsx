import { PersonFilms } from './personFilm'
import { Person as PersonType } from '../../../resources/people'
import { PersonAttribute } from './personAttribute'
import {
  Box,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core'

type PersonProps = {
  person: PersonType
}

/**
 * renders a Person's details and films
 */
export const PersonView = (props: PersonProps) => {
  const { person } = props

  return (
    <Box width='100%' marginTop={2}>
      <Card>
        <CardContent>
          <Typography variant='h5'>Detail section</Typography>
          <Box marginTop={1.5}>
            <Grid container>
              <PersonAttribute label='Name' value={person.name} />
              <PersonAttribute label='Birth year' value={person.birthYear} />
              <PersonAttribute label='Height (cm)' value={person.height} />
              <PersonAttribute label='Gender' value={person.gender.toLocaleUpperCase()} />
              <Grid item xs={12}>
                <Box marginTop={3}>
                  <PersonAttribute
                    label='Films'
                    value={
                      person.films.length ? (
                        <PersonFilms films={person.films} />
                      ) : (
                        <CircularProgress />
                      )
                    }
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
