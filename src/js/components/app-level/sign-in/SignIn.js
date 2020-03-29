import React from "react";
import "./SignIn.scss";
import { signInBtnClickHandler } from "../../../actions/ApplevelActions";

const SignIn = ({ dispatch }) => {
  return (
    <div className="sign-in-elem sign-elem">
      <div className="sign-elem-hdr">Registered Users</div>
      <p>Have an account? Sign in now.</p>
      <button
        className="sign-in-btn"
        onClick={() => signInBtnClickHandler(dispatch, "SignPage", "SignIn")}
      >
        Sign In
      </button>
      {/* <div
        class="fb-login-button"
        data-width=""
        data-size="large"
        data-button-type="continue_with"
        data-auto-logout-link="false"
        data-use-continue-as="false"
      ></div> */}
    </div>
  );
};

export default SignIn;
