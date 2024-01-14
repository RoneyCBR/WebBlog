import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormDynamic.module.css';
import { initializeYupCustom } from './utils/validationsYup';
import { useTranslation } from 'react-i18next';
import { Formik, Form, useFormikContext } from 'formik';
import Button from '@mui/material/Button';
import InputText from './components/InputText';
import MediaUploader from './components/MediaUploader';
import InputNumber from './components/InputNumber';
import InputCheckbox from './components/InputCheckbox';
import InputSelect from './components/InputSelect';
import InputTextArea from './components/InputTextArea';
import { combineWithForm } from '@/utils/objects';
import InputPassword from './components/InputPassword';

const INPUT_COMPONENTS_MAP = {
  textShort: props => <InputText {...props} />,
  textLong: props => <InputTextArea {...props} />,
  password: props => <InputPassword {...props} />,
  email: props => <InputText {...props} />,
  multimedia: props => <MediaUploader {...props} />,
  number: props => <InputNumber {...props} />,
  checkbox: props => <InputCheckbox {...props}  />,
  select: props => <InputSelect {...props} />,
  url: props => <InputText {...props} />
};

export const recoverValue = (valueForm) => {
  if(INPUT_COMPONENTS_MAP[valueForm] && typeof valueForm === 'string'){
    return '';
  } else
  if(typeof valueForm === 'object' && valueForm !== null){
    if(valueForm?.values){
      return valueForm?.values;
    } else if(valueForm?.value){
      return valueForm?.value;
    } 
  }
  return '';
}

export const recoverType = (valueForm) => {
  if(typeof valueForm === 'string'){
    return valueForm;
  } else
    if(typeof valueForm === 'object' && valueForm !== null){
      if(valueForm?.type){
        return valueForm?.type
      }
    }else
      return 'Type not founded';
}

const FormDynamic = ({ 
  initValues,
  loading,
  handleCancel,
  renderButtons,
  textButtons,
  onSubmit,
  textPlaceholders,
  textLabels,
  enableReinitialize,
  ignoreValidation
}) => {

  const { t } = useTranslation('form');
  const state = (initValues && Object.keys(initValues)?.length > 0) ? initValues : {};
  const formattedState = Object.fromEntries(
    Object.entries(state).map(([key, value]) => {
      return [key, recoverValue(value)];
    })
  );
  const nameAttributes = Object.keys(state) ||  {};
  const typesAttributes = Object.values(state)?.map(recoverType);
  const validationSchema = nameAttributes.length > 0 ? initializeYupCustom(t, nameAttributes, typesAttributes, ignoreValidation) : null;

  const placeholders = (textPlaceholders && combineWithForm(formattedState, textPlaceholders)) || {}
  const labels = (textLabels && combineWithForm(formattedState, textLabels)) || {}

  if (!state || state === undefined || state?.length === 0) {
    return <>FormDynamic mount - please initialize form</>
  }

  return (
    <BuildForm 
      enableReinitialize={enableReinitialize}
      attributes={nameAttributes}
      types={typesAttributes}
      form={formattedState}
      stateInit={state}
      validationSchema={validationSchema}
      loading={loading}
      handleCancel={handleCancel}
      renderButtons={renderButtons}
      textButtons={textButtons}
      t={t}
      onSubmit={onSubmit}
      placeholders={placeholders}
      labels={labels}
    />
  );
};

FormDynamic.defaultProps = {
  initValues: {},
  loading: false,
  handleCancel: () => {},
  renderButtons: null,
  onSubmit: null,
  textPlaceholders: null,
  textLabels: null,
  enableReinitialize:false,
  ignoreValidation: null
}

FormDynamic.propTypes = {
  initValues: PropTypes.object,
  loading: PropTypes.bool,
  handleCancel: PropTypes.func,
  renderButtons: PropTypes.any,
  textButtons: PropTypes.any,
  onSubmit: PropTypes.any,
  textPlaceholders: PropTypes.any,
  textLabels: PropTypes.any,
  enableReinitialize: PropTypes.bool,
  ignoreValidation: PropTypes.any
};



const BuildForm = ({
  enableReinitialize,
  attributes,
  types,
  form,
  validationSchema,
  loading,
  handleCancel,
  renderButtons,
  textButtons,
  t,
  onSubmit,
  placeholders,
  labels
}) =>{

  const handleSubmit = (values, paramsFormik) => {
    if(onSubmit){
      onSubmit(values, paramsFormik);
    }
  }

  return (
    <Formik
      enableReinitialize={enableReinitialize}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={form}
    >
      {({isSubmitting, ...formOptions}) => (
        <Form className={styles.form}>
          <div className={styles.col1}>
            {
              attributes?.map((name,index)=>{
                const initValue = form[name] || null;
                return (
                  <div key={name} style={{display:'flex',flexDirection:'column'}} >
                    <RenderComponent 
                      name={name} 
                      placeholder={placeholders[name]}
                      label={labels[name]}
                      type={types[index]}
                      loading={isSubmitting || loading}
                      initValue={initValue}
                    />
                  </div>
                );
              })
            }
            {renderButtons?.(isSubmitting)}
            {!renderButtons && (
            <div className={styles.contentButtons}>
              <Button 
                color="success" variant="contained"
                type="submit"
                disabled={isSubmitting || loading}
                data-testid="custom-form-submit-button"
              >
                {textButtons?.submit ? textButtons.submit : t("options.accept")}
              </Button>
              <Button 
                color="success" variant="transparent"
                type="button"
                onClick={() => handleCancel({ ...formOptions, isSubmitting })}
                disabled={isSubmitting || loading}
                data-testid="custom-form-cancel-button"
              >
                {textButtons?.cancel ? textButtons.cancel : t("options.cancel")}
              </Button> 
            </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}

export const RenderComponent = ({type, name, placeholder, label, loading, initValue, ...props }) =>{
  const InputComponent = INPUT_COMPONENTS_MAP[type];
  const { setFieldValue } = useFormikContext();

  if (!InputComponent) {
    return <small>Unsupported input {'"'+name+'"'} type: ${type}</small>
  }

  return (
    <InputComponent 
      name={name}
      placeholder={placeholder}
      label={label}
      setFieldValue={setFieldValue} 
      loading={loading}
      initValue={initValue}
      {...props}
    />
  );
}




export default FormDynamic;
