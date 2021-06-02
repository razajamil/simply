import { Film } from '../film/types'

export type Person = {
  url: string
  name: string
  birthYear: string
  gender: string
  height: string
  films: Array<Film>
  mass: string
}
