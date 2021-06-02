import { PersonView } from './personView'
import { Person as PersonType } from '../../../resources/people'
import { useFilms } from '../../../resources/film/useFilms'

type PersonProps = {
  person: PersonType
}

/**
 * loads list of films for a Person,
 * passes data to view component
 */
export const PersonContainer = (props: PersonProps) => {
  const { person } = props

  const filmUrls = person.films.map(({ url }) => url)
  const films = useFilms({ urls: filmUrls })

  return <PersonView person={{ ...person, films }} />
}
