import Habbit from './Habbit'

interface HabbitState {
   habbits: Habbit[]
   isLoading: boolean
   isError: String | null
}
export default HabbitState
