import { getAlbumData } from "../api/api-creator";

export const setCurrentAlbumAction = async (dispatch, albumName) => {
  dispatch({
    type: "SET_CURRENT_ALBUM_ACTION",
    payload: albumName,
  });
};

export const getAlbumDetailsAction = async (dispatch, albumName) => {
  setCurrentAlbumAction(dispatch, albumName);
  let response = null;
  try {
    response = await getAlbumData(albumName);
  } catch {
    response = [];
  }

  dispatch({
    type: "SET_ALL_ALBUM_ACTION",
    payload: { albumName, response: response },
  });
};
