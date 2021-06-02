import { Person } from './types'
import { PaginatedResource } from '../api/types'
import { Film } from '../film/types'

/**
 * @throws: We let API throw so errors can be handled in the components that are using this data. This leads to better user experience as there is more context.
 * */
export const fetchPeople = async (
  page: number
): Promise<PaginatedResource<Person>> => {
  const response = await fetch(`http://swapi.dev/api/people?page=${page}`)
  const json = await response.json()

  const value: PaginatedResource<Person> = {
    max: Number(json.max),
    next: json.next,
    previous: json.previous,
    resources:
      json.results?.map(
        (result: any) =>
          /**
           * TODO: This api > object mapping could be made more robust by using some weak schema techniques.
           */
          ({
            url: result.url,
            name: result.name,
            height: result.height,
            mass: result.mass,
            birthYear: result.birth_year,
            gender: result.gender,
            films: result.films?.map((film: any) => ({ url: film } as Film)),
          } as Person)
      ) || [],
  }

  return value
}
