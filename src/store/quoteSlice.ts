import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import Quote from '../interfaces/Quote'
import QuoteState from '../interfaces/QuoteState'

const initialState: QuoteState = {
   quoteData: null,
   isLoading: false,
   error: null,
}

export const fetchQuote = createAsyncThunk('quote/fetchQuote', async () => {
   const url =
      'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info'
   const options = {
      method: 'GET',
      headers: {
         'x-rapidapi-key': '772fe70f59mshcebf4933970089bp1ad25bjsn5d57aace5f83',
         'x-rapidapi-host':
            'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com',
      },
   }

   try {
      let response = await fetch(url, options)
      const data = await response.json()
      console.log(data)

      const modResponse = {
         id: uuid(),
         ...data,
      }
      console.log(modResponse)
      return modResponse
   } catch (error) {
      console.error(error)
   }
})
const quoteSlice = createSlice({
   name: 'quote',
   initialState: initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(fetchQuote.pending, state => {
            state.isLoading = true
         })
         .addCase(fetchQuote.fulfilled, (state, action) => {
            ;(state.isLoading = false), (state.quoteData = action.payload)
         })
         .addCase(fetchQuote.rejected, (state, action) => {
            ;(state.isLoading = false),
               (state.error = action.error.message || `Failed To Fetch`)
         })
   },
})

export default quoteSlice.reducer
