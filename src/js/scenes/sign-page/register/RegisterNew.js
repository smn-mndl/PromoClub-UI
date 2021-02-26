import React, { useState, useContext, useEffect } from "react";
import "./Register.scss";
import REGISTER_CONFIG from "./register-config";
import RegisterInput from "./RegisterInput";
import Axios from "axios";
import {
  userLoginStatusAction,
  goToPagesAction,
} from "../../../actions/ApplevelActions";
import { Store } from "../../../store/Store";
import makeApiCall from "../../../api/api";
import { useHistory } from "react-router";
import Modal from "antd/lib/modal/Modal";

const checkIfNonEmptyInptFld = (registerData) => {
  const keys = Object.keys(registerData);
  return keys.length === 6 &&
    keys.filter((each) => registerData[each].length === 0).length === 0
    ? true
    : false;
};

const checkIfPassMatch = (registerData) => {
  return registerData["firstpassword"] &&
    registerData["firstpassword"].length > 3 &&
    registerData["firstpassword"] === registerData["confirmpassword"]
    ? true
    : false;
};

const checkIfInptFldValid = (registerData) => {
  const iIfEmptyInptFld = checkIfNonEmptyInptFld(registerData),
    ifPassMatch = checkIfPassMatch(registerData);
  return iIfEmptyInptFld && ifPassMatch ? true : false;
};

const Register = () => {
  const { dispatch, state } = useContext(Store);
  const {
    navigation: { route, currentPage },
  } = state;
  const [registerData, setRegisterData] = useState({});
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [errorInEmail, setErrorInEmail] = useState({
    error: false,
    isLoading: false,
    errorText: "",
    successText: "",
  });

  let history = useHistory();

  const registerInptRow = (rowDtls) => {
    return (
      <RegisterInput
        rowDtls={rowDtls}
        registerData={registerData}
        setRegisterData={setRegisterData}
      />
    );
  };
  const registerInptFlds = () => {
    return REGISTER_CONFIG.map((each) => {
      return registerInptRow(each);
    });
  };
  const onSubmit = async () => {
    setErrorInEmail({
      error: false,
      isLoading: true,
      errorText: "",
    });
    const res = await makeApiCall({
      method: "POST",
      url: "registerUsers",
      payload: JSON.stringify(registerData),
      isLocal: true,
      isMock: false,
    });
    if (!res.data.result.isValid) {
      setErrorInEmail({
        error: true,
        isLoading: false,
        errorText: res.data.result.errorText,
      });
    } else {
      setErrorInEmail({
        error: false,
        isLoading: false,
        errorText: "",
      });
      setShowRegisterModal(true);
    }
  };
  const ifInptFldValid = checkIfInptFldValid(registerData);
  console.log("errorInEmail", errorInEmail, registerData);
  const arrow = `<`;

  useEffect(() => {
    if (currentPage !== "SignUpPage") {
      goToPagesAction(dispatch, "SignUpPage", "");
    }
  }, []);
  return (
    <>
      <div
        className="back-to-home"
        onClick={() => {
          // history.push("/");
          history.push(route);
        }}
      >
        <span>{arrow}</span>
        <span>Back</span>
      </div>
      <div className="register-cont">
        <div className="register-inpt-cont">{registerInptFlds()}</div>
        {errorInEmail.error ? (
          <div className="email-error-txt">
            <span className="email-error-asterisk">* </span>This email is
            already registered. Please try with different email id.
          </div>
        ) : null}
        <div className="register-btn-cont">
          <div
            className={
              ifInptFldValid
                ? errorInEmail.isLoading
                  ? "register-link register-link--isloading"
                  : "register-link"
                : "register-link register-link-disabled"
            }
            onClick={() => (ifInptFldValid ? onSubmit() : null)}
          >
            Register
            {errorInEmail.isLoading ? <div class="loader"></div> : null}
            {/* <div class="loader"></div> */}
          </div>
          <div className="login-link-cont">
            Already a member? Please{" "}
            <span
              className="login-link"
              onClick={
                () => history.push("/login")
                // signInBtnClickHandler(dispatch, "SignPage", "SignIn")
              }
            >
              Login
            </span>
          </div>
        </div>
        <Modal
          style={{ top: 20 }}
          visible={showRegisterModal}
          centered
          onCancel={() => {
            setShowRegisterModal(false);
            history.push("/");
            setRegisterData({});
            userLoginStatusAction(dispatch, true);
          }}
          footer={null}
        >
          <p>Successfully Registered!</p>
        </Modal>
      </div>
    </>
  );
};

export default Register;
