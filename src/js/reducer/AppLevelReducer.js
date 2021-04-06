import { miscReducer } from "./MiscReducer";
import { each } from "lodash";
import { albumReducer } from "./AlbumLevelReducer";

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
        userDetails: {
          ...state.userDetails,
          profile: action.payload,
        },
      };
    case action.type === "SET_USER_LOGIN_STATUS_ACTION":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case action.type === "SET_DATA_LOADING_STATUS_ACTION":
      return {
        ...state,
        isDataLoading: action.payload,
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
        selectedPhotoDetails: {
          ...state.selectedPhotoDetails,
          image: action.payload,
          imageSize: "large_jpg",
        },
      };
    case action.type === "IMAGE_SIZE_ACTION":
      return {
        ...state,
        selectedPhotoDetails: {
          ...state.selectedPhotoDetails,
          imageSize: action.payload,
        },
      };
    case action.type === "SET_LATEST_PHOTOS":
      return {
        ...state,
        latestPhotos: action.payload,
      };
    case action.type === "SET_SELETED_PHOTO_BLANK_ACTION":
      return {
        ...state,
        selectedPhotoDetails: {},
      };
    case action.type === "SET_ROUTE_PATH":
      return {
        ...state,
        navigation: {
          ...state.navigation,
          route: action.payload,
        },
      };
    case action.type === "ADD_TO_CART_ACTION":
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          profile: {
            ...state.userDetails.profile,
            cart: action.payload,
          },
        },
      };
    case action.type === "USER_UPDATE_ACTION":
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          userUpdates: action.payload,
        },
      };
    case action.type.includes("MISC"):
      return miscReducer(state, action);
    case action.type.includes("ALBUM_ACTION"):
      return albumReducer(state, action);
    default:
      return state;
  }
};
