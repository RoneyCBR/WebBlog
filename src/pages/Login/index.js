import React, { useState, useCallback } from 'react';
import NewFormDynamic from '@/components/FormDynamic/FormDynamic';
import Button from '@mui/material/Button';
import styles from './Login.module.css';

const LoginPage = () => {

  const [tab, setTab] = useState(0);
  const formData = {
    username: 'textShort',
    password: 'password',
    remember_me: 'checkbox',
  };

  const formDataSignIn = {
    newUsername: 'textShort',
    newPass1: 'password',
    newPass2: 'password',
    terms_and_conditions: 'checkbox',
  };

  const handleSubmit = useCallback((values,formik) => {
    console.log('debug handleSubmit::',values);
    formik.setSubmitting(false);
  },[]);

  const handleChangeTab = useCallback(() => {
    setTab(tab===0 ? 1 : 0);
  },[setTab,tab]);

  return (
    <main className={styles.main}>
      <img alt="background" src='/banner-login.jpg' className={styles.imgBackground} />
      <div className={styles.contentImg} />
      <div className={styles.form} >
        <div className={styles.items}>
          <h1>Login WebBlog</h1>
          <NewFormDynamic 
            enableReinitialize={true}
            initValues={tab === 0? formData:formDataSignIn}
            onSubmit={handleSubmit}
            renderButtons={(props)=>{
              return (
                <center>
                  <Button 
                    color="success" variant="contained"
                    type="submit"
                    data-testid="submit-button"
                    {...props}
                  >
                    Submit
                  </Button>
                </center>
              )
            
            }}
          />
        </div>
        <div>
        <div className={styles.footerForm} >
          <button onClick={handleChangeTab} className={styles.buttonBottom}>
            {tab === 1 ? 'LogIn':'SignIn'}
          </button>
        </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage;