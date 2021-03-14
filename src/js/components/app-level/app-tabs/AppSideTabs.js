import React from "react";
import SideNav from "../side-navbar/SideNav";
import PAGE_METADATA from "../../../model/PageMetadata";

const AppSideTabs = ({
  dispatch,
  showDrpdwnOpt,
  setShowDrpdwnOpt,
  isLoggedIn,
}) => {
  return (
    <SideNav
      dispatch={dispatch}
      showDrpdwnOpt={showDrpdwnOpt}
      setShowDrpdwnOpt={setShowDrpdwnOpt}
      isLoggedIn={isLoggedIn}
      sidenavConfig={PAGE_METADATA.APP_TABS_METADATA}
    />
  );
};

export default AppSideTabs;
