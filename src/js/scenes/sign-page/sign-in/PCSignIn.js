import React from "react";
import "./PCSignIn.scss";
import Login from "../login/Login";

const PCSignIn = props => {
  return (
    <>
      <Login
        loginConfig={props.loginConfig}
        buttonTxt={props.buttonTxt}
        txt={props.txt}
      />
    </>
  );
};

export default PCSignIn;
