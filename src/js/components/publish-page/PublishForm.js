import React, { useState, useContext, useEffect } from "react";
import "./PublishForm.scss";
import { Store } from "../../store/Store";
import axios from "axios";
import PublishImageUpload from "./publish-image-upload/PublishImageUpload";
import PublishFormElem from "./publish-form-elem/PublishFormElem";
import { savePublishDataAction } from "../../actions/PublishPageActions";
import { storage } from "../../api/firebase";

const PublishForm = () => {
  const {
    dispatch,
    state: {
      userDetails: { userDetails }
    }
  } = useContext(Store);
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [showProgressbar, setShowProgressBar] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = e => {
    if (e.target.files[0]) {
      console.log("targeet", e.target.files[0])
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
      setUploadPercentage(0);
    }
  };

  const getPublishedData = () => {
    const data = JSON.parse(JSON.stringify(formData));
    return {
      title: data["pblsh-title"],
      desc: `${data["pblsh-details"]} ${data["pblsh-details-2"]}`,
      link: data["pblsh-link"]
    };
  };

  const handleUpload2 = () => {
    const uploadTask = storage.ref(`images/${image.raw.name}`).put(image.raw);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.raw.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
          });
      }
    );
  };

  const handleUpload = async () => {
    // e.preventDefault();
    if (image.raw) {
      const pblshdData = getPublishedData();
      const data = new FormData();
      data.append("file", image.raw);
      data.append("filename", image.raw.name);
      data.append(
        "email",
        userDetails ? userDetails.email : "smn.mndl1241@gmail.com"
      );
      data.append("publishedData", pblshdData);
      const config = { headers: { "content-type": "multipart/form-data" } };

      const options = {
        onUploadProgress: ProgressEvent => {
          const { loaded, total } = ProgressEvent;
          let percent = Math.floor((loaded * 100) / total);
          if (percent < 100) {
            setUploadPercentage(percent);
          }
        }
      };
      setShowProgressBar(true);
      axios
        .post("http://localhost:8080/uploadFile", data, options, config)
        .then(res => {
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
