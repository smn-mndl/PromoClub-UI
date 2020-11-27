import React from "react";
import * as d3 from "d3";

const GetDimensions = (props) => {
  let margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = props && props.contWidth - margin.left - margin.right,
    height = 100;
  return { margin, width, height };
};

const GenerateSvg = (node, props) => {
  const { margin, width, height } = GetDimensions(props);
  const svg = d3
    .select(node)
    .attr(
      "width",
      document.querySelector(".cover-pic-form").getBoundingClientRect().width
    )
    .attr(
      "height",
      document.querySelector(".cover-pic-form").getBoundingClientRect().height
    );
  return svg;
};

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    console.log(
      "form",
      document.querySelector(".cover-pic-form").getBoundingClientRect().width
    );
  }
  componentDidMount() {
    this.createBarChart();
  }
  componentDidUpdate() {
    this.createBarChart();
  }
  createBarChart = () => {
    const height = document
      .querySelector(".cover-pic-form")
      .getBoundingClientRect().height;
    const width = document
      .querySelector(".cover-pic-form")
      .getBoundingClientRect().width;

    let svg = GenerateSvg(this.node, this.props);
    const g = svg.select("image").attr("cursor", "grab");

    svg.call(
      d3
        .zoom()
        .extent([
          [0, 0],
          [width, height],
        ])
        .scaleExtent([1, 8])
        .on("zoom", zoomed)
    );
    const started = () => {
      var circle = d3.select(".testimage");

      const dragged = (d) => {
        circle
          .raise()
          .attr("x", (d.x = d3.event.x))
          .attr("y", (d.y = d3.event.y));
      };
      d3.event.on("drag", dragged).on("end", ended);
      function ended() {
        circle.classed("dragging", false);
      }
    };
    svg.call(d3.drag().on("start", started));
    function zoomed() {
      g.attr("transform", d3.event.transform);
    }
    return svg.node();
  };

  render() {
    return (
      <svg
        viewBox="0 0 30 20"
        preserveAspectRatio="xMidYMid slice"
        width={
          document.querySelector(".cover-pic-form").getBoundingClientRect()
            .width
        }
        height={
          document.querySelector(".cover-pic-form").getBoundingClientRect()
            .height
        }
        ref={(node) => (this.node = node)}
        id="123"
      >
        <image
          className="testimage"
          width="100%"
          height="100%"
          //   x="0"
          //   y="0"
          style={{ objectFit: "none" }}
          xlinkHref={this.props.coverPic.preview}
        />
      </svg>
    );
  }
}

export default LineChart;
