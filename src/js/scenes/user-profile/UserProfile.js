import React, { useState, useContext } from "react";
import "./UserProfile.scss";
import UserCoverPic from "../../components/user-profile-cover-pic/UserProfileCoverPic";
import UserProfilePic from "../../components/user-profile-pic/UserProfilePic";
import { uploadCoverPicAction } from "../../actions/UserDetailsActions";
import { Store } from "../../store/Store";
import axios from "axios";
import ImageViewer from "../../components/image-viewer/ImageViewer";
import UserBio from "../../components/user-bio/UserBio";
import UserPublicationDetails from "../../components/user-publication-details/UserPublicationDetails";

const UserProfile = () => {
  const {
    state: {
      userDetails: { userDetails },
    },
  } = useContext(Store);
  const [coverPicDtls, setCoverPicDtls] = useState({
    transformConfig: null,
    imageDtls: { preview: null, raw: null },
  });
  const [prevCoverPicDtls, setPrevtCoverPicDtls] = useState(null);
  const [viewMode, setViewMode] = useState(true);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [showProgressbar, setShowProgressBar] = useState(false);
  const [openImageViewer, setOpenImageViewer] = useState(false);

  const saveCoverPic = (zoomScale) => {
    // debugger;
    setCoverPicDtls({
      ...coverPicDtls,
      transformConfig: zoomScale,
    });
    setPrevtCoverPicDtls({
      ...coverPicDtls,
      transformConfig: zoomScale,
    });
    const data = new FormData();
    data.append("profileImage", coverPicDtls.imageDtls.raw);
    data.append("config", coverPicDtls.transformConfig);
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
    // axios
    //   .post("http://localhost:8080/coverPicture", data, options, config)
    //   .then((res) => {
    //     setUploadPercentage(100);
    //   });
  };
  const coverPicCancelHandler = () => {
    //debugger;
    JSON.parse(JSON.stringify(prevCoverPicDtls))
      ? setCoverPicDtls(JSON.parse(JSON.stringify(prevCoverPicDtls)))
      : setCoverPicDtls({
          imageDtls: {
            preview: null,
            raw: null,
          },
          transformConfig: null,
        });
    setViewMode(true);
  };
  const handleCoverPicChange = (e) => {
    if (e && e.target && e.target.files && e.target.files[0]) {
      setCoverPicDtls({
        imageDtls: {
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0],
        },
        transformConfig: null,
      });
      setTimeout(() => {
        //TODO:: DB call for storing the cover pic
        console.log("time out function");
      }, 3000);
    } else {
      setViewMode(true);
    }
  };
  const imageClickHandler = () => {
    setOpenImageViewer(true);
  };
  return (
    <section className="user-profile-cont">
      <section
        className={
          coverPicDtls.imageDtls.preview
            ? "user-cover-pic-cont user-cover-pic-cont-no-border"
            : "user-cover-pic-cont"
        }
      >
        <UserCoverPic
          coverPicCancelHandler={coverPicCancelHandler}
          coverPicDtls={coverPicDtls}
          setCoverPicDtls={setCoverPicDtls}
          handleCoverPicChange={handleCoverPicChange}
          viewMode={viewMode}
          setViewMode={setViewMode}
          saveCoverPic={saveCoverPic}
          setPrevCoverPicConfig={setPrevtCoverPicDtls}
          imageClickHandler={imageClickHandler}
        />
        <UserProfilePic />
        {openImageViewer && (
          <ImageViewer
            setOpenImageViewer={setOpenImageViewer}
            image={coverPicDtls.imageDtls.preview}
          />
        )}
      </section>
      <section className="user-bio">
        <UserBio userDetails={userDetails} />
      </section>
      <section className="user-profile-feed">
        <UserPublicationDetails />
      </section>
    </section>
  );
};

export default UserProfile;
