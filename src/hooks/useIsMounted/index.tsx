import { useEffect, useState } from 'react'

/** Keeps track of component mounted state to prevent state updates on unmounted components */
export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(true)

  useEffect(() => () => setIsMounted(false), [])

  return isMounted
}
