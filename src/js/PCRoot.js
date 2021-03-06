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
  useLocation,
  useParams,
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
const LazyUserCart = lazy(() => import("./scenes/user-cart/UserCart"));

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
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
  const CartComponent = () => {
    let match = useRouteMatch();
    let email = "suman.mondal1240@gmail.com";
    let query = useQuery();
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
          {!["LoginPage", "SignUpPage"].currentPage ? (
            <>
              <div className="homepage-app-tabs">
                <AppTabs dispatch={dispatch} currentTab={currentTab} />
              </div>
            </>
          ) : null}
          <div>
            <img
              className="pc-root-background"
              src={
                "https://photos-round1.s3.ap-south-1.amazonaws.com/DSC_2850.JPG"
              }
            ></img>
          </div>
          <main
            className={`pc-root-main-cont pc-root-main-cont-${currentPage}`}
          >
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
              {/*<Route path="/login" component={LazyLoginPage}>
                <LazyLoginPage />
              </Route>
              <Route path="/signup" component={LazyRegisterPage}>
                <LazyRegisterPage />
              </Route>
              <Route
                path="/latest-photos"
                component={LazyPhotoViewerComponent}
              ></Route>
              <Route path="/cart" component={CartComponent}></Route> */}
              <Route path="*">
                <LazyHomePage />
              </Route>
            </Switch>
          </main>
          test4
        </Router>
      </Suspense>
    </>
  );
};

export default PromoClubRoot;
