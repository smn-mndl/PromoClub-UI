import React, { useState, useEffect } from "react";
import * as d3 from "d3";

const GenerateSvg = (node, props) => {
  const svg = d3.select(node);
  return svg;
};
const CoverPic = (props) => {
  const {
    coverPicDtls,
    setEditingMode,
    editingMode,
    imageClickHandler,
  } = props;
  const [node, setNode] = useState(null);
  const [zoomTranformScale, setZoomTranformScale] = useState(null);
  const [coverPicImgDimension, setCoverPicImgDimension] = useState({
    coverpicHeight: document
      .querySelector(".cover-pic-form")
      .getBoundingClientRect().height,
    coverpicWidth: document
      .querySelector(".cover-pic-form")
      .getBoundingClientRect().width,
  });
  const { viewMode, setViewMode } = props;

  window.addEventListener("resize", () => {
    setTimeout(() => {
      setCoverPicImgDimension({
        coverpicHeight: document
          .querySelector(".cover-pic-form")
          .getBoundingClientRect().height,
        coverpicWidth: document
          .querySelector(".cover-pic-form")
          .getBoundingClientRect().width,
      });
    }, 2000);
  });

  useEffect(() => {
    console.log(
      "in use Effect",
      coverPicDtls.transformConfig,
      zoomTranformScale
    );
    setZoomTranformScale(coverPicDtls.transformConfig);
  }, [props.editingMode]);

  useEffect(() => {
    //debugger;
    const { coverpicHeight, coverpicWidth } = coverPicImgDimension;
    let svg = GenerateSvg(node, props);
    const g = svg
      .select("image")
      .attr("cursor", `${!viewMode ? "grab" : "unset"}`)
      .attr("transform", zoomTranformScale);

    if (!viewMode) {
      const started = () => {
        var circle = d3
          .select(".user-cover-pic-preview")
          .classed("dragging", true);

        const dragged = (d) => {
          console.log("d3 events", d3.event);
          circle
            .raise()
            .attr("x", (d.x = d3.event.x))
            .attr("y", (d.y = d3.event.y));
        };
        const ended = () => {
          circle.classed("dragging", false);
        };
        d3.event.on("drag", dragged).on("end", ended);
      };

      const zoomed = () => {
        setZoomTranformScale(d3.event.transform);
        g.attr("transform", d3.event.transform);
      };

      svg.call(
        d3
          .zoom()
          .extent([
            [0, 0],
            [coverpicWidth, coverpicHeight],
          ])
          .scaleExtent([1, 8])
          .on("zoom", zoomed)
      );
      //   svg.call(d3.drag().on("start", started));
    } else {
      d3.dragDisable(window);
      svg.on(".zoom", null);
    }
  }, [
    node,
    coverPicImgDimension.coverpicHeight,
    coverPicImgDimension.coverpicWidth,
    props,
    props.coverPicConfig,
  ]);
  console.log("viewMode", viewMode);
  return (
    <>
      <svg
        viewBox="0 0 30 20"
        preserveAspectRatio="xMaxYMid slice"
        width={coverPicImgDimension.coverpicWidth}
        height={coverPicImgDimension.coverpicHeight}
        ref={(node) => setNode(node)}
        id="123"
        style={{
          borderRadius: "0px 0px 10px 10px",
          cursor: `${!viewMode ? "grab" : "unset"}`,
        }}
      >
        <image
          className="user-cover-pic-preview"
          // className="user-cover-pic-preview"
          width="100%"
          height="100%"
          //   x="0"
          //   y="0"
          // style={{ objectFit: "none" }}
          xlinkHref={props.coverPicDtls.imageDtls.preview}
          onClick={() => imageClickHandler()}
        />
      </svg>
      {!viewMode && (
        <>
          <div
            className="user-cover-pic-save-btn"
            onClick={() => {
              props.saveCoverPic(zoomTranformScale);
              setViewMode(!viewMode);
              setEditingMode(null);
              // props.setCoverPicConfig(zoomTranformScale);
              // props.setPrevCoverPicConfig(zoomTranformScale);
            }}
          >
            Save
          </div>
          <div
            className="user-cover-pic-cancel-btn"
            // onClick={() => setViewMode(!viewMode)}
            onClick={() => {
              setZoomTranformScale(coverPicDtls.coverPicConfig);
              setEditingMode(null);
              props.coverPicCancelHandler();
            }}
          >
            Cancel
          </div>
        </>
      )}
    </>
  );
};

export default CoverPic;
