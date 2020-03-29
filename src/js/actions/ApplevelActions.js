import { loginUser } from "../api/api-creator";

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

export const userLoginAction = async (dispatch, payload) => {
  const userDtls = await loginUser(payload);
  return dispatch({
    type: "SET_USER_DETAILS_ACTION",
    payload: userDtls.data.result
  });
};
