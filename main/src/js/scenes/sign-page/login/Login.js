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

const Login = () => {
  const { dispatch, state } = useContext(Store);
  const {
    navigation: { subPage }
  } = state;
  const [loginData, setLoginData] = useState({});

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
    return LOGIN_CONFIG.map(each => {
      return loginInptRow(each);
    });
  };
  const onSubmit = () => {
    userLoginAction(dispatch, JSON.stringify(loginData));
    userLoginStatusAction(dispatch, true);
    goToPagesAction(dispatch, "LandingPage", "");
  };
  console.log("state", state);
  return (
    <>
      <div className="login-cont">
        <div className="login-inpt-cont">{loginInptFlds()}</div>
        <div className="login-btn-cont">
          <div className="login-link" onClick={() => onSubmit()}>
            Login
          </div>
          <div className="register-link-cont">
            Not a member? Please{" "}
            <span
              className="register-link"
              onClick={() =>
                signInBtnClickHandler(dispatch, "SignPage", "SignUp")
              }
            >
              Register
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
