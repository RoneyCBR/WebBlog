import React, { useState, useCallback, useEffect } from 'react';
import NewFormDynamic from '@/components/FormDynamic/FormDynamic';
import Button from '@mui/material/Button';
import styles from './Login.module.css';
import { useUserContext } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { newUserFetch } from '../../api/user/user';

const LoginPage = () => {

  const navigate = useNavigate();
  const { user, setUser, connectUser, loading, setLoading } = useUserContext();
  const [tab, setTab] = useState(0);

  
  const formData = {
    username: 'textShort',
    password: 'password'
  };

  const formDataSignIn = {
    username: 'textShort',
    password: 'password',
    terms_and_conditions: 'checkbox',
  };

  const handleSubmit = useCallback(async(values,formik) => {
    try{
      const { username, password } = values;
      if(tab === 0){
        await connectUser(username, password);
      }else{
        const res = await newUserFetch({ username, password });
        setUser(res);
      }
    }catch(error){
      console.log('error handleSubmit::',error);
    } finally {
      formik.setSubmitting(false);
    }
  },[navigate,tab]);

  const handleChangeTab = useCallback(() => {
    setTab(tab===0 ? 1 : 0);
  },[setTab,tab]);
  
  useEffect(() => {
    if(!loading && user){
      navigate('/home');
    }
  },[loading,user]);

  useEffect(() => {
    setLoading(false)
  },[]);


  return (
    <main className={styles.main}>
      <img alt="background" src='/banner-login.jpg' className={styles.imgBackground} />
      <div className={styles.contentImg} />
      <div className={styles.form} >
        <div className={styles.items}>
          <h1>{tab === 0 ? 'Login WebBlog':'Register WebBlog'}</h1>
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