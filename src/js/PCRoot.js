import React, { useContext, lazy, Suspense } from "react";
import { Store } from "./store/Store";
import Fallback from "./components/common/fallback/Fallback";
import LoadingPage from "./components/common/loading-page/LoadingPage";
import AppHeader from "./components/app-level/app-header/AppHeader";
import "../styles/common.scss";
import PageToast from "./components/common/page-toast/PageToast";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import dscImg from "../images/DSC_2850.JPG";
import AppTabs from "./components/app-level/app-tabs/AppTabs";

const LazyPhotoViewerSection = lazy(() =>
  import("./scenes/photo-viewer-section/PhotoViewerSection")
);
const LazyLandingPage = lazy(() =>
  import("./scenes/landing-page/PCLandingPage")
);
const LazyLoginPage = lazy(() => import("./scenes/sign-page/sign-in/PCSignIn"));
const LazyRegisterPage = lazy(() =>
  import("./scenes/sign-page/sign-up/PCSignUp")
);
const LazyHomePage = lazy(() => import("./scenes/home-page/HomePage"));

const PromoClubRoot = (props) => {
  const {
    state,
    state: {
      navigation: { currentPage, currentTab },
      pageToast,
      selectedPhotoDetails,
    },
    dispatch,
  } = useContext(Store);
  console.log("state", state);

  const LazyPhotoViewerComponent = () => {
    let match = useRouteMatch();
    const photoId = selectedPhotoDetails.title;
    return (
      <Switch>
        <Route path={`${match.path}/${photoId}`}>
          <LazyPhotoViewerSection />
        </Route>
        <Route path="*">
          <LazyHomePage />
        </Route>
      </Switch>
    );
  };

  return (
    <>
      {pageToast.show && (
        <PageToast
          toastType={pageToast.toastType}
          toastMsg={pageToast.toastMsg}
        />
      )}
      <Suspense fallback={<LoadingPage text="Loading..." />}>
        <Router>
          {currentPage !== "SignPage" ? (
            <>
              <header>
                <AppHeader />
              </header>
            </>
          ) : null}
          {!["LoginPage", "Sign UpPage"].currentPage ? (
            <>
              <div className="homepage-app-tabs">
                <AppTabs dispatch={dispatch} currentTab={currentTab} />
              </div>
            </>
          ) : null}
          <div>
            <img className="pc-root-background" src={dscImg}></img>
          </div>

          <main
            className={`pc-root-main-cont pc-root-main-cont-${currentPage}`}
          >
            <div>
              <Switch>
                <Route exact path="/">
                  <LazyHomePage />
                </Route>
                <Route exact path="/home">
                  <LazyHomePage />
                </Route>
                <Route path="/landing" component={LazyLandingPage}>
                  <LazyLandingPage />
                </Route>
                <Route path="/login" component={LazyLoginPage}>
                  <LazyLoginPage />
                </Route>
                <Route path="/signup" component={LazyRegisterPage}>
                  <LazyRegisterPage />
                </Route>
                <Route
                  path="/latest-photos"
                  component={LazyPhotoViewerComponent}
                ></Route>
                <Route path="*">
                  <LazyHomePage />
                </Route>
              </Switch>
            </div>
          </main>
        </Router>
      </Suspense>
    </>
  );
};

export default PromoClubRoot;
