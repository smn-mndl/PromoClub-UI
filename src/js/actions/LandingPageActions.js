import { getPublishedData } from "../api/api-creator";

export const getPublisedDataAction = async dispatch => {
  const publishedData = await getPublishedData();
  return dispatch({
    type: "PUBLISHED_DATA_ACTION",
    payload: publishedData.data
  });
};
