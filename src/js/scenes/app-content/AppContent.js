import React, { lazy } from "react";
import "./AppContent.scss";

const LazyLeftSctn = lazy(() =>
  import("../lndg-pg-left-sctn/PCLandingPageLeftSctn")
);
const LazyRightSctn = lazy(() =>
  import("../lndg-pg-right-sctn/PCLandingPageRightSctn")
);
const LazyMdlSctn = lazy(() =>
  import("../lndg-pg-mdl-sctn/PCLandingPageMiddleSctn")
);

const AppContent = () => {
  return (
    <>
      <section className="pc-lp-left-sctn pc-lp-sctn">
        <LazyLeftSctn />
      </section>
      <section className="pc-lp-middle-sctn pc-lp-sctn">
        <LazyMdlSctn />
      </section>
      <section className="pc-lp-right-sctn pc-lp-sctn">
        <LazyRightSctn />
      </section>
    </>
  );
};
export default AppContent;
