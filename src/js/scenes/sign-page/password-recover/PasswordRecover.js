import React, { useEffect, useContext, useState } from "react";
import "./PasswordRecover.scss";
import { useHistory } from "react-router";
import { goToPagesAction } from "../../../actions/ApplevelActions";
import { Store } from "../../../store/Store";
import Axios from "axios";
import { setPageToastAction } from "../../../actions/MiscActions";
import { checkEmailInput } from "../../../utils/app-utils";

const arrow = `<`;
const PasswordRecovery = () => {
  const { dispatch, state } = useContext(Store);
  const {
    navigation: { route, currentPage },
    isLoggedIn,
  } = state;
  let history = useHistory();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  /** Set current page as Login Page if direct URL is entered */
  useEffect(() => {
    if (currentPage !== "PasswordRecoverPage") {
      goToPagesAction(dispatch, `PasswordRecoverPage`);
    }
  }, []);
  const [email, setEmail] = useState("");
  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    const checkIfEmailIsValid = checkEmailInput(email);
    if (isLoggedIn) {
      setIsLoggingIn(false);
      setPageToastAction(dispatch, {
        show: true,
        toastType: "warning",
        toastMsg:
          "You are already logged in. Please log out and try to reset password.",
      });
    } else {
      if (email) {
        if (checkIfEmailIsValid) {
          Axios.post("https://intense-hollows-12373.herokuapp.com/forgotPassword", {
            email: email,
          })
            .then((response) => {
              setIsLoggingIn(false);
              setEmail("");
              setPageToastAction(dispatch, {
                show: true,
                toastType: response.data.statusCode,
                toastMsg: response.data.statusMsg,
              });
            })
            .catch((error) => {
              setIsLoggingIn(false);
              console.log(error);
            });
        } else {
          setIsLoggingIn(false);
          setPageToastAction(dispatch, {
            show: true,
            toastType: "warning",
            toastMsg: "Invalid email address!",
          });
        }
      } else {
        setIsLoggingIn(false);
        setPageToastAction(dispatch, {
          show: true,
          toastType: "warning",
          toastMsg: "Email address can't be empty!",
        });
      }
    }
  };
  return (
    <>
      <div className="password-recovery-cont">
        <div className="back-to-home">
          <span
            onClick={() => {
              history.goBack();
            }}
          >
            <span>{arrow}</span>
            <span>Back</span>
          </span>
        </div>
        <div className="password-recover-modal">
          <div className="uiHeader uiHeaderBottomBorder interstitialHeader">
            <div className="clearfix uiHeaderTop">
              <div>
                <h2 className="uiHeaderTitle" aria-hidden="true">
                  Recover Password
                </h2>
              </div>
            </div>
          </div>
          <form className="recovery-form">
            <div className="e_b_77ddc">
              <p className="e_b_730da">
                Enter your email address below and we'll send you a link to
                reset your password.
              </p>
            </div>
            <div
              data-react-toolbox="input"
              className="o_input_theme_input oc_Y_aba37 b_J_794a3 login-rows-inptfld"
            >
              <input
                className=""
                data-automation="ForgotPasswordForm_email_input"
                type="email "
                aria-label="Email address"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                placeholder="Email address"
                autoComplete={"on"}
              />
            </div>

            <button
              type="submit"
              onClick={(e) => sendEmail(e)}
              className="register-link"
            >
              Send reset link
              {isLoggingIn ? <div className="btn-loader"></div> : null}
            </button>
          </form>
          <div>
            <hr />
            <div className="e_b_de055">
              <a
                className="e_b_dc377"
                data-automation="ForgotPasswordForm_signInLink_a"
                role="button"
                data-track-action="click"
                data-track-section="accountCreation"
                data-track-label="signIn"
                href="/login"
              >
                Back to log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordRecovery;
