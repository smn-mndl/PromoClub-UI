import React, { useState, useContext, useEffect } from "react";
import "./Register.scss";
import REGISTER_CONFIG from "./register-config";
import RegisterInput from "./RegisterInput";
import Axios from "axios";
import {
  userLoginStatusAction,
  goToPagesAction,
  setNavigationRouteAction,
} from "../../../actions/ApplevelActions";
import { Store } from "../../../store/Store";
import {makeApiCall} from "../../../api/api";
import { useHistory } from "react-router";
import Modal from "antd/lib/modal/Modal";
import SecondFooter from "../../../components/app-level/app-footer/SecondFooter";

const checkIfNonEmptyInptFld = (registerData) => {
  const keys = Object.keys(registerData);
  return keys.length === 6 &&
    keys.filter((each) => registerData[each].length === 0).length === 0
    ? true
    : false;
};

const checkIfPassMatch = (registerData) => {
  return registerData["firstpassword"] &&
    registerData["confirmpassword"] &&
    registerData["firstpassword"] === registerData["confirmpassword"]
    ? true
    : false;
};
const checkIfPassLengthMatch = (registerData) => {
  return registerData["firstpassword"] &&
    registerData["confirmpassword"] &&
    registerData["firstpassword"].length >= 8 &&
    registerData["confirmpassword"].length >= 8
    ? true
    : false;
};

const checkIfEmailIsValid = (registerData) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (
    registerData["email"] && re.test(String(registerData.email).toLowerCase())
  );
};

const checkIfInptFldValid = (registerData, setErrorInEmail) => {
  const iIfEmptyInptFld = checkIfNonEmptyInptFld(registerData),
    ifPassMatch = checkIfPassMatch(registerData),
    ifPassLengthMatch = checkIfPassLengthMatch(registerData),
    ifEmailValid = checkIfEmailIsValid(registerData);
  if (!iIfEmptyInptFld) {
    setErrorInEmail({
      error: true,
      errorText: "Fields can't be empty!",
    });
  } else if (!ifPassMatch) {
    setErrorInEmail({
      error: true,
      errorText: "Password didn't match! Please try again.",
    });
  } else if (!ifPassLengthMatch) {
    setErrorInEmail({
      error: true,
      errorText: "Password length shouldn't be less than 8!",
    });
  } else if (!ifEmailValid) {
    setErrorInEmail({
      error: true,
      errorText: "Invalid email address!",
    });
  }
  return iIfEmptyInptFld && ifPassMatch && ifEmailValid ? true : false;
};

const Register = () => {
  const { dispatch, state } = useContext(Store);
  const {
    navigation: { route, currentPage },
    isLoggedIn,
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
    if (isLoggedIn) {
      setErrorInEmail({
        error: true,
        isLoading: false,
        errorText: "You are already logged in. Please log out and try to register.",
      });
    } else {
      setErrorInEmail({
        error: false,
        isLoading: true,
        errorText: "",
      });
      const ifInptFldValid = checkIfInptFldValid(registerData, setErrorInEmail);
      if (ifInptFldValid) {
        const res = await makeApiCall({
          method: "POST",
          url: "registerUsers",
          payload: JSON.stringify(registerData),
          isLocal: false,
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
      }
    }
  };

  console.log("errorInEmail", errorInEmail, registerData);
  const arrow = `<`;

  useEffect(() => {
    if (currentPage !== "SignUpPage") {
      goToPagesAction(dispatch, "SignUpPage", "");
    }
  }, []);
  return (
    <>
      <div className="back-to-home">
        <span
          onClick={() => {
            history.goBack();
            // history.push(route);
          }}
        >
          <span>{arrow}</span>
          <span>Back</span>
        </span>
      </div>
      <div className="register-cont">
        <div className="register-inpt-cont">{registerInptFlds()}</div>
        {errorInEmail.error ? (
          <div className="email-error-txt">
            <span className="email-error-asterisk">* </span>
            {errorInEmail.errorText}
          </div>
        ) : null}
        <div className="register-btn-cont">
          <div
            className={
              errorInEmail.isLoading
                ? "register-link register-link--isloading"
                : "register-link"
              // : "register-link register-link-disabled"
            }
            onClick={() => onSubmit()}
          >
            Register
            {errorInEmail.isLoading ? <div className="btn-loader"></div> : null}
            {/* <div class="loader"></div> */}
          </div>
          <div className="login-link-cont">
            Already a member? Please
            <span
              className="login-link"
              onClick={
                () => {
                  setNavigationRouteAction(
                    dispatch,
                    `${history.location.pathname}${history.location.search}`
                  );
                  history.push("/login");
                }
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
      <SecondFooter />
    </>
  );
};

export default Register;
