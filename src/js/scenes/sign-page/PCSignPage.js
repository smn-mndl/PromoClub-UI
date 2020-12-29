import React, { useState, useContext, useEffect } from "react";
import "./PCSignPage.scss";
import { Store } from "../../store/Store";
import PCSignUp from "./sign-up/PCSignUp";
import PCSignIn from "./sign-in/PCSignIn";

import LOGIN_CONFIG from "./login/login-config";

const PCSignPage = () => {
  const [loginConfig, setLoginConfig] = useState(LOGIN_CONFIG);
  const [buttonTxt, setButtonTxt] = useState(["Login", "Register"]);
  const [txt, setTxt] = useState("Not a member? Please");

  const { dispatch, state } = useContext(Store);
  const {
    navigation: { subPage, slctdLan },
  } = state;
  const [selectedSubPage, setSelectedSubPage] = useState(subPage);

  useEffect(() => {
    setSelectedSubPage(subPage);
  }, [subPage]);

  return (
    <>
      <div className="sign-up-page"></div>
      {selectedSubPage === "SignIn" ? (
        <PCSignIn loginConfig={loginConfig} buttonTxt={buttonTxt} txt={txt} />
      ) : (
        <PCSignUp />
      )}
    </>
  );
};

export default PCSignPage;
