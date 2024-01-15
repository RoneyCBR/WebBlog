import React, { useState, useCallback } from 'react';
import NewFormDynamic from '@/components/FormDynamic/FormDynamic';
import Button from '@mui/material/Button';
import styles from './Login.module.css';
import { useUserContext } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { newUserFetch } from '../../api/user/user';
import { newAuthFetch } from '../../api/authentication/authentication';

const LoginPage = () => {

  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const formData = {
    username: 'textShort',
    password: 'password',
    remember_me: 'checkbox',
  };

  const formDataSignIn = {
    username: 'textShort',
    password: 'password',
    terms_and_conditions: 'checkbox',
  };

  const handleSubmit = useCallback(async(values,formik) => {
    try{
      setLoading(true);
      console.log('debug handleSubmit::',values);
      const { username, password } = values;
      let res = null;
      if(tab === 0){
        res = await newAuthFetch({ username, password });
      }else{
        res = await newUserFetch({ username, password });
      }
      setUser(res);
      navigate('/home');
    }catch(error){
      console.log('error handleSubmit::',error);
    } finally {
      formik.setSubmitting(false);
      setLoading(false);
    }
  },[navigate,tab,setLoading]);

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
          <button disabled={loading} onClick={handleChangeTab} className={styles.buttonBottom}>
            {tab === 1 ? 'LogIn':'SignIn'}
          </button>
        </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage;