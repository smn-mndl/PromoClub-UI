import { loginUser, registerUsers, getTranslation } from "../api/api-creator";
import { async } from "q";

export const signInBtnClickHandler = async (dispatch, currentPage, subPage) => {
  return dispatch({
    type: "SIGNIN_BTN_CLICK_ACTION",
    payload: { currentPage, subPage }
  });
};

export const goToPagesAction = async (dispatch, currentPage, subPage) => {
  return dispatch({
    type: "SIGNIN_BTN_CLICK_ACTION",
    payload: { currentPage, subPage }
  });
};

export const userLoginStatusAction = async (dispatch, loginStatus) => {
  return dispatch({
    type: "SET_USER_LOGIN_STATUS_ACTION",
    payload: loginStatus
  });
};

export const userRegisterAction = async (dispatch, payload) => {
  const reponse = await registerUsers(payload);
  return dispatch({
    type: "SET_REGISTER_DETAILS_ACTION",
    payload: reponse.data.result
  });
};

export const userLoginAction = async (dispatch, payload) => {
  const userDtls = await loginUser(payload);
  return dispatch({
    type: "SET_USER_DETAILS_ACTION",
    payload: userDtls.data.result
  });
};

export const setSelectedLanguageAction = async (dispatch, slctdLan) => {
  return dispatch({
    type: "SET_SELECTED_LANGUAGE",
    payload: slctdLan
  });
};

export const getLanguageCodesAction = async (dispatch, languageCodes) => {
  return dispatch({
    type: "SET_LANGUAGE_CODES_ACTION",
    payload: languageCodes
  });
};

export const getGoogleTranslateAction = async (dispatch, payload) => {
  const reponse = await getTranslation(payload);
};
