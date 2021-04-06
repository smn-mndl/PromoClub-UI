import { getAlbumData } from "../api/api-creator";

export const setCurrentAlbumAction = async (dispatch, albumName) => {
  dispatch({
    type: "SET_CURRENT_ALBUM_ACTION",
    payload: albumName,
  });
};

export const getAlbumDetailsAction = async (dispatch, albumName) => {
  setCurrentAlbumAction(dispatch, albumName);
  const response = await getAlbumData(albumName);
  dispatch({
    type: "SET_ALL_ALBUM_ACTION",
    payload: { albumName, response: response.data.result },
  });
};
