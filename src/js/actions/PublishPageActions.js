import { uploadFile, savePublishData } from "../api/api-creator";

export const uploadFileAction = async ({ dispatch, data }) => {
  const publishedData = await uploadFile(data);
  // return dispatch({
  //   type: "PUBLISHED_DATA_ACTION",
  //   payload: publishedData.data
  // });
};

export const savePublishDataAction = async (dispatch, payload) => {
  const response = await savePublishData(payload);
};
