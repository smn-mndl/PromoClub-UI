import React from "react";
import "./ImageViewer.scss";

const ImageViewer = (props) => {
  const { setOpenImageViewer, image } = props;
  return (
    <div className="image-viewer-cont">
      <div className="image-cont">
        <svg
          viewBox="0 0 30 20"
          preserveAspectRatio="xMidYMid slice"
          width={"100%"}
          height={"100%"}
          id="1234"
        >
          <image
            width="100%"
            height="100%"
            x="0"
            y="0"
            style={{ objectFit: "contain" }}
            //   xlinkHref={image}
            xlinkHref={image}
          />
        </svg>
      </div>
      <div className="close-option" onClick={() => setOpenImageViewer(false)}>
        Close
      </div>
    </div>
  );
};

export default ImageViewer;
