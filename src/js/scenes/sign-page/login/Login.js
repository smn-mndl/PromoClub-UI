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
    isLoggedIn,
  } = state;
  const [loginData, setLoginData] = useState({});
  const [enableLoginBtn, setEnableLoginBtn] = useState({
    status: false,
    text: "",
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  let history = useHistory();

  /** Set current page as Login Page if direct URL is entered */
  useEffect(() => {
    if (currentPage !== "LoginPage") {
      goToPagesAction(dispatch, `LoginPage`);
    }
  }, []);
  const checkIfValid = () => {
    const tempObj = JSON.parse(JSON.stringify(loginData));
    const emailCheck = checkEmailInput(tempObj["email"]);
    const fieldsCheck = checkNonEmptyInptFld(tempObj, 2);
    let flag = false;
    if (emailCheck && fieldsCheck) {
      setEnableLoginBtn({ status: true });
      flag = true;
    } else if (!fieldsCheck) {
      setEnableLoginBtn({ status: false, text: "Fields can't be empty!" });
    } else if (!emailCheck) {
      setEnableLoginBtn({ status: false, text: "Invalid email address!" });
    }
    return flag;
  };
  const onChangeHandler = (key, val) => {
    const tempObj = JSON.parse(JSON.stringify(loginData));
    tempObj[key] = val;
    setLoginData(tempObj);
    setEnableLoginBtn({ status: false, text: "" });
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
    const status = checkIfValid();
    if (isLoggedIn) {
      setEnableLoginBtn({
        status: false,
        text: "You are already logged in. Please log out and try to log in",
      });
    } else {
      if (status) {
        setIsLoggingIn(true);
        userLoginAction(
          dispatch,
          JSON.stringify(loginData),
          setIsLoggingIn,
          history
        );
      } else {
        checkIfValid();
      }
    }
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
        {!enableLoginBtn.status && enableLoginBtn.text ? (
          <div className="email-error-txt">
            <span className="email-error-asterisk">* </span>
            {enableLoginBtn.text}
          </div>
        ) : null}
        <div className="login-btn-cont">
          <div
            className={!enableLoginBtn.status ? "login-link" : "login-link"}
            onClick={() => onSubmit()}
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
