import React, { useContext, lazy, Suspense } from "react";
import { Store } from "./store/Store";
import Fallback from "./components/common/fallback/Fallback";
import LoadingPage from "./components/common/loading-page/LoadingPage";
import AppHeader from "./components/app-level/app-header/AppHeader";
import "../styles/common.scss";
import PageToast from "./components/common/page-toast/PageToast";
const LazyLandingPage = lazy(() =>
  import("./scenes/landing-page/PCLandingPage")
);
// const LazySignPage = lazy(() => import("./scenes/sign-page/PCSignPage"));
const LazyPublishPage = lazy(() =>
  import("./scenes/publish-page/PCPublishPage")
);
// const LazyUserProfilePage = lazy(() =>
//   import("./scenes/user-profile/UserProfile")
// );
// const LazyUserInboxPage = lazy(() => import("./scenes/user-inbox/UserInbox"));

const getLazyComponent = (slctdPage) => {
  switch (slctdPage) {
    case "LandingPage":
      return <LazyLandingPage />;
    case "PublishPage":
      return <LazyPublishPage />;
    // case "SignPage":
    //   return <LazySignPage />;
    // case "UserProfilePage":
    //   return <LazyUserProfilePage />;
    // case "UserInboxPage":
    //   return <LazyUserInboxPage />;
    default:
      return <Fallback>404</Fallback>;
  }
};
const PromoClubRoot = (props) => {
  const {
    state,
    state: {
      navigation: { currentPage },
      pageToast,
    },
    dispatch,
  } = useContext(Store);
  console.log("state", state);
  return (
    <>
      {pageToast.show && (
        <PageToast
          toastType={pageToast.toastType}
          toastMsg={pageToast.toastMsg}
        />
      )}
      <Suspense fallback={<LoadingPage text="Loading..." />}>
        {currentPage !== "SignPage" ? (
          <header>
            <AppHeader />
          </header>
        ) : null}
        <main className={`pc-root-main-cont pc-root-main-cont-${currentPage}`}>
          {getLazyComponent(currentPage)}
        </main>
      </Suspense>
    </>
  );
};

export default PromoClubRoot;
