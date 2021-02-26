import { updateCartImageSize } from "../api/api-creator";

export const updateCartImageSizeAction = async (
  dispatch,
  imageID,
  imageSize
) => {
  const update = updateCartImageSize({ imageID, imageSize });
};
