import { Person as PersonType } from '../../../resources/people'
import { PersonContainer } from './personContainer'

type PersonProps = {
  person: PersonType
}

export const Person = (props: PersonProps) => {
  const { person } = props
  return <PersonContainer person={person} />
}
