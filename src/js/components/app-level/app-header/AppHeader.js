import React, { useState, useContext, lazy } from "react";
import "./AppHeader.scss";
import Search from "../search/Search";
import { Store } from "../../../store/Store";
import { goToPagesAction } from "../../../actions/ApplevelActions";
import { getPublisedDataAction } from "../../../actions/LandingPageActions";
import { Tooltip } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { changeUserUpdateAction } from "../../../actions/UserDetailsActions";
import PAGE_METADATA from "../../../model/PageMetadata";

const LazySignInCont = lazy(() => import("./SignInCont"));
const LAzyUserDetails = lazy(() => import("../user-details/UserDetails"));
const LazySideNav = lazy(() => import("../side-navbar/SideNav"));

const AppHeader = ({
  state,
  dispatch,
  currentPage,
  userUpdates,
  isLoggedIn,
}) => {
  // const {
  //   dispatch,
  //   state,
  //   state: {
  //     navigation: { currentPage },
  //     userDetails: { userUpdates },
  //   },
  // } = useContext(Store);
  // const { isLoggedIn } = state;
  const [showDrpdwnOpt, setShowDrpdwnOpt] = useState(false);
  let history = useHistory();

  return (
    <>
      <section className="pc-app-header-cont">
        <header className="pc-hdr">
          <a
            href="/"
            onClick={(evt) => {
              evt.preventDefault();
              history.push("/");
              currentPage !== "LandingPage" &&
                goToPagesAction(dispatch, "LandingPage", "");
            }}
          >
            Pixoque
          </a>
          <div className="pc-hdr-menu">
            <div
              className="sign-in-opt"
              onClick={() => {
                setShowDrpdwnOpt(!showDrpdwnOpt);
                changeUserUpdateAction(dispatch, false);
              }}
            >
              {!showDrpdwnOpt ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              {userUpdates && <div className="notification-dot"></div>}
            </div>
          </div>
        </header>
        {isLoggedIn ? (
          <LAzyUserDetails
            state={state}
            dispatch={dispatch}
            showDrpdwnOpt={showDrpdwnOpt}
            setShowDrpdwnOpt={setShowDrpdwnOpt}
            history={history}
          />
        ) : (
          <LazySideNav
            dispatch={dispatch}
            showDrpdwnOpt={showDrpdwnOpt}
            setShowDrpdwnOpt={setShowDrpdwnOpt}
            isLoggedIn={isLoggedIn}
            sidenavConfig={PAGE_METADATA.SIDE_NAV_METADATA}
          />
        )}
      </section>
    </>
  );
};

export default AppHeader;
