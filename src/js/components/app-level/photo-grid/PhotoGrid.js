import React from "react";
import "./PhotoGrid.scss";
import { useCurrentWidth } from "../../../customhooks/customResizeHook";

const PhotoGrid = (props) => {
  const currentScreenWidth = useCurrentWidth();
  const photoList = props.imgDtls ? props.imgDtls : [];

  const getEachRow = (photos, totalRowWidth) => {
    return photos.map((each) => {
      return getEachImg(
        each,
        (Number(each.attributes.sizes.small_jpg.width) / totalRowWidth) * 100
      );
    });
  };
  const getEachImg = (each, width) => {
    return (
      <img
        src={each.attributes.image_src.small}
        style={{ objectFit: "cover", width: `${width}%`, height: "100%" }}
      ></img>
    );
  };
  const recursiveFunc = (list, dataHTML, rowCount) => {
    rowCount += 1;
    if (list.length > 0) {
      let data = null;
      if (currentScreenWidth > 1200) {
        data = list.splice(0, 5);
      } else if (currentScreenWidth < 1200 && currentScreenWidth > 1000) {
        data = list.splice(0, 3);
      } else if (currentScreenWidth < 1000 && currentScreenWidth > 800) {
        data = list.splice(0, 2);
      } else if (currentScreenWidth < 800 && currentScreenWidth > 500) {
        data = list.splice(0, 2);
      } else {
        data = list.splice(0, 1);
      }

      let totalRowWidth = data
        .map((each) => Number(each.attributes.sizes.small_jpg.width))
        .reduce((total, num) => {
          return total + num;
        }, 0);
      dataHTML.push(
        <div className="each-row">{getEachRow(data, totalRowWidth)}</div>
      );
      recursiveFunc(list, dataHTML, rowCount);
    } else {
      return dataHTML;
    }
  };
  const getPhotoCards = () => {
    let dataHTML = [];
    let rowCount = 0;
    // return [...photoList, ...photoList, ...photoList]
    //   .splice(0, 4)
    //   .map((each, index) => {
    //     return getEachImg(each, (each.imageDimension.x / 1057) * 100);
    //   });
    let dataHTML1 = recursiveFunc(
      // [...photoList, ...photoList, ...photoList],
      [...photoList],
      dataHTML,
      rowCount
    );
    // debugger;
    return dataHTML;
  };
  const abc = () => {
    let abc1 = [];
    return [...photoList, ...photoList, ...photoList].map((each, index) => {
      return <div>{getEachImg(each)}</div>;
    });
    return abc1;
  };
  return (
    <div className="stockers-bay-photo-grid">
      <div class="grid-layout">{getPhotoCards()}</div>
      {/* <div id="photos">{getPhotoCards()}</div> */}
      {/* <section id="photos1" className="masonry-with-columns">
        {abc()}
      </section> */}
    </div>
  );
};

export default PhotoGrid;
