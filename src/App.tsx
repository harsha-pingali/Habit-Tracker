import { Provider } from 'react-redux'
import store from './store/store'
import { Container, Typography } from '@mui/material'
import HabbitForm from './components/HabbitForm'
import HabbitsList from './components/HabbitsList'
import HabitStats from './components/HabitStats'
import RandomQuote from './components/RandomQuote'

import './App.css'

function App() {
   return (
      <Provider store={store}>
         <Container maxWidth="md">
            <Typography component={'h1'} variant="h2" align="center">
               Habit Tracker
            </Typography>
            <RandomQuote />
            <HabbitForm />
            <HabbitsList />
            <HabitStats />
         </Container>
      </Provider>
   )
}

export default App
