import React, { useContext, lazy, Suspense } from "react";
import { Store } from "./store/Store";
import Fallback from "./components/common/fallback/Fallback";
import LoadingPage from "./components/common/loading-page/LoadingPage";
import AppHeader from "./components/app-level/app-header/AppHeader";
import "../styles/common.scss";
const LazyLandingPage = lazy(() =>
  import("./scenes/landing-page/PCLandingPage")
);
const LazySignPage = lazy(() => import("./scenes/sign-page/PCSignPage"));
const LazyPublishPage = lazy(() =>
  import("./scenes/publish-page/PCPublishPage")
);

const getLazyComponent = slctdPage => {
  switch (slctdPage) {
    case "LandingPage":
      return <LazyLandingPage />;
    case "PublishPage":
      return <LazyPublishPage />;
    case "SignPage":
      return <LazySignPage />;
    default:
      return <Fallback>404</Fallback>;
  }
};
const PromoClubRoot = props => {
  const {
    state,
    state: {
      navigation: { currentPage }
    },
    dispatch
  } = useContext(Store);
  console.log("state", state);
  return (
    <>
      <Suspense fallback={<LoadingPage text="Loading..." />}>
        {currentPage !== "SignPage" ? (
          <header>
            <AppHeader />
          </header>
        ) : null}
        <main className="pc-root-main-cont">
          {getLazyComponent(currentPage)}
        </main>
      </Suspense>
    </>
  );
};

export default PromoClubRoot;
