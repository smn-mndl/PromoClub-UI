import React, { useContext, useState } from "react";
import "./PhotoViewerSection.scss";
import { Store } from "../../store/Store";
import { FullscreenOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import PhotoViwerRightSection from "./PhotoViewerRightSection";
import PhotoViewerBottomSection from "./PhotoViewerBottomSection";

const PhotoViewerSection = () => {
  const {
    dispatch,
    state: { selectedPhotoDetails },
  } = useContext(Store);
  const [showFullScreenImg, setShowFullScreenImg] = useState(false);
  return (
    <>
      <div className="photoviewer-section">
        <div className="photo-section">
          <div
            className="full-screen-icon"
            onClick={() => setShowFullScreenImg(!showFullScreenImg)}
          >
            <FullscreenOutlined />
          </div>
          <img
            className="photo-section-img"
            src={selectedPhotoDetails.img}
          ></img>
          <div className="background-color-gradient"></div>
        </div>
        <div className="photo-desc-section">
          <PhotoViwerRightSection />
          <div className="background-color-gradient"></div>
        </div>
      </div>
      <PhotoViewerBottomSection />
      {showFullScreenImg && (
        <Modal
          className="full-screen-img-modal"
          visible={showFullScreenImg}
          onCancel={() => {
            setShowFullScreenImg(false);
          }}
          footer={null}
        >
          <img
            className="photo-section-img"
            src={selectedPhotoDetails.img}
          ></img>
        </Modal>
      )}
    </>
  );
};

export default PhotoViewerSection;
