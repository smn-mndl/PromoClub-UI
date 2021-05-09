import React, { useContext } from "react";
import "./HomePage.scss";
import AppTabs from "../../components/app-level/app-tabs/AppTabs";
import { Store } from "../../store/Store";
import LatestPhotoSection from "../../components/latest-photo-section/LatestPhotoSection";
import FeaturedPhotoSection from "../../components/featured-album-section/FeaturedPhotoSection";
import AppFooter from "../../components/app-level/app-footer/AppFooter";
import JoiningBanner from "../../components/app-level/joining-banner/JoiningBanner";
import { useHistory } from "react-router";

const HomePage = () => {
  const {
    state,
    state: {
      isLoggedIn,
      navigation: { currentTab, currentPage },
      pageToast,
    },
    dispatch,
  } = useContext(Store);
  let history = useHistory();
  return (
    <div className="homepage-cont">
      {!["LoginPage", "SignUpPage"].currentPage && !isLoggedIn ? (
        <>
          <div className="homepage-joining-banner">
            <JoiningBanner
              dispatch={dispatch}
              history={history}
              currentTab={currentTab}
            />
          </div>
        </>
      ) : null}
      <div className="homepage-app-content">
        <LatestPhotoSection />
        <FeaturedPhotoSection />
        <AppFooter />
      </div>
    </div>
  );
};

export default HomePage;
