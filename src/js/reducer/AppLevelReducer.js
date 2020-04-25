export const reducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN_BTN_CLICK_ACTION":
      return {
        ...state,
        navigation: {
          ...state.navigation,
          currentPage: action.payload.currentPage,
          subPage: action.payload.subPage
        }
      };
    case "SET_USER_DETAILS_ACTION":
      return {
        ...state,
        userDetails: action.payload
      };
    case "SET_USER_LOGIN_STATUS_ACTION":
      return {
        ...state,
        isLoggedIn: action.payload
      };
    case "PUBLISHED_DATA_ACTION":
      return {
        ...state,
        publishedData: action.payload
      };
    case "SET_SELECTED_LANGUAGE":
      return {
        ...state,
        navigation: {
          ...state.navigation,
          slctdLan: action.payload
        }
      };
    case "SET_LANGUAGE_CODES_ACTION":
      return {
        ...state,
        languageCodes: action.payload
      };
    default:
      return state;
  }
};
