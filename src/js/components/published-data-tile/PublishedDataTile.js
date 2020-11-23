import React from "react";
import "./PublishedDataTile.scss";

const PublishedDataTile = ({ tileData }) => {
  const { title, desc, link, profileImageLoc } = tileData;
  return (
    <>
      <div className="published-data-tile-cont">
        <p>
          <img
            className="publish-tile-img"
            src={profileImageLoc}
            alt="loading..."
          />

          <div className="publish-tile-title">
            <span className="publish-tile-hdr">Title:</span> {title}
          </div>

          <div className="publish-tile-desc">
            <span className="publish-tile-hdr">Desc:</span>
            {""}
            {
              "descde scdescdescdescdescd escdescdescdescdescde scdescddescescdescdescd"
            }
          </div>

          <div className="publish-tile-link">
            <span className="publish-tile-hdr">Link:</span> {link}
          </div>
        </p>
      </div>
    </>
  );
};
export default PublishedDataTile;
