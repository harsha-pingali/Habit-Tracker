import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import {
   Box,
   Button,
   Grid,
   LinearProgress,
   Paper,
   Typography,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Delete } from '@mui/icons-material'
import { fetchHabits, removeHabit, toggleHabbit } from '../store/habbitSlice'
import Habbit from '../interfaces/Habbit'

const HabbitsList: React.FC = () => {
   //state.habbits represents habbits slice
   //fetches habbits[] array present in state
   const { habbits, isLoading, isError } = useSelector(
      (state: RootState) => state.habbits
   )
   const today = new Date().toISOString().split('T')[0]
   const dispatch = useDispatch<AppDispatch>()
   useEffect(() => {
      dispatch(fetchHabits())
   }, [])
   const getStreak = (habit: Habbit) => {
      let currentDate = new Date()
      let streak = 0
      while (true) {
         const dateString = currentDate.toISOString().split('T')[0]
         if (habit.completedDates.includes(dateString)) {
            streak++
            currentDate.setDate(currentDate.getDate() - 1)
         } else break
      }
      return streak
   }

   return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
         {habbits.map((item, index) => {
            const isCompleted = item.completedDates.includes(today)
            const streak = getStreak(item)
            return (
               <Paper elevation={2} sx={{ p: 2 }} key={index}>
                  <Grid container alignItems={'center'}>
                     <Grid xs={12} sm={6}>
                        <Typography variant="h6">{item?.name}</Typography>
                        <Typography variant="h6">{item?.frequency}</Typography>
                     </Grid>
                     <Grid xs={12} sm={6}>
                        <Box
                           sx={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              gap: 1,
                           }}
                        >
                           <Button
                              variant="outlined"
                              color={isCompleted ? 'success' : 'primary'}
                              endIcon={<CheckCircleIcon />}
                              onClick={() =>
                                 dispatch(
                                    toggleHabbit({
                                       id: item.id,
                                       date: today,
                                    })
                                 )
                              }
                           >
                              {isCompleted ? 'Done' : 'Mark as Done'}
                           </Button>
                           <Button
                              variant="outlined"
                              color="error"
                              endIcon={<Delete />}
                              onClick={() =>
                                 dispatch(removeHabit({ id: item.id }))
                              }
                           >
                              Delete
                           </Button>
                        </Box>
                     </Grid>
                  </Grid>
                  <Typography variant="body1" mt={2}>
                     Current Streak :{' '}
                     {`${streak} ${streak !== 1 ? 'days' : 'day'}`}
                  </Typography>
                  <LinearProgress
                     variant="determinate"
                     value={(streak / 30) * 100}
                     sx={{ mt: 1.25, p: 0.025, borderRadius: '8.5px' }}
                  />
               </Paper>
            )
         })}
      </Box>
   )
}

export default HabbitsList
