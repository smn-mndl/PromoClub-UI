import {
  uploadCoverPic,
  getUserPublishedData,
  saveToCart,
} from "../api/api-creator";
import { updateLocalStorage } from "./ApplevelActions";
import { setPageToastAction } from "./MiscActions";

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

export let addToCartAction = async ({
  dispatch,
  photoDtls,
  cart,
  imageSize,
  email,
  setIsAddingToCart,
}) => {
  //make service call and add it user details object in db.
  //if successful then show notification in UI else show error msg in UI
  let dbCart = cart && JSON.parse(JSON.stringify(cart));
  if (!dbCart) {
    dbCart = [];
  }
  dbCart.push({ photoDtls, imageSize });

  const dbResp = await saveToCart({ email, updatedCart: dbCart });
  if (dbResp) {
    const updatedCart = cart;
    const ifPresnt = updatedCart.filter(
      (each) => each.photoDtls._id === photoDtls._id
    );
    if (ifPresnt.length > 0) {
      //already present
      //error msg
      setIsAddingToCart({
        status: false,
        msg: "Already added to cart.",
        code: "error",
      });
      setPageToastAction(dispatch, {
        show: true,
        toastType: "warning",
        toastMsg: "Already added to cart.",
      });
    } else {
      updatedCart.push({ photoDtls, imageSize });
      let cloneLocalStorage = JSON.parse(localStorage.getItem("appStorage"));
      cloneLocalStorage["userDetails"]["cart"] = updatedCart;
      updateLocalStorage(JSON.stringify(cloneLocalStorage));
      setIsAddingToCart({
        status: false,
        msg: "Succuessfully added to cart.",
        code: "success",
      });
      setPageToastAction(dispatch, {
        show: true,
        toastType: "success",
        toastMsg: "Succuessfully added to cart.",
      });
    }
    changeUserUpdateAction(dispatch, false);
    return dispatch({
      type: "ADD_TO_CART_ACTION",
      payload: updatedCart,
    });
  } else {
    setIsAddingToCart({
      status: false,
      msg: "Something broke! Please try again later.",
      code: "error",
    });
    setPageToastAction(dispatch, {
      show: true,
      toastType: "error",
      toastMsg: "Something broke! Please try again later.",
    });
  }
};

export const changeUserUpdateAction = (dispatch, update) => {
  return dispatch({
    type: "USER_UPDATE_ACTION",
    payload: update,
  });
};
