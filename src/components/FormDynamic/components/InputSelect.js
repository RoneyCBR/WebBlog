
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '@/utils/strings';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Field } from 'formik';


const WrappedMaterialSelect = ({ field, form: { touched, errors, setFieldValue }, options, placeholder,initialValue, ...props }) => {
  

  const getTouched = () => {
    return !!touched[field.name];
  }

  const getError = () => {
    return getTouched() ? errors[field.name] : "";
  }

  const handleChange = (eve) => {
    setFieldValue(field.name, eve.target.value+'',true);
  }

  useEffect(()=>{
    if (initialValue) {
      setFieldValue(field.name, initialValue+'',true);
    }
  },[])

  return (
    <FormControl>
      <Select
        {...field}
        {...props}
        data-testid={field.name+''}
        onChange={handleChange}
        error={Boolean(getError())}
        sx={{
          backgroundColor: "#fff"
        }}
        displayEmpty={true}
      >
        <MenuItem disabled value="">
          <span style={{opacity:'0.6'}}>{placeholder || capitalizeFirstLetter(field.name)}</span>
        </MenuItem>
        {options?.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const InputSelect = ({ name, placeholder, label, loading, initialSelectedValue, options }) => {

  const newLabel = typeof label === 'string' ? label : null;
  const newPlaceHolder = typeof placeholder === 'string' ? placeholder : null;

  return (
    <Fragment>
      <FormLabel htmlFor={name} sx={{color:'inherit'}}>
        {newLabel || capitalizeFirstLetter(name+'')}
      </FormLabel>
      <Field
        name={name}
        disabled={loading}
        options={options}
        placeholder={newPlaceHolder || capitalizeFirstLetter(name+'')}
        initialValue={initialSelectedValue || ''}
        component={WrappedMaterialSelect}
      />
    </Fragment>
  );
};

InputSelect.propTypes = {
  name: PropTypes.string,
  loading: PropTypes.bool
};

export default InputSelect;

