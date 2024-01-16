import React, { Fragment, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const MainApp = ({children}) => {

  const { reconnectUser, loading } = useUserContext();

  useEffect(() => {
    reconnectUser();
  }, [reconnectUser]);


  return (
    <Fragment>
      <Snackbar 
        open={loading} autoHideDuration={6000} 
        anchorOrigin={{ 
          vertical:"top",
          horizontal:"center"
        }}
      >
        <Alert variant="filled" severity="warning">
          Reconectando...
        </Alert>
      </Snackbar>
      {children}
    </Fragment>
  )
};

export default MainApp;
