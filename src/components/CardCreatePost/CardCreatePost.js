import React, { useCallback, useState, useRef, Fragment } from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import styles from './CardCreatePost.module.css'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/Delete'
import { useOffLineContext } from '../../context/OffLineContext'
import { newPostFetch } from '../../api/post/post'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Formik, Form, ErrorMessage, Field } from 'formik';


import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('El título es obligatorio'),
  author: Yup.string().required('El autor es obligatorio'),
  description: Yup.string().required('La descripción es obligatoria')
});

const propTypes = {
  user: PropTypes.object
}

const CardCreatePost = ({user, concatNewPost}) => {

  const { isOnline } = useOffLineContext();
  const [error, setError] = useState(null);
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);

  const handleButtonClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    setFile(file);
  },[setFile]);

  const handleSubmit = useCallback(async (values, paramsFormik) => {
    try{
      console.log("debug values::",values);
      console.log("debug paramsFormik::",paramsFormik);
      const { title, author, description } = values;
      const body = {
        title,
        author,
        description,
        thumbnail: file || null,
        userId: user?.pk
      }
      const res = await newPostFetch(body);
      concatNewPost(res?.post)
      paramsFormik?.resetForm?.();
      setFile(null);
    } catch (error) {
      setError(error?.response?.data?.message || 'Ocurrio un error, intente mas tarde!');
      console.error(error);
    } finally {
      paramsFormik?.setSubmitting?.();
    }
  },[user,concatNewPost,file]);


  return (
    <Card sx={{borderRadius:'20px'}}>
      <input
        type="file"
        ref={fileInput}
        style={{ display: 'none' }} 
        onChange={handleFileChange}
        accept="image/*,video/*"
      />
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={{
          title:'',
          author:'',
          description:''
        }}
      >
        {({ isSubmitting, values, resetForm }) => (
        <Form>
          <div className={styles.bodyCard}>
            <div className={styles.headerCard}>
              <Avatar
                src="https://picsum.photos/200/300" 
                alt="profile" 
              />
              <div style={{flex:1}}>
                <Field
                  as={TextField}
                  label={values?.title ? 'Title' : `What do you think, ${user?.username}?`}
                  variant="outlined"
                  size="small"
                  style={{ width:'100%' }}
                  placeholder={'Title'}
                  disabled={!isOnline}
                  name="title"
                />
                <ErrorMessage name="title" component="div" style={{color:'red'}} />
              </div>
              {
                values?.title && 
                <Fragment>
                  <IconButton 
                    sx={{border:'1px solid #ccc'}}
                    alt="delete" 
                    onClick={()=>{resetForm(); setFile(null);}} 
                    disabled={!isOnline || isSubmitting}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton 
                    sx={{transform:'rotate(-25deg)',border:'1px solid #ccc'}}
                    alt="send"
                    disabled={!isOnline || !values?.title || isSubmitting}
                    onClick={handleSubmit}
                    type='submit'
                  >
                    <SendIcon />
                  </IconButton>
                </Fragment>
              }
            </div>
            {values?.title && <Divider/>}
            {values?.title&&
            <div style={{display:'flex',flexDirection:'column',gap:'1em'}}>
              <div style={{flex:1}}>
                <Field
                  as={TextField}
                  label="Author"
                  variant="outlined"
                  size="small"
                  style={{ width:'100%' }}
                  placeholder={`Author`}
                  disabled={!isOnline || isSubmitting}
                  name="author"
                />
                <ErrorMessage name="author" component="div" style={{color:'red'}} />
              </div>
              <div style={{flex:1}}>
                <Field
                  as={TextField}
                  label="Description"
                  variant="outlined"
                  size="small"
                  style={{ width:'100%' }}
                  placeholder={`Description`}
                  disabled={!isOnline || isSubmitting}
                  name="description"
                />
                <ErrorMessage name="description" component="div" style={{color:'red'}} />
              </div>
            </div>
            }
            {
            file && 
            <Card className={styles.cardPostContentImage}>
              <CardMedia
                component={file.type.startsWith('image') ? "img" : "video"}
                loading="lazy"
                alt="img-post" 
                src={URL.createObjectURL(file)}
                sx={{
                  width:'100%',
                  height:'100%',
                  objectFit:'cover'
                }}
                controls={file.type.startsWith('video')}
              />
            </Card>
            }
            <Divider/>
            <div className={styles.footerCard}>
            <Button variant='contained' sx={{ flex:1, textTransform:'none' }} disabled={!isOnline} >Group</Button>
            <Button variant='contained' sx={{ flex:1, textTransform:'none' }} disabled={!isOnline} onClick={handleButtonClick} >Image/Video</Button>
            <Button variant='contained' sx={{ flex:1, textTransform:'none' }} disabled={!isOnline} >Activity</Button>
            </div>
          </div>
        </Form>
        )}
      </Formik>
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
    </Card>
  )
}

CardCreatePost.propTypes = propTypes

export default CardCreatePost
