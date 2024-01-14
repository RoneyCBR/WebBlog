import * as Yup from "yup";
import { isValidFormat } from '@/utils/supportedFiles';

const isMultimedia = (t, name, ignore = false) => {
  if (ignore) {
    return null;
  }
  return Yup.mixed()
    .required(t(`${name}.required`))
    .test('validFileFormat', 'Invalid file format', (value) => {
      if (typeof value === "string") return false;
      if (value === undefined) return false;
      return isValidFormat(value);
    });
};

const isName = (t, name, ignore = false) => {
  if (ignore) {
    return null;
  }
  return Yup.string()
    .test('isName',`${name}.required`, (value) => {
      if(value === undefined || value === null || value === '') return false;
      return true
    })
    .min(3, t(`${name}.short`))
    .max(100, t(`${name}.long`))
    .required(t(`${name}.required`));
};

const isDescription = (t, name, ignore = false) => {
  if (ignore) {
    return null;
  }
  return Yup.string()
    .required(t(`${name}.required`));
};

const isArray = (t, name, ignore = false) => {
  if (ignore) {
    return null;
  }
  return Yup.array()
    .min(0, t(`${name}.short`))
    .of(
      Yup.object().shape({
        title: Yup.string(),
        value: Yup.string(),
        launchYear: Yup.number(),
      })
    )
    .required(t(`${name}.required`));
};

const isCheckbox = (t, name, ignore = false) => {
  if (ignore) {
    return null;
  }
  return Yup.boolean()
    .required(t(`${name}.required`))
    .test('isChecked', t(`${name}.unchecked`), value => value === true);
};

const isPositiveNumber = (t, name, ignore = false) => {
  if (ignore) {
    return null;
  }
  return Yup.number()
    .min(1, t(`${name}.nonPositive`))  // mensaje de error si el número es 0 o negativo
    .required(t(`${name}.required`));
};

const isZeroOrGreader = (t, name, ignore = false) => {
  if (ignore) {
    return null;
  }
  return Yup.number()
    .min(0, t(`${name}.nonPositive`))  // mensaje de error si el número es 0 o negativo
    .required(t(`${name}.required`));
};

const isWhiteList = (t, name, ignore = false) => {
  if (ignore) {
    return null;
  }
  return Yup.array()
    .min(1, t(`${name}.short`))
    .of(
      Yup.string()
    )
    .test(
      t(`${name}.noEmptyString`),
      (value) => {
        return !value.some(item => item === '' || item === undefined);
      }
    )
    .required(t(`${name}.required`));
};

const isKeyValuePairList = (t, name, ignore = false) => {
  if (ignore) {
    return null;
  }
  return Yup.array()
    .min(1, t(`${name}.short`))
    .of(
      Yup.object().shape({
        attr: Yup.string().required(t(`${name}.attrRequired`)),
        value: Yup.string().required(t(`${name}.valueRequired`)),
      })
    )
    .required(t(`${name}.required`));
};

const isUrl = (t, name, ignore = false) => {
  if (ignore) {
    return null;
  }
  return  Yup.string()
  .url(t(`${name}.should_be_valid_url`))
  .matches(/^https:\/\//, t(`${name}.use_HTTPS`))
  .required(t(`${name}.required`))
}
const isSelect = (t, name, ignore = false) => {
  if (ignore) {
    return null;
  }
  return  Yup.string()
    .test('isSelect',`${name}.invalid_value`, (value) => {
      if(value === undefined || value === null || value === '') return false;
      return true
    })
    .required(t(`${name}.required`));
}

const isWeb3Address = (t, name, ignore = false) => {
  if (ignore) {
    return null;
  }
  return Yup.string()
    .test('isWeb3Address', t(`${name}.invalid_address`), (value) => {
      return Web3.utils.isAddress(value);
    })
    .required(t(`${name}.required`));
}


const isEmail = (t, name, ignore = false) => {
  if (ignore) {
    return null;
  }
  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return Yup.string()
    .matches(emailRegExp, t(`${name}.invalid_email`))
    .required(t(`${name}.required`));
};

const validationMethods = {
  textShort: isName,
  textLong: isDescription,
  password: isName,
  email: isEmail,
  array: isArray,
  multimedia: isMultimedia,
  checkbox: isCheckbox,
  number: isPositiveNumber,
  number_zero_or_greater: isZeroOrGreader,
  select: isSelect,
  white_list: isWhiteList,
  pair_list: isKeyValuePairList,
  url: isUrl,
  web3Address: isWeb3Address
};

export const initializeYupCustom = (t, attributes, types, ignoreValidation) => {
  let schema = {};

  attributes.forEach((attrKey, index) => {
    const validationType = types[index]+'';
    const ignore = ignoreValidation ? ignoreValidation[attrKey] : false;
    const validationMethod = validationMethods[validationType] || isDescription;
    schema[attrKey] = validationMethod(t, attrKey, ignore);
  });

  return Yup.object().shape(schema);
};
