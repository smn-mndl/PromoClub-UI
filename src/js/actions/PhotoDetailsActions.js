export const signInBtnClickHandler = async (dispatch, currentPage, subPage) => {
  return dispatch({
    type: "SIGNIN_BTN_CLICK_ACTION",
    payload: { currentPage, subPage },
  });
};

export const photoClickAction = async (dispatch, clickedPhotoDtls) => {
  return dispatch({
    type: "PHOTO_CLICK_ACTION",
    payload: clickedPhotoDtls,
  });
};
