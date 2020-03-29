import React, { useState, useEffect, useContext } from "react";
import "./PCLandingPageMiddleSctn.scss";
import { Store } from "../../store/Store";
import { getPublisedDataAction } from "../../actions/LandingPageActions";
import PublishedDataTile from "../../components/published-data-tile/PublishedDataTile";

const LandingPageMiddleSctn = () => {
  const {
    state: { publishedData },
    dispatch
  } = useContext(Store);

  useEffect(() => {
    getPublisedDataAction(dispatch);
  }, []);
  const getTiles = () => {
    return publishedData.map(each => {
      return (
        <div>
          <PublishedDataTile tileData={each} />
        </div>
      );
    });
  };
  return (
    <>
      <div>{getTiles}</div>
    </>
  );
};
export default LandingPageMiddleSctn;
