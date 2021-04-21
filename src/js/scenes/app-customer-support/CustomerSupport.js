import React, { useState } from "react";
import "./CustomerSupport.scss";
import { checkEmailInput, checkNonEmptyInptFld } from "../../utils/app-utils";
import { saveCustomerSupportComplaintAction } from "../../actions/MiscActions";
import SecondFooter from "../../components/app-level/app-footer/SecondFooter";

const formHTML = (onChangeHandler) => {
  return (
    <>
      <div>
        <label>Name</label>
        <input
          type="text"
          onChange={(evt) => {
            onChangeHandler("name", evt.target.value);
          }}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          onChange={(evt) => {
            onChangeHandler("email", evt.target.value);
          }}
        ></input>
      </div>
      <div>
        <label>Description</label>
        <textarea
          onChange={(evt) => {
            onChangeHandler("description", evt.target.value);
          }}
        ></textarea>
      </div>
    </>
  );
};

const emailBoxHTML = ({
  setShowEmailBox,
  supportData,
  setSupportData,
  buttonEnabled,
  setButtonEnabled,
}) => {
  const submitBtnClickHandler = () => {
    // if (!fieldsCheck) {
    //   console.log("fill each field");
    // } else if (!emailCheck) {
    //   console.log("fill email field");
    // } else if (fieldsCheck && emailCheck) {
    console.log("save data", supportData);
    saveCustomerSupportComplaintAction(supportData);
    // }
  };
  const onChangeHandler = (key, value) => {
    supportData[key] = value;
    setSupportData(supportData);
    const emailCheck = checkEmailInput(supportData["email"]);
    const fieldsCheck = checkNonEmptyInptFld(supportData, 3);
    if (emailCheck && fieldsCheck) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  };
  return (
    <div className="email-box-cont">
      <span onClick={() => setShowEmailBox(false)}>X</span>
      <div>{formHTML(onChangeHandler)}</div>
      <button
        type="submit"
        className={!buttonEnabled && "button-disabled"}
        onClick={() => buttonEnabled && submitBtnClickHandler()}
      >
        Submit
      </button>
    </div>
  );
};

const CustomerSupport = () => {
  const [showEmailBox, setShowEmailBox] = useState(false);
  const [supportData, setSupportData] = useState({});
  const [buttonEnabled, setButtonEnabled] = useState(false);
  return (
    <>
      <div className="cust-support">
        <div className="support-header">Customer Support</div>
        <div className="support-tiles">
          <div>
            <h3>Email Us</h3>
            <p onClick={() => setShowEmailBox(true)}>
              <span className="email-icon"></span>
              <span>Send us a message.</span>
            </p>
          </div>
          <div>
            <h3>Call Us</h3>
            <p>
              <span className="phone-icon"></span>
              <span>Call us.</span>
            </p>
          </div>
        </div>
        {showEmailBox &&
          emailBoxHTML({
            setShowEmailBox,
            supportData,
            setSupportData,
            buttonEnabled,
            setButtonEnabled,
          })}
      </div>
      <SecondFooter />
    </>
  );
};

export default CustomerSupport;
