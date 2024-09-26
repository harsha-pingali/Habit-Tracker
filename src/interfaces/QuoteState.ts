import Quote from './Quote'

interface QuoteState {
   quoteData: Quote | null
   isLoading: boolean
   error: String | null
}

export default QuoteState
