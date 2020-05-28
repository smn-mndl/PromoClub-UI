import React, { useState, useContext } from "react";
import "./UserProfile.scss";
import UserCoverPic from "../../components/user-profile-cover-pic/UserProfileCoverPic";
import UserProfilePic from "../../components/user-profile-pic/UserProfilePic";
import { uploadCoverPicAction } from "../../actions/UserDetailsActions";
import { Store } from "../../store/Store";
import axios from "axios";

const UserProfile = () => {
  const {
    state: {
      userDetails: { userDetails },
    },
  } = useContext(Store);
  const [coverPic, setCoverPic] = useState({ preview: null, raw: null });
  const [coverPicConfig, setCoverPicConfig] = useState(null);
  const [viewMode, setViewMode] = useState(true);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [showProgressbar, setShowProgressBar] = useState(false);

  const saveCoverPic = () => {
    console.log("pic details", coverPic, coverPicConfig);
    const data = new FormData();
    data.append("profileImage", coverPic.raw);
    data.append("config", coverPicConfig);
    data.append(
      "email",
      userDetails ? userDetails.email : "smn.mndl1241@gmail.com"
    );

    const config = { headers: { "content-type": "multipart/form-data" } };

    const options = {
      onUploadProgress: (ProgressEvent) => {
        const { loaded, total } = ProgressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setUploadPercentage(percent);
        }
      },
    };
    setShowProgressBar(true);
    axios
      .post("http://localhost:8080/coverPicture", data, options, config)
      .then((res) => {
        setUploadPercentage(100);
      });
  };
  const handleCoverPicChange = (e) => {
    if (e && e.target && e.target.files && e.target.files[0]) {
      setCoverPic({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      setTimeout(() => {
        //TODO:: DB call for storing the cover pic
        console.log("time out function");
      }, 3000);
    } else {
      setCoverPic({ preview: null, raw: null });
      setViewMode(true);
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
          setCoverPicConfig={setCoverPicConfig}
          viewMode={viewMode}
          setViewMode={setViewMode}
          saveCoverPic={saveCoverPic}
        />
        <UserProfilePic />
      </section>
    </section>
  );
};

export default UserProfile;
