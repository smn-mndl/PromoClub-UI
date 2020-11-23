import { getPublishedData, getPublishedDataLength } from "../api/api-creator";

export const getPublisedDataAction = async (dispatch) => {
  publishedDataLoadingAction(dispatch, true);
  const publishedData = await getPublishedData();
  publishedDataLoadingAction(dispatch, false);
  return dispatch({
    type: "PUBLISHED_DATA_ACTION",
    payload: publishedData.data.result.publishedData,
  });
};
export const publishedDataLoadingAction = async (dispatch, loadingState) => {
  return dispatch({
    type: "PUBLISHED_DATA_LOADING_ACTION",
    payload: loadingState,
  });
};
export const getPublishedDataLengthAction = async (dispatch) => {
  const publishedDataLength = await getPublishedDataLength();
  return dispatch({
    type: "PUBLISHED_DATA_LENGTH_ACTION",
    payload: publishedDataLength.data.result.publishedDataCount,
  });
};
