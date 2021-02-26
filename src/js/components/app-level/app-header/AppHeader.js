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

const LazySignInCont = lazy(() => import("./SignInCont"));
const LAzyUserDetails = lazy(() => import("../user-details/UserDetails"));
const LazySideNav = lazy(() => import("../side-navbar/SideNav"));

const AppHeader = () => {
  const {
    dispatch,
    state,
    state: {
      navigation: { currentPage },
      userDetails: { userUpdates },
    },
  } = useContext(Store);
  const { isLoggedIn } = state;
  const [showDrpdwnOpt, setShowDrpdwnOpt] = useState(false);
  let history = useHistory();

  const publishBtnClickHandler = () => {
    goToPagesAction(dispatch, "PublishPage", "");
  };
  return (
    <>
      <section className="pc-app-header-cont">
        <header className="pc-hdr">
          <a
            onClick={() => {
              history.push("/");
              goToPagesAction(dispatch, "LandingPage", "");
            }}
          >
            Stocker's Bay
          </a>
          <div className="pc-hdr-menu">
            {/* <div>
              <Search />
            </div> */}
            <Tooltip
              placement="bottom"
              title={isLoggedIn ? "" : "Please login to publish"}
            >
              <div
                className={
                  isLoggedIn
                    ? currentPage === "PublishPage"
                      ? "publish-btn slcted-pagetab"
                      : "publish-btn"
                    : "publish-btn-disabled"
                }
                onClick={() => (isLoggedIn ? publishBtnClickHandler() : null)}
              >
                Publish
              </div>
            </Tooltip>

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
          />
        )}
      </section>
    </>
  );
};

export default AppHeader;
