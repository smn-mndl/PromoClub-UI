import React from "react";
import "./FeaturedPhotoSection.scss";
import img1 from "../../../images/albumart/abstract.jpg";
import img2 from "../../../images/albumart/indoor.jpg";
import img3 from "../../../images/albumart/flowers.jpg";
import img4 from "../../../images/albumart/trees.jpg";
import { useHistory } from "react-router";
// import img5 from "../../../../images/albumart/download(4).jpg";
// import img6 from "../../../../images/albumart/download(5).jpg";
// import img7 from "../../../../images/albumart/download(6).jpg";

const imgDtls = [
  {
    url: "../../../../images/DSC_0121.JPG",
    img: img1,
    title: "Abstract",
    desc: "img1",
  },
  {
    url: "../../../../images/DSC_0122.JPG",
    img: img2,
    title: "Indoor",
    desc: "img1",
  },
  {
    url: "../../../../images/DSC_0174.JPG",
    img: img3,
    title: "Background",
    desc: "img1",
  },
  {
    url: "../../../../images/DSC_0247.JPG",
    img: img4,
    title: "Nature",
    desc: "img1",
  },
];

const FeaturedPhotoSection = () => {
  let history = useHistory();
  const albumClickHandler = (albumName) => {
    history.push(`/featured-albums/${albumName.toLowerCase()}`);
  };
  const getPhotoCards = () => {
    return imgDtls.map((each) => {
      return (
        <>
          <a class="grid__item" onClick={() => albumClickHandler(each.title)}>
            <div class="content">
              <div class="content-inside">
                <img
                  src={each.img}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "0",
                  }}
                ></img>
              </div>
            </div>
            <div className="grid-title">{each.title}</div>
            <div class="gradient-overlay"></div>
            <div class="color-overlay"></div>
          </a>
        </>
      );
    });
  };
  return (
    <>
      <div className="featured-photo-section">
        <div className="section-title">Featured Albums</div>
        {/* <div className="section-cards">{getPhotoCards()}</div> */}
        <div class="grid">{getPhotoCards()}</div>
      </div>
    </>
  );
};

export default FeaturedPhotoSection;
