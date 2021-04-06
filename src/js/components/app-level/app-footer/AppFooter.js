import React from "react";
import "./AppFooter.scss";
import { APP_FOOTER_CONFIG } from "./app-footer-config";
import SecondFooter from "./SecondFooter";

const AppFooter = () => {
  const getFooterHtmlElems = () => {
    return Object.values(APP_FOOTER_CONFIG).map((each) => {
      return (
        <div className="app-footer-list-block">
          {each.map((each1) => (
            <a href={`/${each1.link}`} className={`app-footer-list-items`}>
              {each1.disp}
            </a>
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
          <div className="footer-cont-list">{getFooterHtmlElems()}</div>
        </div>
        <SecondFooter />
        <div className="footer-overlay"></div>
      </div>
    </>
  );
};

export default AppFooter;
