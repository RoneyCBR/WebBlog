import React, { Fragment } from 'react'
import CardPost from '../../../components/CardPost/CardPost'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SectionPost = ({loading,items,error}) => {

  return (
    <Fragment>
      <Snackbar 
        open={Boolean(error)} autoHideDuration={6000} 
        anchorOrigin={{ 
          vertical:"top",
          horizontal:"center"
        }}
      >
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      </Snackbar>
      {loading &&  <center><h3>Cargando...</h3></center>}
      {
        !loading && items?.length === 0 && <center><h3>No hay publicaciones</h3></center>
      }
      {
        !loading && items?.map((item,index) => (
          <CardPost key={`${item?.id+''}${index}`} item={item} />
        )).reverse()
      }
    </Fragment>
  )
}

export default SectionPost
