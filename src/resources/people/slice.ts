import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'
import { Person } from './types'

export type PeopleState = {
  pages: {
    [key: number]: Array<Person>
  }
  hasNext: boolean
}

const initialState: PeopleState = {
  pages: {},
  hasNext: false,
}

export const peopleSlice = createSlice({
  name: 'people',
  initialState,

  reducers: {
    pageFetched: (
      state,
      action: PayloadAction<{
        people: Array<Person>
        page: number
        hasNext: boolean
      }>
    ) => {
      const { page, people, hasNext } = action.payload
      state.pages[page] = people
      state.hasNext = hasNext
    },
  },
})

export const { pageFetched } = peopleSlice.actions

export const selectPeople = (state: RootState) => state.people

export default peopleSlice.reducer
