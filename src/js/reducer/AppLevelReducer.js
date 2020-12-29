import { miscReducer } from "./MiscReducer";

export const reducer = (state, action) => {
  switch (true) {
    case action.type === "SIGNIN_BTN_CLICK_ACTION":
      return {
        ...state,
        navigation: {
          ...state.navigation,
          currentPage: action.payload.currentPage,
          subPage: action.payload.subPage,
        },
      };
    case action.type === "PAGE_CLICK_ACTION":
      return {
        ...state,
        navigation: {
          ...state.navigation,
          currentPage: action.payload.currentPage,
          subPage: action.payload.subPage,
        },
      };
    case action.type === "CURRENT_TAB_ACTION":
      return {
        ...state,
        navigation: {
          ...state.navigation,
          currentTab: action.payload,
        },
      };
    case action.type === "SET_USER_DETAILS_ACTION":
      return {
        ...state,
        userDetails: action.payload,
      };
    case action.type === "SET_USER_LOGIN_STATUS_ACTION":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case action.type === "PUBLISHED_DATA_LENGTH_ACTION":
      return {
        ...state,
        publishedDataCount: action.payload,
      };

    case action.type === "PUBLISHED_DATA_ACTION":
      return {
        ...state,
        publishedData: action.payload,
      };
    case action.type === "PUBLISHED_DATA_LOADING_ACTION":
      return {
        ...state,
        isPublishDataLoading: action.payload,
      };

    case action.type === "SET_SELECTED_LANGUAGE":
      return {
        ...state,
        navigation: {
          ...state.navigation,
          slctdLan: action.payload,
        },
      };
    case action.type === "SET_LANGUAGE_CODES_ACTION":
      return {
        ...state,
        languageCodes: action.payload,
      };
    case action.type === "PHOTO_CLICK_ACTION":
      return {
        ...state,
        selectedPhotoDetails: action.payload,
      };
    case action.type.includes("MISC"):
      return miscReducer(state, action);

    default:
      return state;
  }
};
