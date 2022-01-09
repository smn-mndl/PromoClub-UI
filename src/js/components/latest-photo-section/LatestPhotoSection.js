import React, { useContext, useState, useEffect } from "react";
import "./LatestPhotoSection.scss";
import { useHistory } from "react-router";
import {
  photoClickAction,
  getLatestPhotosAction,
  setSeletedPhotoBlankAction,
} from "../../actions/PhotoDetailsActions";
import { Store } from "../../store/Store";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";
import { LazyImage } from "../app-level/lazy-image-loading/LazyImage";

const photoClickHandler = (clickedPhotoDtls, dispatch, history) => {
  let title = clickedPhotoDtls["attributes"]["title"],
    id = clickedPhotoDtls._id;
  history.push(`/photo-viewer/?name=${title}&id=${id}`, { id });
  // photoClickAction(dispatch, clickedPhotoDtls);
  setSeletedPhotoBlankAction(dispatch);
};

const getShadowCards = () => {
  let shadowCards = [];
  for (let i = 0; i < 10; i++) {
    shadowCards.push(
      <>
        <div class="cards">
          <div class="card3">
    
          </div>

          <div class="card is-loading">
            <div class="image"></div>
            <div class="content">
              <h2></h2>
              <p></p>
            </div>
          </div>
        </div>
        {/* <div className="latest-photo-cards blog-card spring-fever shadow-cards">
          <div class="color-overlay"></div>
        </div> */}
      </>
    );
  }
  return shadowCards;
};

const getPhotoCards = (dispatch, history, latestPhotos) => {
  return latestPhotos && latestPhotos.length > 0
    ? latestPhotos.map((each, index) => {
        return (
          <div
            className="latest-photo-cards blog-card spring-fever"
            onClick={() => photoClickHandler(each, dispatch, history)}
          >
            {/* <img
              src={each["attributes"]["image_src"]["240p"]}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              alt={each["attributes"]["alt"]}
            ></img> */}
            <LazyImage
              key={index}
              src={each["attributes"]["image_src"]["extra_small"]}
              alt={each["attributes"]["alt"]}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
            <div class="title-content">
              <h5>
                <a href="#">{each.attributes.title}</a>
              </h5>
            </div>
            <div class="card-info">{each.attributes.description}</div>
            <div class="color-overlay"></div>
          </div>
        );
      })
    : getShadowCards();
};

const determineScrollState = (textarea, showArrowObj) => {
  const scrollState = JSON.parse(JSON.stringify(showArrowObj));
  let left = false,
    right = false;
  if (textarea && textarea.getBoundingClientRect() && scrollState.left === 0) {
    right = true;
  } else if (
    textarea &&
    textarea.getBoundingClientRect() &&
    Math.ceil(scrollState.scrollWidth) <=
      Math.ceil(textarea.getBoundingClientRect().width) +
        Math.ceil(scrollState.left)
  ) {
    left = true;
  } else {
    left = true;
    right = true;
  }
  if (scrollState.scrollWidth === 0) {
    right = true;
  }
  return { left, right };
};

const LatestPhotoSection = () => {
  const {
    dispatch,
    state: { latestPhotos },
  } = useContext(Store);
  const [showArrowObj, setShowArrowObj] = useState({
    left: 0,
    scrollWidth: 0,
  });
  const [cardsContElem, setCardsContElem] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (!cardsContElem) {
      const textarea =
        document.getElementById("abc") && document.getElementById("abc");
      setCardsContElem(textarea);
    }
  }, []);

  const logScroll = (e) => {
    setShowArrowObj({
      left: e.target.scrollLeft,
      scrollWidth: e.target.scrollWidth,
    });
  };
  if (cardsContElem) {
    cardsContElem.onscroll = logScroll;
  }

  const rightCircleClickHandler = () => {
    const textarea1 =
      document.getElementById("abc") && document.getElementById("abc");
    // textarea.scrollLeft += 50;
    document.getElementById("abc").scrollLeft += 200;
    setShowArrowObj({
      ...showArrowObj,
      left: showArrowObj.left + 200,
    });
  };

  const leftCircleClickHandler = () => {
    const textarea1 =
      document.getElementById("abc") && document.getElementById("abc");
    // textarea.scrollLeft += 50;
    document.getElementById("abc").scrollLeft -= 200;
    setShowArrowObj({
      ...showArrowObj,
      left: showArrowObj.left - 200,
    });
  };

  const getScrollState = determineScrollState(cardsContElem, showArrowObj);

  useEffect(() => {
    if (!latestPhotos) {
      getLatestPhotosAction(dispatch);
    }
  }, []);
  return (
    <>
      <div className="latest-photo-section">
        <div className="section-title">Latest Photos</div>
        {getScrollState.left && (
          <LeftCircleFilled
            onClick={() => {
              leftCircleClickHandler();
            }}
          />
        )}
        <div className="section-cards" id="abc">
          {getPhotoCards(dispatch, history, latestPhotos)}
        </div>
        {getScrollState.right && (
          <RightCircleFilled
            onClick={() => {
              rightCircleClickHandler();
            }}
          />
        )}
      </div>
      {/* <button onClick={myFunction}>Scroll contents of div</button>

      <div id="myDIV">
        <div id="content">
          Some text inside a div element. Some text inside a div element.
        </div>
      </div> */}
    </>
  );
};

export default LatestPhotoSection;
