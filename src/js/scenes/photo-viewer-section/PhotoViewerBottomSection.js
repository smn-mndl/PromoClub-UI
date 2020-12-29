import React, { useContext } from "react";
import "./PhotoViewerBottomSection.scss";
import { Store } from "../../store/Store";
import img1 from "../../../images/latest/download.jpg";
import img2 from "../../../images/latest/download(1).jpg";
import img3 from "../../../images/latest/download(2).jpg";
import img4 from "../../../images/latest/download(3).jpg";
import img5 from "../../../images/latest/download(4).jpg";
import img6 from "../../../images/latest/download(5).jpg";
import img7 from "../../../images/latest/download(6).jpg";
import { useHistory } from "react-router";
import { photoClickAction } from "../../actions/PhotoDetailsActions";
import PhotoGrid from "../../components/app-level/photo-grid/PhotoGrid";

const imgDtls = [
  {
    url: "../../../../images/DSC_0121.JPG",
    img: img2,
    title: "img1",
    desc: "img1",
    imageDimension: {
      x: 275,
      y: 183,
    },
  },
  {
    url: "../../../../images/DSC_0122.JPG",
    img: img3,
    title: "img2",
    desc: "img1",
    imageDimension: {
      x: 299,
      y: 168,
    },
  },
  {
    url: "../../../../images/DSC_0174.JPG",
    img: img4,
    title: "img3",
    desc: "img1",
    imageDimension: {
      x: 183,
      y: 275,
    },
  },
  {
    url: "../../../../images/DSC_0247.JPG",
    img: img5,
    title: "img4",
    desc: "img1",
    imageDimension: {
      x: 300,
      y: 168,
    },
  },
  {
    url: "../../../../images/DSC_0247.JPG",
    img: img6,
    title: "img5",
    desc: "img1",
    imageDimension: {
      x: 300,
      y: 168,
    },
  },
  {
    url: "../../../../images/DSC_0247.JPG",
    img: img7,
    title: "img6",
    desc: "img1",
    imageDimension: {
      x: 275,
      y: 183,
    },
  },
  {
    url: "../../../../images/DSC_0247.JPG",
    img: img1,
    title: "img7",
    desc: "img1",
    imageDimension: {
      x: 225,
      y: 225,
    },
  },
];

const PhotoViewerBottomSection = () => {
  const { dispatch } = useContext(Store);
  let history = useHistory();

  const photoClickHandler = (clickedPhotoDtls) => {
    history.push(`/latest-photos/${clickedPhotoDtls.title}`);
    photoClickAction(dispatch, clickedPhotoDtls);
  };
  const getPhotoCards = () => {
    return imgDtls.map((each) => {
      return (
        <div
          className="latest-photo-cards blog-card spring-fever"
          onClick={() => photoClickHandler(each)}
        >
          <img
            src={each.img}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          ></img>
          <div class="title-content">
            <h5>
              <a href="#">{each.title}</a>
            </h5>
          </div>
          <div class="card-info">{each.title}</div>
          <div class="color-overlay"></div>
        </div>
      );
    });
  };
  return (
    <>
      <div className="photoviewer-bottom-section">
        <div className="section-title">More Photos From This Album</div>
        <div className="section-cards">{getPhotoCards()}</div>
        <div className="section-title section-title-similar-photos">
          Similar Photos
        </div>
        {/* <div className="section-cards">{getPhotoCards()}</div> */}
        <PhotoGrid imgDtls={imgDtls} />
      </div>
    </>
  );
};

export default PhotoViewerBottomSection;
