import React, { useState, useContext } from "react";
import LOGIN_CONFIG from "./login-config";
import LoginInput from "./LoginInput";
import "./Login.scss";
import {
  signInBtnClickHandler,
  userLoginAction,
  userLoginStatusAction,
  goToPagesAction
} from "../../../actions/ApplevelActions";
import { Store } from "../../../store/Store";

const Login = props => {
  const { dispatch, state } = useContext(Store);
  const {
    navigation: { subPage }
  } = state;
  const [loginData, setLoginData] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const loginInptRow = rowDtls => {
    return (
      <LoginInput
        rowDtls={rowDtls}
        loginData={loginData}
        setLoginData={setLoginData}
      />
    );
  };
  const loginInptFlds = () => {
    return props.loginConfig.map(each => {
      return loginInptRow(each);
    });
  };
  const onSubmit = () => {
    setIsLoggingIn(true);
    userLoginAction(dispatch, JSON.stringify(loginData), setIsLoggingIn);
  };
  const arrow = `<`;
  return (
    <>
      <div
        className="back-to-home"
        onClick={() => goToPagesAction(dispatch, "LandingPage", "")}
      >
        <span>{arrow}</span>
        <span>Back to home</span>
      </div>
      <div className="login-cont">
        <div className="login-inpt-cont">{loginInptFlds()}</div>
        <div className="login-btn-cont">
          <div className="login-link" onClick={() => onSubmit()}>
            {props.buttonTxt[0]}{" "}
            {isLoggingIn ? <div class="loader"></div> : null}
          </div>
          <div className="register-link-cont">
            {props.txt}{" "}
            <span
              className="register-link"
              onClick={() =>
                signInBtnClickHandler(dispatch, "SignPage", "SignUp")
              }
            >
              {props.buttonTxt[1]}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
