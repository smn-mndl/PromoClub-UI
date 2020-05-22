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
  },
  languageCodes: [],
  ind: false,
  userDetails: {},
  isLoggedIn: false,
  publishedData: [],
  isPublishDataLoading: false,
  publishedDataCount: null,
};
