import { Box, Grid, Typography } from '@material-ui/core'
import { useState } from 'react'
import { Person as PersonType, usePeople } from '../../resources/people'
import { Person } from './person'
import { PeopleTable } from './peopleTable'

/**
 * renders layout
 * loads data
 * passes data to view components
 */
export const PeopleContainer = () => {
  const people = usePeople()
  const [selectedPerson, setSelectedPerson] =
    useState<PersonType | undefined>(undefined)

  const onClickPerson = (person: PersonType) => setSelectedPerson(person)

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box marginBottom={2}>
          <Typography variant='h4'>Star wars cast</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <PeopleTable
          {...people}
          selectedPerson={selectedPerson}
          onClickPerson={onClickPerson}
        />
      </Grid>
      {selectedPerson && (
        <Grid item xs={12}>
          <Person person={selectedPerson} />
        </Grid>
      )}
    </Grid>
  )
}
