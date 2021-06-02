import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'
import { Film } from './types'

export type FilmState = {
  /**
   * Films are stored per page in an object instead of array to avoid lots of recalculations when displaying a particular page i.e films[1] vs films.find(film => film.page === 1)
   */
  films: {
    [page: string]: Film
  }
}

const initialState: FilmState = {
  films: {},
}

export const filmSlice = createSlice({
  name: 'films',
  initialState,

  reducers: {
    filmFetched: (
      state,
      action: PayloadAction<{
        film: Film
      }>
    ) => {
      const { film } = action.payload
      state.films[film.url] = film
    },
  },
})

export const { filmFetched } = filmSlice.actions

export const selectFilms = (state: RootState) => state.films

export default filmSlice.reducer
