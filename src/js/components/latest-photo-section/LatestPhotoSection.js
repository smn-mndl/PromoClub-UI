import React, { useContext, useState, useEffect } from "react";
import "./LatestPhotoSection.scss";
import img1 from "../../../images/latest/download.jpg";
import img2 from "../../../images/latest/download(1).jpg";
import img3 from "../../../images/latest/download(2).jpg";
import img4 from "../../../images/latest/download(3).jpg";
import img5 from "../../../images/latest/download(4).jpg";
import img6 from "../../../images/latest/download(5).jpg";
import img7 from "../../../images/latest/download(6).jpg";
import { useHistory } from "react-router";
import { photoClickAction } from "../../actions/PhotoDetailsActions";
import { Store } from "../../store/Store";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LeftCircleFilled,
  RightCircleFilled,
} from "@ant-design/icons";

const imgDtls = [
  {
    url: "../../../../images/DSC_0121.JPG",
    img: img1,
    title: "img1",
    desc: "img1",
  },
  {
    url: "../../../../images/DSC_0122.JPG",
    img: img2,
    title: "img2",
    desc: "img1",
  },
  {
    url: "../../../../images/DSC_0174.JPG",
    img: img3,
    title: "img3",
    desc: "img1",
  },
  {
    url: "../../../../images/DSC_0247.JPG",
    img: img4,
    title: "img4",
    desc: "img1",
  },
  {
    url: "../../../../images/DSC_0247.JPG",
    img: img5,
    title: "img5",
    desc: "img1",
  },
  {
    url: "../../../../images/DSC_0247.JPG",
    img: img6,
    title: "img6",
    desc: "img1",
  },
  {
    url: "../../../../images/DSC_0247.JPG",
    img: img7,
    title: "img7",
    desc: "img1",
  },
];

var isItScrollableWithoutVisibleScrollbars = function (el) {
  debugger;
  return (
    el &&
    el.scrollHeight > el.offsetHeight &&
    !(el.offsetWidth > el.scrollWidth)
  );
};

const photoClickHandler = (clickedPhotoDtls, dispatch, history) => {
  history.push(`/latest-photos/${clickedPhotoDtls.title}`);
  photoClickAction(dispatch, clickedPhotoDtls);
};

const getPhotoCards = (dispatch, history) => {
  return imgDtls.map((each) => {
    return (
      <div
        className="latest-photo-cards blog-card spring-fever"
        onClick={() => photoClickHandler(each, dispatch, history)}
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

const determineScrollState = (textarea, showArrowObj) => {
  const scrollState = JSON.parse(JSON.stringify(showArrowObj));
  let left = false,
    right = false;
  debugger;
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
  const { dispatch } = useContext(Store);
  const [showArrowObj, setShowArrowObj] = useState({
    left: 0,
    scrollWidth: 0,
  });
  const [cardsContElem, setCardsContElem] = useState(null);
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
  console.log("showArrowObj", showArrowObj);

  function myFunction() {
    var elmnt = document.getElementById("abc");
    elmnt.scrollLeft += 50;
    // elmnt.scrollTop += 10;
  }
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
          {getPhotoCards(dispatch, history)}
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
