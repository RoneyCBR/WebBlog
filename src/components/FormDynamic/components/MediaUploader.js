import React, { useState, useRef, Fragment, useEffect } from 'react';
import { Field } from 'formik';
import { capitalizeFirstLetter } from '@/utils/strings';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { SUPPORTED_FORMATS as SUPPORTED_NFT_FORMATS, isVideo } from "@/utils/supportedFiles";

const ratioStyleProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}

const SelectFieldIcon = (styles) => (
  <Box
    sx={{
      ...ratioStyleProperties,
      border: '1px dashed #C4C4C4',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      borderRadius: '8px',
      ...styles
    }}
  >
    <UploadFileIcon fontSize='large' sx={{mb: 1}} />
    {SUPPORTED_NFT_FORMATS.reduce((acc, format) => { acc.push(` ${format},`); return acc; }, []).join('').slice(0, -1)}
    <div>
    (Click or Drag)
    </div>
  </Box>
) 

const ResponsiveImageOrVideo = ({file,loading,type}) => {

  const [objectUrl, setObjectUrl] = useState(null);

  useEffect(() => {
    if(file){
      const newObjectUrl = URL.createObjectURL(file);
      setObjectUrl(newObjectUrl);
      return () => {
        URL.revokeObjectURL(newObjectUrl);
      };
    }
  }, [file]);

  return(
    <CardMedia
      component={type === "video" ? "video" : "img"}
      src={objectUrl}
      sx={{ 
        ...ratioStyleProperties,
        borderRadius: '8px',
        filter: loading ? 'grayscale(100%)' : 'none',
      }}
      controls={type === "video" ? true : false}
    />
  )
}

const MediaUploader = ({ name, placeholder, label , setFieldValue, loading, initStateWithValues, styles }) => {

  const [ file, setFile ] = useState(null);
  const fileInputRef = useRef(null); 
  const isValid = (file) => {
    if (!file) return false;
    const type = file.type;
    const format = type.split('/')[1];
    return SUPPORTED_NFT_FORMATS.includes(format.toUpperCase());
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      if(setFieldValue){
        setFieldValue(name, file,true);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFile(file);
      if(setFieldValue){
        setFieldValue(name, file,true);
      }
    }
  };

  const handleClick = () => { 
    if (!loading && fileInputRef.current) {
      fileInputRef.current.click(); 
    }
  };

  useEffect(() => {
    if (initStateWithValues && name) {
      const value = initStateWithValues[name];
      if(typeof value === "string"){
        try{
          fetch(value).then(res => res.blob()).then(blob => {
            const file = new File([blob], 'default', { type: blob.type });
            // setFieldValue(name, file, true)
            setFile(file);
          }).catch(() => {
            console.error("Error fetching file from url");
            setFile(null);
          });
        }catch(e){
          console.error(e);
        }
      }
    }
  }, [initStateWithValues, name]);

  return (
    <Fragment>
      <Field
        type="text"
        placeholder={placeholder ? placeholder : capitalizeFirstLetter(name)}
        name={name}
        disabled={loading}
        style={{
          position: 'relative'
        }}
      >
        {({ field }) => (
        <Box
          component="div"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick} 
          style={{
            width: '200px',
            height: String(name+'').includes("banner") ? '120px':'200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            position: 'relative',
            backgroundColor: 'white',borderRadius:'8px',
            ...styles
          }}
        >
          <input
            name={name}
            type="file"
            accept="image/png, image/gif, image/jpeg, video/mp4"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            ref={fileInputRef} 
            disabled={loading}
          />
          {!isValid(file) && SelectFieldIcon(styles)}
          {isValid(file) && !isVideo(file) && <ResponsiveImageOrVideo file={file} loading={loading} type="image"  />}
          {isValid(file) && isVideo(file) && <ResponsiveImageOrVideo file={file} loading={loading} type="video" />}
          {!file && 
          <label {...field} 
            htmlFor={fileInputRef.current ? fileInputRef.current.id : ''} 
            style={{ 
              cursor: 'pointer',
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center'
            }}>
              
            <small style={{marginTop: '3%'}}>
            {label ? label : capitalizeFirstLetter(name)}
            </small>
          </label>}
        </Box>
        )}
      </Field>
    </Fragment>
  );
};

export default MediaUploader;
