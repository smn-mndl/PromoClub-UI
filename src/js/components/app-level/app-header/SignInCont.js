import React from "react";
import SignIn from "../sign-in/SignIn";
import SignUp from "../sign-up/SignUp";
import "./SignInCont.scss";

const SignInCont = ({ showDrpdwnOpt, setShowDrpdwnOpt, dispatch }) => {
  return (
    <>
      {showDrpdwnOpt ? (
        <div
          className="hdr-drpdwn-cont-page-mask"
          onClick={() => setShowDrpdwnOpt(false)}
        ></div>
      ) : null}
      <section
        className={
          showDrpdwnOpt
            ? "hdr-drpdwn-cont hdr-signin-cont hdr-drpdwn-cont-open"
            : "hdr-drpdwn-cont hdr-signin-cont hdr-drpdwn-cont-close"
        }
      >
        <SignIn dispatch={dispatch} />
        <SignUp dispatch={dispatch} />
      </section>
    </>
  );
};
export default SignInCont;
