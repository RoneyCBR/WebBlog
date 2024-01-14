
export function stripHtmlTags(htmlString) {
  const htmlTagRegex = /(<([^>]+)>)/gi;
  const strippedString = htmlString.replace(htmlTagRegex, "");
  return strippedString;
}

export function truncateString (string, limit) {
  if (string.length <= limit) return string;
  return string.slice(0, limit) + '...';
}

export function stringToObjectField (stringValue, objectValue) {
  const keys = stringValue.split('.');
  let targetValue = objectValue;
  for (const key of keys) {
    try {
      targetValue = targetValue[key];
    } catch (error) {
      return null;
    }
  }
  return targetValue;
}


export const capitalizeFirstLetter = (string) => {
  try {
    const stringWithSpaces = string.replace(/_/g, ' ');
    return stringWithSpaces.charAt(0).toUpperCase() + stringWithSpaces.slice(1).toLowerCase();
  } catch (e) {
    console.error(e);
    return string;
  }
}

export const upperFirstLetter = (string) => {
  try {
    const stringWithSpaces = string;
    return String(stringWithSpaces+'').charAt(0).toUpperCase() + String(stringWithSpaces+'').slice(1).toLowerCase();
  } catch (e) {
    console.error(e);
    return string;
  }
}

