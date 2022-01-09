import React, { useContext, useState, useEffect } from "react";
import "./PhotoViewerSection.scss";
import { Store } from "../../store/Store";
import Modal from "antd/lib/modal/Modal";
import PhotoViwerRightSection from "./PhotoViewerRightSection";
import PhotoViewerBottomSection from "./PhotoViewerBottomSection";
import { useQuery } from "../../routes/Routes";
import {
  setImageSizeAction,
  photoClickAction,
} from "../../actions/PhotoDetailsActions";
import { isEmpty } from "lodash";
import { useHistory } from "react-router";
import PhotoViewerContainer from "./PhotoViewContainer";
import { goToPagesAction } from "../../actions/ApplevelActions";

const PhotoViewerSection = () => {
  const {
    dispatch,
    state: {
      selectedPhotoDetails: { imageSize, image },
      isLoggedIn,
      userDetails: { profile },
      userDetails: {
        profile: { cart },
      },
      navigation: { currentPage },
    },
  } = useContext(Store);
  const [showFullScreenImg, setShowFullScreenImg] = useState(false);

  /** Set current page as Login Page if direct URL is entered */
  useEffect(() => {
    if (currentPage !== "LandingPage") {
      goToPagesAction(dispatch, `LandingPage`);
    }
  }, []);

  const setImageSize = (imgSize) => {
    setImageSizeAction(dispatch, imgSize);
  };
  let query = useQuery(),
    history = useHistory();
  let name = query.get("name"),
    id = query.get("id");

  useEffect(() => {
    let photoId = image && image._id;
    if (photoId !== id) {
      photoClickAction(dispatch, id);
    }
  }, [image, id]);

  const getKeywardsHTML = (selectedPhotoAttributes) => {
    const keywords = !isEmpty(selectedPhotoAttributes)
      ? selectedPhotoAttributes["keywords"]
      : ["None"];
    return (
      <div className="keywords">
        {keywords.map((each) => {
          return <div className="each-keyword">{each}</div>;
        })}
      </div>
    );
  };
  const selectedPhotoAttributes =
    image && image["attributes"] ? image["attributes"] : {};
  return (
    <>
      <div className="photoviewer-section">
        <div className="photo-section">
          <PhotoViewerContainer
            setShowFullScreenImg={setShowFullScreenImg}
            showFullScreenImg={showFullScreenImg}
            selectedPhotoAttributes={selectedPhotoAttributes}
          />
        </div>
        <div className="photo-desc-section">
          <PhotoViwerRightSection
            dispatch={dispatch}
            selectedPhotoDetails={image}
            isLoggedIn={isLoggedIn}
            history={history}
            cart={cart}
            imageSize={imageSize}
            setImageSize={setImageSize}
            profile={profile}
          />
          <div className="background-color-gradient"></div>
        </div>
      </div>
      <div className="section-title-keywards">
        <div className="section-title">Keywords</div>
        <div className="section-cards">
          {getKeywardsHTML(selectedPhotoAttributes)}
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
              selectedPhotoAttributes["image_src"] &&
              selectedPhotoAttributes["image_src"]["small"]
            }
            alt={selectedPhotoAttributes["alt"]}
          ></img>
        </Modal>
      )}
    </>
  );
};

export default PhotoViewerSection;
