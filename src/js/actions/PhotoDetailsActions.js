import {
  getLatestPhotos,
  getClickedPhotoDetails,
  getPhotoDetails,
  fetchMorePhotosFromAlbum,
} from "../api/api-creator";

export const signInBtnClickHandler = async (dispatch, currentPage, subPage) => {
  return dispatch({
    type: "SIGNIN_BTN_CLICK_ACTION",
    payload: { currentPage, subPage },
  });
};

export const photoClickAction = async (dispatch, id) => {
  const response = await getClickedPhotoDetails({ id });
  setClickPhotoAction(dispatch, response.data.result[0]);
};

export const setClickPhotoAction = async (dispatch, clickedPhotoDtls) => {
  return dispatch({
    type: "PHOTO_CLICK_ACTION",
    payload: clickedPhotoDtls,
  });
};
export const setImageSizeAction = async (dispatch, imgSize) => {
  return dispatch({
    type: "IMAGE_SIZE_ACTION",
    payload: imgSize,
  });
};

export const setSeletedPhotoBlankAction = async (dispatch) => {
  return dispatch({
    type: "SET_SELETED_PHOTO_BLANK_ACTION",
  });
};

export const getLatestPhotosAction = async (dispatch) => {
  const result = await getLatestPhotos();
  return dispatch({
    type: "SET_LATEST_PHOTOS",
    payload: result.data.result.latestPhotos,
  });
};

export const getPhotoDetailsAction = async (dispatch, id) => {
  const result = await getPhotoDetails(id);
  return dispatch({
    type: "SET_PHOTO_DETAILS",
    payload: result.data.result.latestPhotos,
  });
};
export const fetchMorePhotosFromAlbumAction = async (dispatch, collection_name) => {
  const result = await fetchMorePhotosFromAlbum(collection_name);
  return dispatch({
    type: "MORE_PHOTOS",
    payload: result.data.result,
  });
};
