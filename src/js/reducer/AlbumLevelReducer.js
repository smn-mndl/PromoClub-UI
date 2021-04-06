export const albumReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_ALBUM_ACTION":
      return {
        ...state,
        albums: { ...state.albums, currentAlbum: action.payload },
      };
    case "SET_ALL_ALBUM_ACTION":
      const albumName = action.payload.albumName;
      const obj = {};
      obj[albumName] = action.payload.response;
      return {
        ...state,
        albums: {
          ...state.albums,
          allAlbums: { ...state.albums.allAlbums, ...obj },
        },
      };
    default:
      return state;
  }
};
