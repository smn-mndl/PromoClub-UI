import { getAlbumData } from "../api/api-creator";

export const setCurrentAlbumAction = async (dispatch, albumName) => {
  dispatch({
    type: "SET_CURRENT_ALBUM_ACTION",
    payload: albumName,
  });
};

export const getAlbumDetailsAction = async (
  dispatch,
  albumName,
  setDataLoading
) => {
  setCurrentAlbumAction(dispatch, albumName);
  let response = null;
  try {
    const service = await getAlbumData(albumName);
    response = service.data.result;
  } catch {
    response = [];
  }
  setDataLoading(false);
  dispatch({
    type: "SET_ALL_ALBUM_ACTION",
    payload: { albumName, response: response },
  });
};
