import { Grid, Typography } from '@material-ui/core'
import { ReactNode, Fragment } from 'react'

type PersonAttributeProps = {
  label: string
  value: ReactNode
}

export const PersonAttribute = (props: PersonAttributeProps) => {
  const { label, value } = props
  return (
    <Grid container>
      <Grid item xs={4} sm={2}>
        <Typography>{label}:</Typography>
      </Grid>
      <Grid item xs={8} sm={10}>
        {typeof value === 'string' ? (
          <Typography aria-label={label}>{value}</Typography>
        ) : (
          <Fragment>{value}</Fragment>
        )}
      </Grid>
    </Grid>
  )
}
