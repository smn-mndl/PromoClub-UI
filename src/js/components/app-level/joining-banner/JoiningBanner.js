import React from "react";
import "./JoiningBanner.scss";
import { setNavigationRouteAction } from "../../../actions/ApplevelActions";

const JoiningBanner = ({ dispatch, history }) => {
  return (
    <div className="joining-banner">
      <div>Get stock images for free as our initial user.</div>
      <div
        className="joining-banner-link"
        onClick={() => {
          setNavigationRouteAction(
            dispatch,
            `${history.location.pathname}${history.location.search}`
          );
          history.push(`/signup`);
        }}
      >
        Sign Up for Free
      </div>
    </div>
  );
};

export default JoiningBanner;
