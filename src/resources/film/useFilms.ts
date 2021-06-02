import { fetchFilm } from './api'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { filmFetched, selectFilms } from './slice'
import { ApiStatus } from '../api'
import { useIsMounted } from '../../hooks/useIsMounted'

type useFilmsProps = {
  urls: Array<string>
}

/**
 * fetches a list of films from api if not availble in redux store,
 * stores list in redux store,
 * returns films from redux store if already loaded
 *
 * TODO: Currently it's fetching films 1 at a time which is inefficient. This can be greatly improved by creating an endpoint that returns multiple films.
 */
export const useFilms = (props: useFilmsProps) => {
  const { urls } = props

  const [apiStatus, setApiStatus] = useState<ApiStatus>('idle')
  const dispatch = useAppDispatch()
  const filmState = useAppSelector(selectFilms)

  const films = Object.keys(filmState.films)
    .filter((key) => urls.includes(key))
    .map((key) => filmState.films[key])

  const allFilmsFetched = films.length === urls.length

  const isMounted = useIsMounted()

  useEffect(() => {
    const fetchFilms = async (urls: Array<string>) => {
      try {
        setApiStatus('loading')
        await Promise.all(
          urls.map(async (url) => {
            const film = await fetchFilm(url)
            dispatch(filmFetched({ film }))
          })
        )
      } catch (error) {
        isMounted && setApiStatus('error')
      } finally {
        isMounted && setApiStatus('idle')
      }
    }

    if (apiStatus === 'idle' && films.length !== urls.length) {
      fetchFilms(urls.filter((url) => !films.find((film) => film.url === url)))
    }
  }, [urls, filmState.films, dispatch, apiStatus, films, isMounted])

  return allFilmsFetched ? films : []
}
