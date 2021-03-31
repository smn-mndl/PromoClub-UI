import React from "react";
import "./AppFooter.scss";
import { APP_FOOTER_CONFIG } from "./app-footer-config";
import SecondFooter from "./SecondFooter";

const AppFooter = () => {
  const getFooterHtmlElems = () => {
    return Object.values(APP_FOOTER_CONFIG).map((each) => {
      return (
        <div className="app-footer-list-block">
          {each.map((each) => (
            <div className={`app-footer-list-items`}>{each.disp}</div>
          ))}
        </div>
      );
    });
  };

  return (
    <>
      <div className="app-footer">
        <div className="footer-title">Welcome to Bay of Stock images!</div>
        <div className="footer-cont">
          <div className="footer-cont-list">
            {/* <div className="inner-sec-header">Go To</div>
            <div className="inner-sec-list"></div> */}
            {getFooterHtmlElems()}
          </div>
        </div>
        <SecondFooter />
        <div className="footer-overlay"></div>
      </div>
    </>
  );
};

export default AppFooter;
