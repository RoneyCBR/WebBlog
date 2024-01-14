import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FormLabel from '@mui/material/FormLabel';
import { Field } from 'formik'
import { capitalizeFirstLetter, stringToObjectField } from '@/utils/strings';
import { TextField } from "@mui/material";

const WrappedMaterialTextField = ({ field, form: { touched, errors }, ...props }) => {

  const getTouched = () => {
    const isTouched = stringToObjectField(field.name, touched);
    if (!isTouched) return false;
    return isTouched;
  }

  const getError = () => {
    if (!getTouched()) return "";
    const error = stringToObjectField(field.name, errors);
    if (!error) return "";
    return error;
  }

  const error = getTouched();
  const errorMessage = error && getError();

  return (
    <TextField
      {...props}
      {...field}
      sx={{
        backgroundColor: 'white',
        borderRadius:'8px',
      }}
      helperText={errorMessage}
      error={error && Boolean(errorMessage)}
    />
  )
}

const InputPassword = ({ name, placeholder, label, loading}) => {

  return (
    <Fragment>
      <FormLabel htmlFor={name} sx={{color:'inherit'}}>{label || capitalizeFirstLetter(name)}</FormLabel>
      <Field
        type="password"
        placeholder={placeholder || capitalizeFirstLetter(name)}
        name={name}
        disabled={loading}
        component={WrappedMaterialTextField}
      />
    </Fragment>
  );
};

InputPassword.propTypes = {
  name: PropTypes.string,
  loading: PropTypes.bool
};

export default InputPassword;