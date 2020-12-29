export const STORE_DEFAULTS = {
  pageMask: false,
  pageToast: {
    show: false,
    toastType: null,
    toastMsg: null,
  },
  navigation: {
    currentPage: "LandingPage",
    subPage: null,
    slctdLan: {
      language: "en",
      name: "English",
    },
    currentTab: "",
  },
  selectedPhotoDetails: {},
  languageCodes: [],
  ind: false,
  userDetails: {},
  userPublishedData: null,
  isLoggedIn: false,
  publishedData: [],
  isPublishDataLoading: false,
  publishedDataCount: null,
};
