import React, { useContext, lazy, Suspense, useEffect } from "react";
import { Store } from "./store/Store";
import LoadingPage from "./components/common/loading-page/LoadingPage";
import AppHeader from "./components/app-level/app-header/AppHeader";
import "../styles/common.scss";
import PageToast from "./components/common/page-toast/PageToast";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppTabs from "./components/app-level/app-tabs/AppTabs";
import { setUserCredentialsFromStorageAction } from "./actions/ApplevelActions";
import SecondFooter from "./components/app-level/app-footer/SecondFooter";
import {
  LazyPhotoViewerComponent,
  CartComponent,
  LazyFeaturedAlbumsComponent,
} from "./routes/Routes";

const LazyServiceLoader = lazy(() =>
  import("./components/common/service-loader/ServiceLoader")
);

const LazyLandingPage = lazy(() =>
  import("./scenes/landing-page/PCLandingPage")
);
const LazyLoginPage = lazy(() => import("./scenes/sign-page/sign-in/PCSignIn"));
const LazyRegisterPage = lazy(() =>
  import("./scenes/sign-page/sign-up/PCSignUp")
);
const LazyHomePage = lazy(() => import("./scenes/home-page/HomePage"));
const LazyCustomerSupport = lazy(() =>
  import("./scenes/app-customer-support/CustomerSupport")
);
const LazyPasswordRecoverCom = lazy(() =>
  import("./scenes/sign-page/password-recover/PasswordRecover")
);
const LazyResetPasswordCom = lazy(() =>
  import("./scenes/sign-page/password-recover/ResetPassword")
);
const LazyPrivacyPolicy = lazy(() =>
  import("./scenes/privacy-policy/PrivacyPolicy")
);

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
          {!["LoginPage", "SignUpPage", "PasswordRecoverPage"].includes(
            currentPage
          ) ? (
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
          {isDataLoading && <LazyServiceLoader />}
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
              <Route
                path="/password-recovery"
                component={LazyPasswordRecoverCom}
              >
                {/* <LazyLoginPage /> */}
              </Route>
              <Route
                path="/reset/:token"
                component={LazyResetPasswordCom}
              >
                {/* <LazyLoginPage /> */}
              </Route>
              <Route path="/signup" component={LazyRegisterPage}>
                <LazyRegisterPage />
              </Route>
              <Route
                path="/photo-viewer"
                component={LazyPhotoViewerComponent}
              ></Route>
              <Route
                path="/featured-albums/:album"
                component={LazyFeaturedAlbumsComponent}
              ></Route>
              <Route path="/cart/:email" component={CartComponent}></Route>
              <Route path="/support" component={LazyCustomerSupport}></Route>
              <Route exact path="/privacy-policy">
                <LazyPrivacyPolicy />
              </Route>
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
