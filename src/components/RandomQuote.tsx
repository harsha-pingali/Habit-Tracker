import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { fetchQuote } from '../store/quoteSlice'
import { Box, CircularProgress, Paper, Typography } from '@mui/material'

const RandomQuote: React.FC = () => {
   const { quoteData, isLoading, error } = useSelector(
      (state: RootState) => state.quote
   )

   const dispatch = useDispatch<AppDispatch>()
   useEffect(() => {
      dispatch(fetchQuote())
   }, [])
   return (
      <>
         {isLoading ? (
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
         ) : (
            <Box mt={2}>
               <Paper
                  sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     justifyContent: 'center',
                     gap: '0.5rem',
                     padding: '1.5rem',
                  }}
                  elevation={5}
               >
                  <Typography
                     variant="h4"
                     color="success"
                     sx={{ fontWeight: 'bold' }}
                     textAlign={'center'}
                  >
                     Quote of the day
                  </Typography>
                  <Typography variant="h5" textAlign={'center'}>
                     " {quoteData?.text} "
                  </Typography>
                  <Typography variant="body2" textAlign={'right'}>
                     ~ {quoteData?.author}
                  </Typography>
               </Paper>
            </Box>
         )}
      </>
   )
}

export default RandomQuote
