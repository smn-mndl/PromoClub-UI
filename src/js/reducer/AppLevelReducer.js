import { miscReducer } from "./MiscReducer";

export const reducer = (state, action) => {
  switch (true) {
    case action.type === "SIGNIN_BTN_CLICK_ACTION":
      return {
        ...state,
        navigation: {
          ...state.navigation,
          currentPage: action.payload.currentPage,
          subPage: action.payload.subPage
        }
      };
    case action.type === "SET_USER_DETAILS_ACTION":
      return {
        ...state,
        userDetails: action.payload
      };
    case action.type === "SET_USER_LOGIN_STATUS_ACTION":
      return {
        ...state,
        isLoggedIn: action.payload
      };
    case action.type === "PUBLISHED_DATA_ACTION":
      return {
        ...state,
        publishedData: action.payload
      };
    case action.type === "SET_SELECTED_LANGUAGE":
      return {
        ...state,
        navigation: {
          ...state.navigation,
          slctdLan: action.payload
        }
      };
    case action.type === "SET_LANGUAGE_CODES_ACTION":
      return {
        ...state,
        languageCodes: action.payload
      };
    case action.type.includes("MISC"):
      return miscReducer(state, action);
    default:
      return state;
  }
};
