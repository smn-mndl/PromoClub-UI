import React, { lazy } from "react";
import {
  //   BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
const LazyPhotoViewerSection = lazy(() =>
  import("../scenes/photo-viewer-section/PhotoViewerSection")
);
const LazyHomePage = lazy(() => import("../scenes/home-page/HomePage"));
const LazyUserCart = lazy(() => import("../scenes/user-cart/UserCart"));
const LazyFeaturedAlbumSection = lazy(() =>
  import("../scenes/featured-albums/FeaturedAlbums")
);

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
export const LazyPhotoViewerComponent = () => {
  let match = useRouteMatch();
  let query = useQuery();
  let name = query.get("name"),
    id = query.get("id");

  return (
    <Switch>
      <Route
        path={{
          pathname: `${match.path}/`,
          search: `?name=${name}&?${id}`,
        }}
      >
        <LazyPhotoViewerSection />
      </Route>
      <Route path="*">
        <LazyHomePage />
      </Route>
    </Switch>
  );
};
export const LazyFeaturedAlbumsComponent = () => {
  let match = useRouteMatch();
  let albumName = match.params.album;
  return (
    <Switch>
      <Route
        path={{
          pathname: `${match.path}/`,
          search: `?album=${albumName}`,
        }}
      >
        <LazyFeaturedAlbumSection />
      </Route>
      <Route path="*">
        <LazyHomePage />
      </Route>
    </Switch>
  );
};
export const CartComponent = () => {
  let match = useRouteMatch();
  let email = match.params;
  return (
    <Switch>
      <Route
        path={{
          pathname: `${match.path}/`,
          search: `?email=${email}`,
        }}
      >
        <LazyUserCart />
      </Route>
      <Route path="*">
        <LazyHomePage />
      </Route>
    </Switch>
  );
};
