import React, { useState } from "react";
import "./PhotoViewerRightSection.scss";
import { Radio, Input } from "antd";

const PhotoViwerRightSection = () => {
  const radioStyle = {
    display: "flex",
    height: "30px",
    lineHeight: "30px",
    alignItems: "center",
    marginBottom: "20px",
    color: "#f2efef",
  };
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const getPhotoDetails = () => {
    return (
      <>
        <div>
          <span>Collection: </span>
          <span>Nature</span>
        </div>
        <div>
          <span>Location: </span>
          <span>India</span>
        </div>
        <div>
          <span>Upload date: </span>
          <span>June 15, 2018</span>
        </div>
      </>
    );
  };
  return (
    <div className="photoviewer-right-section">
      <div className="photoviewer-right-section-header">Purchase License</div>
      <div className="photoviewer-right-section-radio-grp">
        <Radio.Group onChange={onChange} value={value}>
          <Radio style={radioStyle} value={1}>
            <span>&#8377; 200 for this image</span>
          </Radio>
          <Radio style={radioStyle} value={2}>
            <div>
              <span>&#8377; 100 for monthly subscription</span>
            </div>
          </Radio>
        </Radio.Group>
        <div style={{ marginLeft: "25px", marginTop: "-20px" }}>
          10 images per month
        </div>
      </div>
      <div className="photoviewer-right-section-add-to-cart">Add to Cart</div>
      <div className="photoviewer-right-section-photo-details">
        <div className="photo-details-title">Photo Details</div>
        <div className="photo-details-content">{getPhotoDetails()}</div>
      </div>
    </div>
  );
};

export default PhotoViwerRightSection;
