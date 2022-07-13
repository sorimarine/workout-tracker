const compareIgnoreCase = (str1, str2) => {
  return str1.toLowerCase() === str2.toLowerCase();
}

const findIndexIgnoreCase = (arr, str) => {
  return arr.findIndex(element => compareIgnoreCase(element, str))
}

const includesIgnoreCase = (arr, str) => {
  return findIndexIgnoreCase(arr, str) >= 0;
}

export { compareIgnoreCase, findIndexIgnoreCase, includesIgnoreCase }