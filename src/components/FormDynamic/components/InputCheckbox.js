import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { Field } from 'formik'
import { capitalizeFirstLetter, stringToObjectField } from '@/utils/strings';

const WrappedMaterialTextField = ({ field, label, form: { touched, errors }, ...props }) => {

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
    <FormControl 
      component="fieldset"
      error={error && Boolean(errorMessage)}
    >
      <FormControlLabel
        {...field}
        {...props}
        control={
          <Checkbox 
            name={field?.name} 
            id={field?.name}  
            sx={{
              color: errorMessage ? '#d32f2f' :'inital'
            }}
          />
        }
        label={label}
      />
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  )
}

const InputCheckbox = ({ name, placeholder, label, loading }) => {

  return (
    <Field
      type="checkbox"
      name={name}
      disabled={loading}
      placeholder={placeholder || capitalizeFirstLetter(name)}
      label={label || capitalizeFirstLetter(name)}
      component={WrappedMaterialTextField}
    />
  );
};

InputCheckbox.propTypes = {
  loading: PropTypes.bool
};
InputCheckbox.propTypes = {
  name: PropTypes.string,
  loading: PropTypes.bool
};

export default InputCheckbox;
