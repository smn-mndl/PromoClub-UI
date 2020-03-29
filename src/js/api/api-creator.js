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

export const loginUser = payload => {
  return makeApiCall({
    method: "POST",
    url: "loginUser",
    payload: payload,
    isLocal: true,
    isMock: false
  });
};
