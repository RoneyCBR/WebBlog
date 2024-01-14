import NewFormDynamic from '@/components/FormDynamic/FormDynamic';
import React from 'react';

const LoginPage = () => {

  const formData = {
    cv: 'url',
    contry: 'select',
    thumbnail: 'multimedia',
    username: 'textShort',
    description: 'textLong',
    pass: 'password',
    email: {
      value: "roney_capri@hotmail.com",
      type: 'email'
    },
    remember_me: 'checkbox',
    total: 'number'
  };

  const handleSubmit = (values,formik) => {
    console.log('debug handleSubmit::',values);
    formik.setSubmitting(false);
  }

  return (
    <div>
      <h1>Login Page</h1>
      <NewFormDynamic 
        enableReinitialize={false}
        initValues={formData}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default LoginPage;