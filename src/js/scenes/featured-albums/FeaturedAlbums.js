import React, { useEffect, useContext, useState } from "react";
import "./FeaturedAlbums.scss";
import { useQuery } from "../../routes/Routes";
import { useHistory, useRouteMatch } from "react-router";
import { Store } from "../../store/Store";
import { isEmpty } from "lodash";
import { getAlbumDetailsAction } from "../../actions/AlbumLevelActions";
import PhotoGrid from "../../components/app-level/photo-grid/PhotoGrid";

const FeaturedAlbums = (props) => {
  const {
    dispatch,
    state: {
      albums: { currentAlbum, allAlbums },
    },
  } = useContext(Store);

  const [dataLoading, setDataLoading] = useState(false);

  let match = useRouteMatch();
  let history = useHistory();
  let albumName = match.path.search.split("=")[1];
  useEffect(() => {
    if (albumName !== currentAlbum) {
      setDataLoading(true);
      getAlbumDetailsAction(dispatch, albumName, setDataLoading);
    }
  }, []);

  return (
    <div className="featured-album-cont">
      <div className="album-header-cont">
        {allAlbums &&
        currentAlbum &&
        allAlbums[currentAlbum] &&
        allAlbums[currentAlbum].length > 0 ? (
          <PhotoGrid imgDtls={allAlbums[currentAlbum]} history={history} />
        ) : dataLoading ? (
          <div className="album-no-data">Data is loading...</div>
        ) : (
          <div className="album-no-data">Album is empty!</div>
        )}
      </div>
    </div>
  );
};

export default FeaturedAlbums;
