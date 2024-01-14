import React from 'react';
import Box from '@mui/material/Box';
import NewFormDynamic from '@/components/FormDynamic/FormDynamic';
import './Login.css'

const LoginPage = () => {

  const formData = {
    username: 'textShort',
    email: {
      value: '',
      type: 'email'
    },
    remember_me: 'checkbox',
  };

  const handleSubmit = (values,formik) => {
    console.log('debug handleSubmit::',values);
    formik.setSubmitting(false);
  }

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.default',
        display: 'grid',
        gridTemplateColumns: { md: '1fr 1fr' },
        gap: 2,
      }}
    >
      <h1>Login Page</h1>
      <NewFormDynamic 
        enableReinitialize={false}
        initValues={formData}
        onSubmit={handleSubmit}
      />
    </Box>
  )
}

export default LoginPage;