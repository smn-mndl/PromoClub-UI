import makeApiCall from "./api";

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
    isLocal: true,
    isMock: false,
  });
};

export const loginUser = (payload) => {
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
  return makeApiCall({
    method: "POST",
    url: "loginUser",
    payload: data,
    isLocal: true,
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
    isLocal: true,
    isMock: false,
  });
};
export const getClickedPhotoDetails = (payload) => {
  return makeApiCall({
    method: "POST",
    url: "getPhotoDetails",
    payload,
    isLocal: true,
    isMock: false,
  });
};

export const getPhotoDetails = (payload) => {
  return makeApiCall({
    method: "POST",
    url: "photoDetails",
    payload,
    isLocal: true,
    isMock: false,
  });
};

export const updateCartImageSize = (payload) => {
  return makeApiCall({
    method: "POST",
    url: "updateCart",
    payload,
    isLocal: true,
    isMock: false,
  });
};
