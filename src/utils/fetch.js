export const buildUrlParams = (params) => {
  const BUILD_PARAMS =  new URLSearchParams(params).toString() || '';
  const PARAMS = BUILD_PARAMS ? `&${BUILD_PARAMS}` : '';
  return PARAMS;
}