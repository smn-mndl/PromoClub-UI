import React from "react";
import ProgressBar from "../../app-level/progress-bar/ProgressBar";
import "./PublishImageUpload.scss";

const PublishImageUpload = props => {
  const {
    handleChange,
    handleUpload,
    image,
    uploadPercentage,
    showProgressbar
  } = props;
  return (
    <div className="pblsh-img-upld">
      <form onSubmit={handleUpload} enctype="multipart/form-data">
        <div align="center">
          <label htmlFor="upload-button">
            {image.preview ? (
              <img src={image.preview} />
            ) : (
              <>
                <div className="custom-pblsh-file-input">
                  <div>Upload</div>
                </div>
              </>
            )}
          </label>
          <input
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            onChange={handleChange}
            name="avatar"
          />
          {/* <br />
          <button
            type="submit"
            className={!image.preview && "disable-upld-btn"}
          >
            Upload
          </button> */}
        </div>
      </form>
      {/* {showProgressbar ? <ProgressBar percent={uploadPercentage} /> : null} */}
    </div>
  );
};

export default PublishImageUpload;
