// 
/**
 * Returns object with only params specified
 *
 * @param obj {object} Object to be filtered
 * @param params {String[]} String array containing design parameters
 */
export function keepParams(obj, params) {
  const cleanObj = {};
  for (var i in params) {
    cleanObj[params[i]] = obj[params[i]];
  }
  return cleanObj;
}
