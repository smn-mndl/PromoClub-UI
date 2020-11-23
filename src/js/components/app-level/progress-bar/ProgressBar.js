import React, { useState } from "react";
import "./ProgressBar.scss";

const ProgressBar = props => {
  return (
    <>
      <div className="progress-bar-track">
        <div
          className={
            props.percent === 100
              ? "progress-bar-thumb progress-bar-thumb-completed"
              : "progress-bar-thumb"
          }
          style={{ width: `${props.percent}%` }}
        >
          {props.percent === 100 ? "Completed" : `${props.percent}%`}
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
