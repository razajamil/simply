/**
 * Generic type that holds a paginated resource.
 */
export type PaginatedResource<Resource> = {
  /** Total number of results */
  max?: number
  /** Url of next page */
  next?: string
  /** Url of previous page */
  previous?: string
  /** The actual resource being paginated. For example People */
  resources: Array<Resource>
}

/**
 * String literal representing status of fetch.
 *
 * TODO: This can be made more comprehensive by converting to object and capture errors as well.
 */
export type ApiStatus = 'loading' | 'error' | 'idle'
