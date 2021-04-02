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

export const addToCartAction = async (dispatch, photoDtls, cart, imageSize) => {
  //make service call and add it user details object in db.
  //if successful then show notification in UI else show error msg in UI
  const dbResp = true;
  if (dbResp) {
    const updatedCart = cart;
    const ifPresnt = updatedCart.filter(
      (each) => each.photoDtls._id === photoDtls._id
    );
    if (ifPresnt.length > 0) {
      //already present
      //error msg
    } else {
      updatedCart.push({ photoDtls, imageSize });
    }
    changeUserUpdateAction(dispatch, true);
    return dispatch({
      type: "ADD_TO_CART_ACTION",
      payload: updatedCart,
    });
  }
};

export const changeUserUpdateAction = (dispatch, update) => {
  return dispatch({
    type: "USER_UPDATE_ACTION",
    payload: update,
  });
};
