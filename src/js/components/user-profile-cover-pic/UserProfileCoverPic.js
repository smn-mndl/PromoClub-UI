import React, { useState } from "react";
import "./UserProfileCoverPic.scss";
import LineChart from "../../scenes/user-inbox/Test";
import CoverPic from "./CoverPic";

const UserCoverPic = (props) => {
  const {
    coverPicDtls,
    setCoverPicDtls,
    handleCoverPicChange,
    viewMode,
    setViewMode,
    saveCoverPic,
    setPrevCoverPicConfig,
    coverPicCancelHandler,
    imageClickHandler,
  } = props;
  const [viewOptions, setViewOptions] = useState(false);
  const [editingMode, setEditingMode] = useState(null);

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
                    setEditingMode("upload");
                  }}
                  name="avatar"
                />
              </>
            ) : (
              coverPicDtls.imageDtls.preview && (
                <div
                  onClick={() => {
                    setViewOptions(false);
                    setViewMode(false);
                    setEditingMode("reposition");
                  }}
                >
                  {each}
                </div>
              )
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
        encType="multipart/form-data"
        className="cover-pic-form"
      >
        {coverPicDtls.imageDtls && coverPicDtls.imageDtls.preview ? (
          // <img src={coverPic.preview} className="user-cover-pic-preview" />
          <CoverPic
            coverPicDtls={coverPicDtls}
            viewMode={viewMode}
            setViewMode={setViewMode}
            handleCoverPicChange={handleCoverPicChange}
            saveCoverPic={saveCoverPic}
            editingMode={editingMode}
            setEditingMode={setEditingMode}
            setPrevCoverPicConfig={setPrevCoverPicConfig}
            coverPicCancelHandler={coverPicCancelHandler}
            imageClickHandler={imageClickHandler}
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
