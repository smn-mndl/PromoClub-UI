import React from "react";
import { FullscreenOutlined } from "@ant-design/icons";

const PhotoViewerContainer = (props) => {
  const { setShowFullScreenImg, showFullScreenImg, selectedPhotoAttributes } =
    props;
  const getSrc = () => {
    let src = "";
    if (
      selectedPhotoAttributes["image_src"] &&
      selectedPhotoAttributes["image_src"]["small"]
    ) {
      src =
        selectedPhotoAttributes["image_src"] &&
        selectedPhotoAttributes["image_src"]["small"];
    } else if (
      selectedPhotoAttributes["image_src"] &&
      selectedPhotoAttributes["image_src"]["medium"]
    ) {
      src =
        selectedPhotoAttributes["image_src"] &&
        selectedPhotoAttributes["image_src"]["medium"];
    }
    return src;
  };
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
        src={getSrc()}
        alt={selectedPhotoAttributes["alt"]}
      ></img>
      <div className="background-color-gradient"></div>
    </>
  );
};

export default PhotoViewerContainer;
