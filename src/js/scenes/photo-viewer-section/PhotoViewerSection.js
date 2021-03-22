import React, { useContext, useState, useEffect } from "react";
import "./PhotoViewerSection.scss";
import { Store } from "../../store/Store";
import { FullscreenOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import PhotoViwerRightSection from "./PhotoViewerRightSection";
import PhotoViewerBottomSection from "./PhotoViewerBottomSection";
import { useQuery } from "../../PCRoot";
import {
  getPhotoDetailsAction,
  photoClickAction,
} from "../../actions/PhotoDetailsActions";
import { isEmpty } from "lodash";
import { useHistory } from "react-router";

const PhotoViewerSection = () => {
  const {
    dispatch,
    state: {
      selectedPhotoDetails,
      isLoggedIn,
      userDetails: { cart },
    },
  } = useContext(Store);
  const [showFullScreenImg, setShowFullScreenImg] = useState(false);

  let query = useQuery(),
    history = useHistory();
  let name = query.get("name"),
    id = query.get("id");

  useEffect(() => {
    let photoId = selectedPhotoDetails && selectedPhotoDetails._id;
    if (photoId !== id) {
      photoClickAction(dispatch, id);
    }
  }, [selectedPhotoDetails]);

  const getKeywardsHTML = (selectedPhotoDetails) => {
    const keywords =
      selectedPhotoDetails && selectedPhotoDetails["attributes"]
        ? selectedPhotoDetails["attributes"]["keywords"]
        : ["None"];
    return (
      <div className="keywords">
        {keywords.map((each) => {
          return <div className="each-keyword">{each}</div>;
        })}
      </div>
    );
  };
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
            src={
              selectedPhotoDetails &&
              selectedPhotoDetails["attributes"] &&
              selectedPhotoDetails["attributes"]["image_src"]["480p"]
            }
            alt={
              selectedPhotoDetails &&
              selectedPhotoDetails["attributes"] &&
              selectedPhotoDetails["attributes"]["alt"]
            }
          ></img>
          <div className="background-color-gradient"></div>
        </div>
        <div className="photo-desc-section">
          <PhotoViwerRightSection
            dispatch={dispatch}
            selectedPhotoDetails={selectedPhotoDetails}
            isLoggedIn={isLoggedIn}
            history={history}
            cart={cart}
          />
          <div className="background-color-gradient"></div>
        </div>
      </div>
      <div className="section-title-keywards">
        <div className="section-title">Keywards</div>
        <div className="section-cards">
          {getKeywardsHTML(selectedPhotoDetails)}
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
            src={
              selectedPhotoDetails &&
              selectedPhotoDetails["attributes"] &&
              selectedPhotoDetails["attributes"]["image_src"]["480p"]
            }
            alt={
              selectedPhotoDetails &&
              selectedPhotoDetails["attributes"] &&
              selectedPhotoDetails["attributes"]["alt"]
            }
          ></img>
        </Modal>
      )}
    </>
  );
};

export default PhotoViewerSection;
