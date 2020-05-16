import { getPublishedData } from "../api/api-creator";

export const getPublisedDataAction = async dispatch => {
  const publishedData = await getPublishedData();
  const reader = new FileReader();
  publishedData.data.result.publishedData.map(each => {
    reader.readAsArrayBuffer(each.file);
    console.log("reader", reader);
  });

  return dispatch({
    type: "PUBLISHED_DATA_ACTION",
    payload: publishedData.data
  });
};
