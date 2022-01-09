import { makeApiCall, makeApiCallForResetPassword } from "./api";

export const getPublishedData = () => {
  return makeApiCall({
    method: "GET",
    url: "getAllPublishedData",
    payload: null,
    isLocal: true,
    isMock: false,
  });
};
export const getPublishedDataLength = () => {
  return makeApiCall({
    method: "GET",
    url: "getPublishedDataLength",
    payload: null,
    isLocal: true,
    isMock: false,
  });
};
export const registerUsers = (payload) => {
  return makeApiCall({
    method: "POST",
    url: "registerUsers",
    payload: payload,
    isLocal: false,
    isMock: false,
  });
};

export const loginUser = (payload) => {
  /**
   * 
   var email = JSON.parse(payload).email;
  var password = JSON.parse(payload).password;
  var query = `query login($email: String, $password: String) {
    login(email: $email, password: $password)
  }`;

  var data = JSON.stringify({
    query: `{
      UserLogin(email: "${email}", password: "${password}"){
      email,
      gender,
      firstName,
      lastname
    }
  }`,
    variables: {},
  });
   * 
   * 
   * */

  return makeApiCall({
    method: "POST",
    url: "loginUser",
    payload: payload,
    isLocal: false,
    isMock: false,
  });
};

export const getLanguages = (payload) => {
  return makeApiCall({
    method: "GET",
    url: "loginUser",
    payload: payload,
    isLocal: false,
    isMock: false,
  });
};

export const getTranslation = (payload) => {};

export const uploadFile = (payload) => {
  return makeApiCall({
    method: "POST",
    url: "uploadFile",
    payload: payload,
    isLocal: true,
    isMock: false,
  });
};

export const savePublishData = (payload) => {
  return makeApiCall({
    method: "POST",
    url: "publishData",
    payload: payload,
    isLocal: true,
    isMock: false,
  });
};

export const uploadCoverPic = (payload) => {
  return makeApiCall({
    method: "POST",
    url: "coverPicture",
    payload: payload,
    isLocal: true,
    isMock: false,
  });
};
export const getUserPublishedData = (payload) => {
  return makeApiCall({
    method: "POST",
    url: "getUserPublicationDetails",
    payload,
    isLocal: true,
    isMock: false,
  });
};

export const getLatestPhotos = () => {
  return makeApiCall({
    method: "GET",
    url: "latestPhotos",
    payload: null,
    isLocal: false,
    isMock: false,
  });
};
export const getClickedPhotoDetails = (payload) => {
  return makeApiCall({
    method: "POST",
    url: "getPhotoDetails",
    payload,
    isLocal: false,
    isMock: false,
  });
};

export const getPhotoDetails = (payload) => {
  return makeApiCall({
    method: "POST",
    url: "photoDetails",
    payload,
    isLocal: false,
    isMock: false,
  });
};
export const saveToCart = (payload) => {
  return makeApiCall({
    method: "POST",
    url: "saveToCart",
    payload,
    isLocal: false,
    isMock: false,
  });
};
export const updateCartImageSize = (payload) => {
  return makeApiCall({
    method: "POST",
    url: "updateCart",
    payload,
    isLocal: false,
    isMock: false,
  });
};

export const downloadImage = (url) => {
  return makeApiCall({
    method: "POST",
    url: "download",
    payload: { url },
    isLocal: false,
    isMock: false,
  });
};

export const saveCustomerComplaint = (complaint) => {
  return makeApiCall({
    method: "POST",
    url: "customerSupport",
    payload: { complaint },
    isLocal: false,
    isMock: false,
  });
};

export const getAlbumData = (albumName) => {
  return makeApiCall({
    method: "POST",
    url: "getAlbum",
    payload: { albumName },
    isLocal: false,
    isMock: false,
  });
};

export const checkIfResetTokenMatches = (token) => {
  return makeApiCallForResetPassword({
    method: "GET",
    url: "resetPassword",
    payload: token,
    isLocal: false,
    isMock: false,
  });
};
export const saveNewPassword = (newPass, token) => {
  return makeApiCall({
    method: "POST",
    url: "saveNewPassword",
    payload: { token, newPass },
    isLocal: true,
    isMock: false,
  });
};
export const fetchMorePhotosFromAlbum = (albumName) => {
  return makeApiCall({
    method: "POST",
    url: "morePhotos",
    payload: albumName,
    isLocal: true,
    isMock: false,
  });
};
