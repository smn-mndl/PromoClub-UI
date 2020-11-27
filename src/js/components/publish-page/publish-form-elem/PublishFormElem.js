import React from "react";
import "./PublishFormElem.scss";

const PublishFormElem = props => {
  const { formData, setFormData, handlePublish } = props;
  const clickHandler = (e, type) => {
    const tempObj = formData;
    tempObj[type] = e.target.value;
    setFormData(tempObj);
  };
  return (
    <div className="pblsh-form-elem">
      <label for="pblsh-title" className="inp pblsh-title">
        <input
          type="text"
          className="pblsh-form-input"
          id="pblsh-title"
          placeholder=""
          onChange={e => clickHandler(e, "pblsh-title")}
          value={formData["pblsh-title"]}
        />
        <span className="label">Title</span>
        <span className="focus-bg"></span>
      </label>
      <label for="pblsh-details" className="inp pblsh-details">
        <input
          type="text"
          className="pblsh-form-input"
          id="pblsh-details"
          placeholder=""
          value={formData["pblsh-details"]}
          onChange={e => clickHandler(e, "pblsh-details")}
        />
        <span className="label">Details</span>
        <span className="focus-bg"></span>
        <input
          type="text"
          className="pblsh-form-input"
          id="pblsh-details-2"
          placeholder=""
          value={formData["pblsh-details-2"]}
          onChange={e => clickHandler(e, "pblsh-details-2")}
        />
      </label>
      <label for="pblsh-link" className="inp pblsh-link">
        <input
          type="text"
          className="pblsh-form-input"
          id="pblsh-link"
          placeholder=""
          value={formData["pblsh-link"]}
          onChange={e => clickHandler(e, "pblsh-link")}
        />
        <span className="label">Link</span>
        <span className="focus-bg"></span>
      </label>
      <label for="submit-btn" className="inp pblsh-sbmt-btn">
        <div id="submit-btn" onClick={handlePublish}>
          Publish
        </div>
      </label>
    </div>
  );
};

export default PublishFormElem;
