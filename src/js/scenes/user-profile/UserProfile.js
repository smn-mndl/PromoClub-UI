import React, { useState } from "react";
import "./UserProfile.scss";
import UserCoverPic from "../../components/user-profile-cover-pic/UserProfileCoverPic";

const UserProfile = () => {
  const [coverPic, setCoverPic] = useState({ preview: null, raw: null });
  const handleCoverPicChange = (e) => {
    if (e.target.files[0]) {
      setCoverPic({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      setTimeout(() => {
        //TODO:: DB call for storing the cover pic
        console.log("time out function");
      }, 3000);
    }
  };
  return (
    <section className="user-profile-cont">
      <section
        className={
          coverPic.preview
            ? "user-cover-pic-cont user-cover-pic-cont-no-border"
            : "user-cover-pic-cont"
        }
      >
        <UserCoverPic
          coverPic={coverPic}
          handleCoverPicChange={handleCoverPicChange}
        />
      </section>
    </section>
  );
};

export default UserProfile;
