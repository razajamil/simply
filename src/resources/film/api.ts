import { Film } from './types'

/**
 * @throws: We let API throw so errors can be handled in the components that are using this data. This leads to better user experience as there is more context.
 */
export const fetchFilm = async (url: string): Promise<Film> => {
  const response = await fetch(url)
  const json = await response.json()

  /**
   * TODO: This api > object mapping could be made more robust by using some weak schema techniques.
   */
  const value: Film = {
    url: json.url,
    title: json.title,
  }

  return value
}
