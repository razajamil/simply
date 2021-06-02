import { Typography } from '@material-ui/core'
import { Film } from '../../../resources/film/types'

export const PersonFilms = ({ films }: { films: Array<Film> }) => {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {films.map((film) => (
        <Typography component='li' key={film.url}>
          {film.title}
        </Typography>
      ))}
    </ul>
  )
}
