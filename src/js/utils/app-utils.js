export const checkEmailInput = (inputEmail) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return inputEmail && re.test(String(inputEmail).toLowerCase());
};

export const passwordValidation = (password) => {
  const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/

  return password && reg.test(password);
};

export const checkNonEmptyInptFld = (inputData, mandatoryFieldCount) => {
  const keys = Object.keys(inputData);
  return keys.length === mandatoryFieldCount &&
    keys.filter((each) => inputData[each].length === 0).length === 0
    ? true
    : false;
};

export const checkPassMatch = (inputData) => {
  return inputData["firstpassword"] &&
    inputData["confirmpassword"] &&
    inputData["firstpassword"] === inputData["confirmpassword"]
    ? true
    : false;
};
export const checkPassLengthMatch = (inputData) => {
  return inputData["firstpassword"] &&
    inputData["confirmpassword"] &&
    inputData["firstpassword"].length >= 8 &&
    inputData["confirmpassword"].length >= 8
    ? true
    : false;
};
