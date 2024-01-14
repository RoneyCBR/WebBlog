import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const OffLineComponent = ({isOnline}) => {
  return (
    <Snackbar 
      open={!isOnline} autoHideDuration={6000} 
      anchorOrigin={{ 
        vertical:"top",
        horizontal:"center"
      }}
    >
      <Alert variant="filled" severity="error">
        You are offline!
      </Alert>
    </Snackbar>
  )
}

export default OffLineComponent
