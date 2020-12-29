import React, { useContext } from "react";
import "./HomePage.scss";
import AppTabs from "../../components/app-level/app-tabs/AppTabs";
import { Store } from "../../store/Store";
import LatestPhotoSection from "../../components/latest-photo-section/LatestPhotoSection";
import FeaturedPhotoSection from "../../components/featured-album-section/FeaturedPhotoSection";
import AppFooter from "../../components/app-level/app-footer/AppFooter";

const HomePage = () => {
  const {
    state,
    state: {
      navigation: { currentTab },
      pageToast,
    },
    dispatch,
  } = useContext(Store);
  return (
    <div className="homepage-cont">
      <div className="homepage-app-content">
        <LatestPhotoSection />
        <FeaturedPhotoSection />
        <AppFooter />
      </div>
    </div>
  );
};

export default HomePage;
