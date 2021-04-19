import { updateCartImageSize, downloadImage } from "../api/api-creator";
import { updateLocalStorage } from "./ApplevelActions";

export const updateCartImageSizeAction = async (
  dispatch,
  imageID,
  imageSize,
  cart,
  email
) => {
  const updatedCart = cart.map((each) => {
    let data = each;
    if (data.photoDtls._id === imageID) {
      data["imageSize"] = imageSize;
    }
    return data;
  });
  const update = updateCartImageSize({ email, updatedCart: updatedCart });
  if (update) {
    let cloneLocalStorage = JSON.parse(localStorage.getItem("appStorage"));
    cloneLocalStorage["userDetails"]["cart"] = updatedCart;
    updateLocalStorage(JSON.stringify(cloneLocalStorage));
  }
};
