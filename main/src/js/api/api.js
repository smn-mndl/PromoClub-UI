import axios from "axios";

const API_URL = (isMock, isLocal) => {
  return !isMock ? "http://localhost:8080" : "";
};

const createStaticHeader = () => {
  return {
    mode: "cors",
    cache: "no-cache",
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    headers: {
      "Content-Type": "application/json"
    }
  };
};

const makeApiCall = async ({ method, url, payload, isLocal, isMock }) => {
  const staticHeader = createStaticHeader();
  const apiurl = `${API_URL(isMock, isLocal)}/${url}`;
  const apiHeader = {
    ...staticHeader,
    url: apiurl,
    method: method,
    data: payload
  };
  const response = axios(apiHeader);
  return response;
};

export default makeApiCall;
