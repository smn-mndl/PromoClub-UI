import { updateCartImageSize, downloadImage } from "../api/api-creator";
import {
  updateLocalStorage,
  setDataLoadingStatusAction,
  setUserCredentialsFromStorageAction,
} from "./ApplevelActions";

export const updateCartImageSizeAction = async ({
  dispatch,
  imageID,
  imageSize,
  cart,
  email,
}) => {
  setDataLoadingStatusAction(dispatch, true);
  const updatedCart = cart.map((each) => {
    let data = each;
    if (data.photoDtls._id === imageID) {
      data["imageSize"] = imageSize;
    }
    return data;
  });
  const update = await updateCartImageSize({ email, updatedCart: updatedCart });
  setDataLoadingStatusAction(dispatch, false);
  if (update) {
    let cloneLocalStorage = JSON.parse(localStorage.getItem("appStorage"));
    cloneLocalStorage["userDetails"]["cart"] = updatedCart;
    updateLocalStorage(JSON.stringify(cloneLocalStorage));
  }
};

export const emptyCartAction = async (dispatch, email) => {
  const update = await updateCartImageSize({ email, updatedCart: [] });
  if (update) {
    let cloneLocalStorage = JSON.parse(localStorage.getItem("appStorage"));
    cloneLocalStorage["userDetails"]["cart"] = [];
    updateLocalStorage(JSON.stringify(cloneLocalStorage));
    setUserCredentialsFromStorageAction(dispatch);
  }
};
