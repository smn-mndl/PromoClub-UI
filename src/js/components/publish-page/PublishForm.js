import React, { useState, useContext, useEffect } from "react";
import "./PublishForm.scss";
import { Store } from "../../store/Store";
import axios from "axios";
import PublishImageUpload from "./publish-image-upload/PublishImageUpload";
import PublishFormElem from "./publish-form-elem/PublishFormElem";
import { savePublishDataAction } from "../../actions/PublishPageActions";
import Resizer from "react-image-file-resizer";

const PublishForm = () => {
  const {
    dispatch,
    state: {
      userDetails: { userDetails },
    },
  } = useContext(Store);
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [showProgressbar, setShowProgressBar] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    if (e.target.files[0]) {
      console.log("targeet", e.target.files[0]);
      Resizer.imageFileResizer(
        e.target.files[0],
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          console.log(uri);
        },
        "JPEG"
      );
      console.log("JPEG", e.target.files[0]);
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      setUploadPercentage(0);
    }
  };

  const getPublishedData = () => {
    const data = JSON.parse(JSON.stringify(formData));
    return {
      title: data["pblsh-title"],
      desc: `${data["pblsh-details"]} ${data["pblsh-details-2"]}`,
      link: data["pblsh-link"],
    };
  };

  const handleUpload = async () => {
    // e.preventDefault();
    if (image.raw) {
      const pblshdData = getPublishedData();
      const data = new FormData();
      data.append("profileImage", image.raw);
      // data.append("filename", image.raw.name);
      data.append(
        "email",
        userDetails ? userDetails.email : "smn.mndl1241@gmail.com"
      );
      Object.keys(pblshdData).forEach((each) => {
        data.append(each, pblshdData[each]);
      });
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
        .post("http://localhost:8080/publishData", data, options, config)
        .then((res) => {
          setUploadPercentage(100);
        });
    }
  };

  const handlePublish = () => {
    handleUpload();
  };

  return (
    <div className="publish-form">
      <PublishImageUpload
        handleUpload={handleUpload}
        image={image}
        handleChange={handleChange}
        uploadPercentage={uploadPercentage}
        showProgressbar={showProgressbar}
      />
      <PublishFormElem
        formData={formData}
        setFormData={setFormData}
        handlePublish={handlePublish}
      />
    </div>
  );
};

export default PublishForm;
