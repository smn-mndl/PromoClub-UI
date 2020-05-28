import { uploadCoverPic } from "../api/api-creator";

export const uploadCoverPicAction = async ({ dispatch, data }) => {
  const publishedData = await uploadCoverPic(data);
};
