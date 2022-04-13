/**
 * @file responseCheck.mjs
 * @author UP2002753
 * @description Returns relevant responses based on status code
 * @namespace ResponseCheck
 */

export default function (response) {
  if (response.status === 200) {
    return ('OK');
  } else if (response.status === 201) {
    return ('Created');
  } else if (response.status === 204) {
    return ('Updated');
  } else if (response.status === 500) {
    return ('Internal Server Error');
  } else {
    return (response.status);
  }
}
