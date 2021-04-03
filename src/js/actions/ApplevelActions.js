import { loginUser, registerUsers, getTranslation } from "../api/api-creator";
import { setPageToastAction } from "./MiscActions";

export const updateLocalStorage = (newStorage) => {
  localStorage.setItem("appStorage", newStorage);
};

export const signInBtnClickHandler = async (dispatch, currentPage, subPage) => {
  return dispatch({
    type: "SIGNIN_BTN_CLICK_ACTION",
    payload: { currentPage, subPage },
  });
};

export const goToPagesAction = async (dispatch, currentPage, subPage) => {
  return dispatch({
    type: "PAGE_CLICK_ACTION",
    payload: { currentPage, subPage },
  });
};

export const goToTabsAction = async (dispatch, currentTab) => {
  return dispatch({
    type: "CURRENT_TAB_ACTION",
    payload: currentTab,
  });
};
export const userLoginStatusAction = async (dispatch, loginStatus) => {
  return dispatch({
    type: "SET_USER_LOGIN_STATUS_ACTION",
    payload: loginStatus,
  });
};

export const setUserDetailsAction = async (dispatch, userDtls) => {
  return dispatch({
    type: "SET_USER_DETAILS_ACTION",
    payload: userDtls,
  });
};

export const setUserCredentialsFromStorageAction = async (dispatch) => {
  let userDetails, isLoggedIn;
  const appStorage = localStorage.appStorage;
  if (JSON.parse(appStorage).userDetails) {
    userDetails = JSON.parse(appStorage).userDetails;
    isLoggedIn = Boolean(JSON.parse(appStorage).isLoggedIn);
  }
  setUserDetailsAction(dispatch, userDetails);
  userLoginStatusAction(dispatch, isLoggedIn);
};

export const setDataLoadingStatusAction = async (dispatch, loadingStatus) => {
  return dispatch({
    type: "SET_DATA_LOADING_STATUS_ACTION",
    payload: loadingStatus,
  });
};
export const userRegisterAction = async (dispatch, payload) => {
  const reponse = await registerUsers(payload);
  return dispatch({
    type: "SET_REGISTER_DETAILS_ACTION",
    payload: reponse.data.result,
  });
};

export const userLoginAction = async (
  dispatch,
  payload,
  setIsLoggingIn,
  history
) => {
  const userDtls = await loginUser(payload);
  setIsLoggingIn(false);
  const isValid = userDtls.data.email ? true : false;
  userLoginStatusAction(dispatch, isValid);
  if (isValid) {
    setPageToastAction(dispatch, {
      show: true,
      toastType: "success",
      toastMsg: "Logged In!",
    });
    goToPagesAction(dispatch, "LandingPage", "");
    history.goBack();

    let cloneLocalStorage = JSON.parse(localStorage.getItem("appStorage"));
    if (!cloneLocalStorage) {
      cloneLocalStorage = {};
    }
    cloneLocalStorage["isLoggedIn"] = true;
    cloneLocalStorage["userDetails"] = userDtls.data;
    updateLocalStorage(JSON.stringify(cloneLocalStorage));
    setUserDetailsAction(dispatch, userDtls.data);
  } else {
    setPageToastAction(dispatch, {
      show: true,
      toastType: "error",
      toastMsg: "Please provide valid user details!",
    });
  }
};

export const setSelectedLanguageAction = async (dispatch, slctdLan) => {
  return dispatch({
    type: "SET_SELECTED_LANGUAGE",
    payload: slctdLan,
  });
};

export const getLanguageCodesAction = async (dispatch, languageCodes) => {
  return dispatch({
    type: "SET_LANGUAGE_CODES_ACTION",
    payload: languageCodes,
  });
};

export const getGoogleTranslateAction = async (dispatch, payload) => {
  const reponse = await getTranslation(payload);
};

export const setNavigationRouteAction = (dispatch, locationPath) => {
  dispatch({
    type: "SET_ROUTE_PATH",
    payload: locationPath,
  });
};

export const setUserActivityAction = (dispatch, payload) => {
  dispatch({
    type: "SET_USER_ACTIVITY",
    payload: payload,
  });
};
