import React from "react";
import "./PCSignIn.scss";
import Login from "../login/Login";
import LOGIN_CONFIG from "../login/login-config";

const PCSignIn = () => {
  return (
    <>
      <Login
        loginConfig={LOGIN_CONFIG}
        buttonTxt={["Login", "Register"]}
        txt={"Not a member? Please"}
      />
    </>
  );
};

export default PCSignIn;
