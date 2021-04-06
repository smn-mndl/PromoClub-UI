import React, { useEffect, useContext } from "react";
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

  let match = useRouteMatch();
  let albumName = match.path.search.split("=")[1];
  useEffect(() => {
    if (!currentAlbum) {
      getAlbumDetailsAction(dispatch, albumName);
    }
  }, []);

  return (
    <div className="featured-album-cont">
      <div className="album-header-cont">
        {allAlbums && currentAlbum && (
          <PhotoGrid imgDtls={allAlbums[currentAlbum]} />
        )}
      </div>
    </div>
  );
};

export default FeaturedAlbums;
