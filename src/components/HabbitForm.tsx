import {
   Box,
   Button,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   TextField,
   Alert,
} from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addHabbit } from '../store/habbitSlice'
import { AppDispatch } from '../store/store'
const HabbitForm: React.FC = () => {
   const [name, setName] = useState<String>('')
   const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily')
   const [error, setError] = useState<Boolean>(false)
   const dispatch = useDispatch<AppDispatch>()

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()

      if (name) {
         dispatch(
            addHabbit({
               name: name.trim(),
               frequency,
            })
         )
         setName('')
      } else setError(true)
   }
   return (
      <>
         {error && (
            <Alert
               variant="outlined"
               severity="error"
               onClose={() => {
                  setError(false)
               }}
            >
               Name is Required
            </Alert>
         )}
         <form style={{ marginTop: '2rem' }} onSubmit={handleSubmit}>
            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
               }}
            >
               <TextField
                  label="habit name"
                  value={name}
                  placeholder="Enter Habit Name"
                  fullWidth={true}
                  onChange={(e) => setName(e.target.value)}
               />

               <FormControl>
                  <InputLabel>Frequency</InputLabel>
                  <Select
                     value={frequency}
                     onChange={(e) =>
                        setFrequency(e.target.value as 'daily' | 'weekly')
                     }
                     defaultChecked={false}
                  >
                     <MenuItem value={'daily'}>Daily</MenuItem>
                     <MenuItem value={'weekly'}>Weekly</MenuItem>
                  </Select>
               </FormControl>
               <Button type="submit" variant="contained" color="primary">
                  Add Habit
               </Button>
            </Box>
         </form>
      </>
   )
}

export default HabbitForm
