import makeApiCall from "./api";

export const getPublishedData = () => {
  return makeApiCall({
    method: "GET",
    url: "./mock-data/published-data.json",
    payload: null,
    isLocal: true,
    isMock: true
  });
};
export const registerUsers = payload => {
  return makeApiCall({
    method: "POST",
    url: "registerUsers",
    payload: payload,
    isLocal: true,
    isMock: false
  });
};

export const loginUser = payload => {
  return makeApiCall({
    method: "POST",
    url: "loginUser",
    payload: payload,
    isLocal: false,
    isMock: false
  });
};

export const getLanguages = payload => {
  return makeApiCall({
    method: "GET",
    url: "loginUser",
    payload: payload,
    isLocal: false,
    isMock: false
  });
};

export const getTranslation = payload => {};
