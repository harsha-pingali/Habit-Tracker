import {
   ActionReducerMapBuilder,
   createAsyncThunk,
   createSlice,
   PayloadAction,
} from '@reduxjs/toolkit'
import HabbitState from '../interfaces/HabbitState'
import Habbit from '../interfaces/Habbit'
import { v4 as uuidv4 } from 'uuid'

const initialState: HabbitState = {
   habbits: [],
   isLoading: false,
   isError: null,
}

export const fetchHabits = createAsyncThunk('habbits/fetchHabits', async () => {
   await new Promise((resolve, reject) => setTimeout(resolve, 5000))
   const mockHabits: Habbit[] = [
      {
         id: '55b6fc19-e014-4d64-867f-4544cc047c8f',
         name: 'Ride Bike',
         frequency: 'daily',
         completedDates: [],
         createdAt: new Date().toISOString(),
      },
      {
         id: '55b6fc19-e014-4d64-867f-4544cc047c8g',
         name: 'Play',
         frequency: 'daily',
         completedDates: [],
         createdAt: new Date().toISOString(),
      },
   ]

   return mockHabits
})

const habbitSlice = createSlice({
   name: 'habbits',
   initialState,
   reducers: {
      addHabbit: (
         state,
         action: PayloadAction<{ name: String; frequency: 'daily' | 'weekly' }>
      ) => {
         const newHabit: Habbit = {
            id: uuidv4(),
            name: action.payload.name,
            frequency: action.payload.frequency,
            completedDates: [],
            createdAt: new Date().toISOString(),
         }
         state.habbits.push(newHabit)
      },

      //toggling the habbit
      toggleHabbit: (
         state,
         action: PayloadAction<{ id: String; date: String }>
      ) => {
         const { id, date } = action.payload
         // console.log(`${id} ${date}`)
         const habit = state.habbits.find((h) => h.id === id)
         if (habit) {
            const habitIdx = habit.completedDates.indexOf(date)
            if (habitIdx > -1) {
               habit.completedDates.splice(habitIdx, 1) //remove it => marking it as undone
            } else {
               habit.completedDates.push(date)
            }
         }
      },

      removeHabit: (state, action: PayloadAction<{ id: String }>) => {
         console.log('Delete Triggered')

         const { habbits } = state
         const { id } = action.payload
         const idx = habbits.findIndex((h) => h.id === id)
         habbits.splice(idx, 1)
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchHabits.pending, (state) => {
            state.isLoading = true
         })
         .addCase(fetchHabits.fulfilled, (state, action) => {
            state.isLoading = false
            state.habbits = action.payload
         })
         .addCase(fetchHabits.rejected, (state, action) => {
            state.isLoading = false
            state.isError = action.error.message || `Failed To Fetch`
         })
   },
})

export const { addHabbit, toggleHabbit, removeHabit } = habbitSlice.actions

export default habbitSlice.reducer
