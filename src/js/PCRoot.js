import React, { useContext, lazy, Suspense, useEffect } from "react";
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
import AppTabs from "./components/app-level/app-tabs/AppTabs";
import { setUserCredentialsFromStorageAction } from "./actions/ApplevelActions";
import SecondFooter from "./components/app-level/app-footer/SecondFooter";

const LazyServiceLoader = lazy(() =>
  import("./components/common/service-loader/ServiceLoader")
);
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
const LazyCustomerSupport = lazy(() =>
  import("./scenes/app-customer-support/CustomerSupport")
);

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const PromoClubRoot = (props) => {
  let {
    state,
    state: {
      navigation: { currentPage, currentTab },
      pageToast,
      selectedPhotoDetails,
      isLoggedIn,
      isDataLoading,
      userDetails,
    },
    dispatch,
  } = useContext(Store);
  console.log("state", state);

  useEffect(() => {
    if (
      localStorage.appStorage &&
      JSON.parse(localStorage.appStorage).userDetails
    ) {
      setUserCredentialsFromStorageAction(dispatch);
    }
  }, []);
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
      {isDataLoading && <LazyServiceLoader />}
      <Suspense fallback={<LoadingPage text="Loading..." />}>
        <Router>
          {currentPage !== "SignPage" ? (
            <>
              <header>
                <AppHeader
                  dispatch={dispatch}
                  currentTab={currentTab}
                  currentPage={currentPage}
                  isLoggedIn={isLoggedIn}
                  state={state}
                />
              </header>
            </>
          ) : null}
          {!["LoginPage", "SignUpPage"].includes(currentPage) ? (
            <>
              <div className="homepage-app-tabs">
                <AppTabs
                  dispatch={dispatch}
                  currentTab={currentTab}
                  isLoggedIn={isLoggedIn}
                />
              </div>
            </>
          ) : null}

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
              <Route path="/cart" component={CartComponent}></Route>
              <Route path="/support" component={LazyCustomerSupport}></Route>
              <Route path="*">
                <LazyHomePage />
              </Route>
            </Switch>
          </main>
        </Router>
      </Suspense>
    </>
  );
};

export default PromoClubRoot;
