import React from "react";
import "./UserProfileCoverPic.scss";

const UserCoverPic = (props) => {
  const { coverPic, handleCoverPicChange } = props;
  return (
    <form onSubmit={() => {}} enctype="multipart/form-data">
      {coverPic && coverPic.preview ? (
        <img src={coverPic.preview} className="user-cover-pic-preview" />
      ) : null}
      <div align="center" className="upload-cntnr">
        <label htmlFor="upload-button">
          <div className="cover-pic-input">
            <div></div>
          </div>
        </label>
        <input
          type="file"
          id="upload-button"
          style={{ display: "none" }}
          onChange={handleCoverPicChange}
          name="avatar"
        />
      </div>
    </form>
  );
};

export default UserCoverPic;
