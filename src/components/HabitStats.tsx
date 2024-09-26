import {
   Card,
   CardContent,
   CircularProgress,
   Grid,
   Typography,
} from '@mui/material'
import HailIcon from '@mui/icons-material/Hail'
import TodayIcon from '@mui/icons-material/Today'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import Habbit from '../interfaces/Habbit'

const HabitStats: React.FC = () => {
   const { habbits, isError, isLoading } = useSelector(
      (state: RootState) => state.habbits
   )
   console.log(habbits)
   const getHabbitCount = () => habbits.length

   const completedOnToday = () => {
      const today = new Date().toISOString().split('T')[0]
      console.log(today)

      return habbits.filter((item) => item.completedDates.includes(today))
         .length
   }

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

   const getMaxStreak = () => Math.max(...habbits.map(getStreak))
   return (
      <div>
         <Typography variant="h3" textAlign={'center'} mt={1}>
            Statistics
         </Typography>
         {!isLoading ? (
            <Grid
               sx={{
                  display: 'flex',
                  gap: 1.25,
                  marginTop: '1rem',
                  justifyContent: 'space-between',
               }}
            >
               <Card raised={true} sx={{ width: '300px' }}>
                  <CardContent
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}
                  >
                     <HailIcon fontSize="large" />
                     <Typography variant="h5" marginTop={1}>
                        Total Habits
                     </Typography>
                     <Typography variant="body1">{getHabbitCount()}</Typography>
                  </CardContent>
               </Card>

               <Card raised={true} sx={{ width: '300px' }}>
                  <CardContent
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}
                  >
                     <TodayIcon fontSize="large" />
                     <Typography variant="h5" marginTop={1}>
                        Completed Today
                     </Typography>
                     <Typography variant="body1">
                        {completedOnToday()}
                     </Typography>
                  </CardContent>
               </Card>

               <Card raised={true} sx={{ width: '300px' }}>
                  <CardContent
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}
                  >
                     <LocalFireDepartmentIcon fontSize="large" />
                     <Typography variant="h5" marginTop={1}>
                        Max Streak
                     </Typography>
                     <Typography variant="body1">
                        {habbits.length === 0 ? 0 : getMaxStreak()}
                     </Typography>
                  </CardContent>
               </Card>
            </Grid>
         ) : (
            <div
               style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}
            >
               <CircularProgress size={'3rem'} />
            </div>
         )}
      </div>
   )
}

export default HabitStats
