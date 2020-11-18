import { uploadCoverPic, getUserPublishedData } from "../api/api-creator";

export const uploadCoverPicAction = async ({ dispatch, data }) => {
  const publishedData = await uploadCoverPic(data);
};

export const getUserPublisedDataAction = async (dispatch, payload) => {
  // publishedDataLoadingAction(dispatch, true);
  const userPublishedData = await getUserPublishedData(payload);
  // publishedDataLoadingAction(dispatch, false);
  return dispatch({
    type: "USER_PUBLISHED_DATA_ACTION",
    payload: userPublishedData.data.result.publishedData,
  });
};
