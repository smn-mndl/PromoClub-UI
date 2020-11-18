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
