import { useEffect, useState } from 'react'
import { Person } from './types'
import { fetchPeople } from './api'
import { pageFetched, selectPeople } from './slice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { ApiStatus } from '../api'
import { useIsMounted } from '../../hooks/useIsMounted'

type usePeopleReturn = {
  people: Array<Person>
  page: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextPage: () => void
  previousPage: () => void
  apiStatus: ApiStatus
}

/**
 * fetches paginated people from api if not found in redux store,
 * stores pagindated people in redux,
 * returns paginated people from redux
 * 
 * TODO: This hook can be improved by taking a startingPageNumber and having the ability to fetch api data both ways!
 */
export const usePeople = (): usePeopleReturn => {
  const [pagingInfo, setPagingInfo] = useState<PagingInfo>({ current: 1 })
  const [apiStatus, setApiStatus] = useState<ApiStatus>('idle')

  const peopleState = useAppSelector(selectPeople)
  const dispatch = useAppDispatch()

  const isMounted = useIsMounted()

  useEffect(() => {
    const fetchPage = async (page: number) => {
      try {
        setApiStatus('loading')
        const paginatedResource = await fetchPeople(page)
        if (!peopleState.pages[page]?.length)
          dispatch(
            pageFetched({
              people: paginatedResource.resources,
              page,
              hasNext: !!paginatedResource.next,
            })
          )
      } catch (error) {
        isMounted && setApiStatus('error')
      } finally {
        isMounted && setApiStatus('idle')
      }
    }

    if (apiStatus === 'idle' && !peopleState.pages[pagingInfo.current])
      fetchPage(pagingInfo.current)
  }, [dispatch, apiStatus, pagingInfo, peopleState.pages, isMounted])

  const hasNextPage = () =>
    pagingInfo.current < Object.keys(peopleState.pages).length ||
    peopleState.hasNext

  const hasPreviousPage = () => pagingInfo.current > 1

  const nextPage = () =>
    hasNextPage() &&
    apiStatus !== 'loading' &&
    setPagingInfo((p) => ({ ...p, current: p.current + 1 }))

  const previousPage = () =>
    hasPreviousPage() &&
    setPagingInfo((p) => ({ ...p, current: p.current - 1 }))

  return {
    people: peopleState.pages[pagingInfo.current] || [],
    apiStatus,
    page: pagingInfo.current,
    nextPage,
    previousPage,
    hasNextPage: hasNextPage(),
    hasPreviousPage: hasPreviousPage(),
  }
}

type PagingInfo = {
  current: number
  max?: number
  next?: string
  previous?: string
}
