import React from "react";
import "./SignUp.scss";
import { signInBtnClickHandler } from "../../../actions/ApplevelActions";

const SignUp = ({ dispatch }) => {
  return (
    <div className="sign-up-elem sign-elem">
      <div className="sign-elem-hdr">New User</div>
      <p>New to ABC? Create an account to get started today.</p>
      <button
        className="sign-up-btn"
        onClick={() => signInBtnClickHandler(dispatch, "SignPage", "SignUp")}
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
