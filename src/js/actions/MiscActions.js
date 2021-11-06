import { saveCustomerComplaint, saveNewPassword } from "../api/api-creator";

export const setPageToastAction = async (
  dispatch,
  toast = { show: false, toastType: null, toastMsg: null }
) => {
  if (toast.show) {
    setTimeout(() => setPageToastAction(dispatch), 3000);
  }
  return dispatch({
    type: "SET_PAGE_TOAST_MISC_ACTION",
    payload: toast,
  });
};

export const saveCustomerSupportComplaintAction = async (
  // dispatch,
  complaint
) => {
  const response = await saveCustomerComplaint(complaint);
};

export const saveNewPasswordAction = async (
  dispatch,
  newpassword,
  token,
  history
) => {
  const response = await saveNewPassword(newpassword, token);
  if(response.data.result.isValid){
    setPageToastAction(dispatch, {
      show: true,
      toastType: "success",
      toastMsg: "Password reset is successful",
    });
    history.push("/login")
  }else{
    setPageToastAction(dispatch, {
      show: true,
      toastType: "error",
      toastMsg: response.data.result.successText,
    });
  }
};
