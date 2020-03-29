import React, { useState, useContext, lazy } from "react";
import "./AppHeader.scss";
import Search from "../search/Search";
import { Store } from "../../../store/Store";
import { goToPagesAction } from "../../../actions/ApplevelActions";
import { getPublisedDataAction } from "../../../actions/LandingPageActions";

const LazySignInCont = lazy(() => import("./SignInCont"));
const LAzyUserDetails = lazy(() => import("../user-details/UserDetails"));

const AppHeader = () => {
  const { dispatch, state } = useContext(Store);
  const { isLoggedIn } = state;
  const [showDrpdwnOpt, setShowDrpdwnOpt] = useState(false);

  const publishBtnClickHandler = () => {
    goToPagesAction(dispatch, "PublishPage", "");
  };
  return (
    <>
      <section className="pc-app-header-cont">
        <header className="pc-hdr">
          <a href="#">ABC</a>
          <div className="pc-hdr-menu">
            <div>
              <Search />
            </div>
            <div
              className="publish-btn"
              onClick={() => publishBtnClickHandler()}
            >
              Publish
            </div>
            <div
              className="sign-in-opt"
              onClick={() => setShowDrpdwnOpt(!showDrpdwnOpt)}
            >
              Sign In
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                class=""
                data-icon="down"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                className={
                  showDrpdwnOpt ? `sign-in-menu-up` : `sign-in-menu-down`
                }
              >
                <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
              </svg>
            </div>
          </div>
        </header>
        {isLoggedIn ? (
          <LAzyUserDetails
            dispatch={dispatch}
            showDrpdwnOpt={showDrpdwnOpt}
            setShowDrpdwnOpt={setShowDrpdwnOpt}
          />
        ) : (
          <LazySignInCont
            dispatch={dispatch}
            showDrpdwnOpt={showDrpdwnOpt}
            setShowDrpdwnOpt={setShowDrpdwnOpt}
          />
        )}
      </section>
    </>
  );
};

export default AppHeader;
