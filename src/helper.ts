export const objToQueryString = (queryObj: { [key: string]: any }) =>
  Object.keys(queryObj)
    .map((key) => `${key}=${queryObj[key]}`)
    .join("&");
