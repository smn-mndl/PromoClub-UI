import React from "react";
import { FullscreenOutlined } from "@ant-design/icons";

const PhotoViewerContainer = (props) => {
  const {
    setShowFullScreenImg,
    showFullScreenImg,
    selectedPhotoAttributes,
  } = props;
  return (
    <>
      <div
        className="full-screen-icon"
        onClick={() => setShowFullScreenImg(!showFullScreenImg)}
      >
        <FullscreenOutlined />
      </div>
      <img
        className="photo-section-img"
        src={
          selectedPhotoAttributes["image_src"] &&
          selectedPhotoAttributes["image_src"]["480p"]
        }
        alt={selectedPhotoAttributes["alt"]}
      ></img>
      <div className="background-color-gradient"></div>
    </>
  );
};

export default PhotoViewerContainer;
