export const setPageToastAction = async (
  dispatch,
  toast = { show: false, toastType: null, toastMsg: null }
) => {
  // if (toast.show) {
  //   setTimeout(() => setPageToastAction(dispatch), 3000);
  // }
  return dispatch({
    type: "SET_PAGE_TOAST_MISC_ACTION",
    payload: toast
  });
};
