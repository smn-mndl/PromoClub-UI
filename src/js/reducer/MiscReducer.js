export const miscReducer = (state, action) => {
  switch (action.type) {
    case "SET_PAGE_TOAST_MISC_ACTION":
      return { ...state, pageToast: action.payload };
    default:
      return state;
  }
};
