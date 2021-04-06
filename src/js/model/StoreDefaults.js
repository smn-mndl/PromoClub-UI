export const STORE_DEFAULTS = {
  albums: {
    allAlbums: {},
    currentAlbum: null,
  },
  isLoggedIn: false,
  isDataLoading: false,
  languageCodes: [],
  latestPhotos: null,
  navigation: {
    currentPage: "LandingPage",
    currentTab: "",
    route: "",
    slctdLan: {
      language: "en",
      name: "English",
    },
    subPage: null,
  },
  pageMask: false,
  pageToast: {
    show: false,
    toastMsg: null,
    toastType: null,
  },
  publishedData: [],
  publishedDataCount: null,
  selectedPhotoDetails: {
    imageSize: "large_jpg",
    image: {},
  },
  userActivity: {},
  userDetails: {
    profile: {},
    inbox: null,
    notification: null,
    settings: null,
    loginStatus: null,
    userUpdates: false,
  },
  userBio: {},
  userPublishedData: null,
};
