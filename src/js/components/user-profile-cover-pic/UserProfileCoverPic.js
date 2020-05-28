import React, { useState } from "react";
import "./UserProfileCoverPic.scss";
import LineChart from "../../scenes/user-inbox/Test";
import CoverPic from "./CoverPic";

const UserCoverPic = (props) => {
  const {
    coverPic,
    handleCoverPicChange,
    viewMode,
    setViewMode,
    saveCoverPic,
  } = props;
  const [viewOptions, setViewOptions] = useState(false);

  const getCoverpicOptions = () => {
    const arr1 = ["Upload", "Repostion"];
    return (
      <>
        <div
          className="cover-pic-page-mask"
          onClick={() => setViewOptions(!viewOptions)}
        ></div>
        <div className="coverpic-options">
          {arr1.map((each) => {
            return each === "Upload" ? (
              <>
                <label
                  className="cover-pic-upload-btn-label"
                  htmlFor="upload-button"
                >
                  Upload
                </label>
                <input
                  type="file"
                  id="upload-button"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setViewMode(false);
                    handleCoverPicChange(e);
                    setViewOptions(false);
                  }}
                  name="avatar"
                />
              </>
            ) : (
              coverPic.preview && <div>{each}</div>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <>
      <form
        onSubmit={() => {}}
        enctype="multipart/form-data"
        className="cover-pic-form"
      >
        {coverPic && coverPic.preview ? (
          // <img src={coverPic.preview} className="user-cover-pic-preview" />
          <CoverPic
            coverPic={coverPic}
            viewMode={viewMode}
            setViewMode={setViewMode}
            setCoverPicConfig={props.setCoverPicConfig}
            handleCoverPicChange={handleCoverPicChange}
            saveCoverPic={saveCoverPic}
          />
        ) : null}
        {viewMode && (
          <div align="center" className="upload-cntnr">
            {/* <label htmlFor="upload-button"> */}
            <div
              className="cover-pic-input"
              onClick={() => setViewOptions(!viewOptions)}
            >
              <div></div>
            </div>
            {/* </label> */}
            {/* <input
              type="file"
              id="upload-button"
              style={{ display: "none" }}
              onChange={(e) => {
                setViewMode(false);
                handleCoverPicChange(e);
              }}
              name="avatar"
            /> */}
          </div>
        )}
      </form>
      {viewOptions && getCoverpicOptions()}
    </>
  );
};

export default UserCoverPic;
