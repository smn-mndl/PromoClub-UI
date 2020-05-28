import React, { useState, useEffect } from "react";
import * as d3 from "d3";

const GenerateSvg = (node, props) => {
  const svg = d3.select(node);
  return svg;
};
const CoverPic = (props) => {
  const [node, setNode] = useState(null);
  const { viewMode, setViewMode } = props;

  const coverpicHeight = document
      .querySelector(".cover-pic-form")
      .getBoundingClientRect().height,
    coverpicWidth = document
      .querySelector(".cover-pic-form")
      .getBoundingClientRect().width;

  useEffect(() => {
    let svg = GenerateSvg(node, props);
    const g = svg.select("image").attr("cursor", "grab");
    console.log("viewMode", viewMode);
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
        // console.log("zoom event", d3.event);
        props.setCoverPicConfig(d3.event.transform);
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
  }, [node, coverpicHeight, coverpicWidth, props]);

  return (
    <>
      <svg
        viewBox="0 0 30 20"
        preserveAspectRatio="xMidYMid slice"
        width={coverpicWidth}
        height={coverpicHeight}
        ref={(node) => setNode(node)}
        id="123"
        style={{ borderRadius: "0px 0px 10px 10px" }}
      >
        <image
          className="user-cover-pic-preview"
          // className="user-cover-pic-preview"
          width="100%"
          height="100%"
          //   x="0"
          //   y="0"
          style={{ objectFit: "none" }}
          xlinkHref={props.coverPic.preview}
        />
      </svg>
      {!viewMode && (
        <>
          <div
            className="user-cover-pic-save-btn"
            onClick={() => {
              props.saveCoverPic();
              setViewMode(!viewMode);
            }}
          >
            Save
          </div>
          <div
            className="user-cover-pic-cancel-btn"
            // onClick={() => setViewMode(!viewMode)}
            onClick={() => {
              props.handleCoverPicChange({ preview: null, raw: null });
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
