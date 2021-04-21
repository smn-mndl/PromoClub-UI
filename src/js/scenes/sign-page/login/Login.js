import React, { useState, useContext, useEffect } from "react";
import LOGIN_CONFIG from "./login-config";
import LoginInput from "./LoginInput";
import "./Login.scss";
import {
  signInBtnClickHandler,
  userLoginAction,
  userLoginStatusAction,
  goToPagesAction,
  setNavigationRouteAction,
} from "../../../actions/ApplevelActions";
import { Store } from "../../../store/Store";
import { useHistory } from "react-router";
import SecondFooter from "../../../components/app-level/app-footer/SecondFooter";
import {
  checkEmailInput,
  checkNonEmptyInptFld,
} from "../../../utils/app-utils";

const Login = (props) => {
  const { dispatch, state } = useContext(Store);
  const {
    navigation: { route, currentPage },
  } = state;
  const [loginData, setLoginData] = useState({});
  const [enableLoginBtn, setEnableLoginBtn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  let history = useHistory();

  /** Set current page as Login Page if direct URL is entered */
  useEffect(() => {
    if (currentPage !== "LoginPage") {
      goToPagesAction(dispatch, `LoginPage`);
    }
  }, []);

  const onChangeHandler = (key, val) => {
    const tempObj = JSON.parse(JSON.stringify(loginData));
    tempObj[key] = val;
    setLoginData(tempObj);
    const emailCheck = checkEmailInput(tempObj["email"]);
    const fieldsCheck = checkNonEmptyInptFld(tempObj, 2);
    if (emailCheck && fieldsCheck) {
      setEnableLoginBtn(true);
    } else {
      setEnableLoginBtn(false);
    }
  };
  const loginInptRow = (rowDtls) => {
    return (
      <LoginInput
        rowDtls={rowDtls}
        loginData={loginData}
        setLoginData={setLoginData}
        onChangeHandler={onChangeHandler}
      />
    );
  };
  const loginInptFlds = () => {
    return props.loginConfig.map((each) => {
      return loginInptRow(each);
    });
  };
  const onSubmit = () => {
    setIsLoggingIn(true);
    userLoginAction(
      dispatch,
      JSON.stringify(loginData),
      setIsLoggingIn,
      history
    );
  };
  const arrow = `<`;
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
      <div className="login-cont">
        <div className="login-inpt-cont">{loginInptFlds()}</div>
        <div className="login-btn-cont">
          <div
            className={
              !enableLoginBtn ? "login-link login-link-disabled" : "login-link"
            }
            onClick={() => enableLoginBtn && onSubmit()}
          >
            {props.buttonTxt[0]}
            {isLoggingIn ? <div className="btn-loader"></div> : null}
          </div>
          <div className="forget-password-cont">
            Recover{" "}
            <span
              className="register-link"
              onClick={() => history.push("/password-recovery")}
            >
              Password
            </span>
          </div>
          <div className="register-link-cont">
            {props.txt}{" "}
            <span
              className="register-link"
              onClick={
                () => {
                  setNavigationRouteAction(
                    dispatch,
                    `${history.location.pathname}${history.location.search}`
                  );
                  history.push("/signup");
                }
                //will modify later
                // signInBtnClickHandler(dispatch, "SignPage", "SignUp")
              }
            >
              {props.buttonTxt[1]}
            </span>
          </div>
        </div>
      </div>
      <SecondFooter />
    </>
  );
};

export default Login;
