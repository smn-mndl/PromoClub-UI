import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { saveNewPasswordAction, setPageToastAction } from "../../../actions/MiscActions";
import { makeApiCallForResetPassword } from "../../../api/api";
import { Store } from "../../../store/Store";
import { checkPassMatch, passwordValidation } from "../../../utils/app-utils";
import "./PasswordRecover.scss";

const ResetPassword = () => {
  const { dispatch, state } = useContext(Store);
  let match = useRouteMatch();
  let history = useHistory();
  let token = match.params;
  const [isValidLink, setIsValidLink] = useState(null);
  const [emailData, setEmailData] = useState({ newPass: "", confirmPass: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isResetBtnLoading, setIsResetBtnLoading] = useState(false);
  const checkIfTokenMatches = async () => {
    const res = await makeApiCallForResetPassword({
      method: "GET",
      url: "resetPassword",
      payload: token,
      isLocal: true,
      isMock: false,
    });
    setIsValidLink(res.data.result.isValid);
    setIsLoading(false);
    return res;
  };
  useEffect(() => {
    if (isValidLink === null) {
      setIsLoading(true);
      checkIfTokenMatches();
    }
  }, []);
  const saveNewPassword = (e) => {
    e.preventDefault();
    const pass = JSON.parse(JSON.stringify(emailData));
    setIsResetBtnLoading(true);
    if (pass.newPass && pass.confirmPass) {
      const checkIfNewPasswordValid = passwordValidation(pass.newPass);
      const checkIfConfirmPasswordValid = passwordValidation(pass.confirmPass);
      const checkIfPasswordMatches = checkPassMatch({
        firstpassword: pass.newPass,
        confirmpassword: pass.confirmPass,
      });
      if (!checkIfNewPasswordValid || !checkIfConfirmPasswordValid) {
        setPageToastAction(dispatch, {
          show: true,
          toastType: "warning",
          toastMsg:
            "Password must contain at least 1 numeric character, 1 lowercase letter, 1 uppercase letter, 1 special character",
        });
      } else if (!checkIfPasswordMatches) {
        setPageToastAction(dispatch, {
          show: true,
          toastType: "warning",
          toastMsg: "Password didn't match",
        });
      }else if(checkIfNewPasswordValid && checkIfConfirmPasswordValid && checkIfPasswordMatches){
        saveNewPasswordAction(dispatch, emailData, token, history)
      }
    } else {
      setPageToastAction(dispatch, {
        show: true,
        toastType: "warning",
        toastMsg: "Password can't be empty",
      });
    }
    setIsResetBtnLoading(false);
  };
  const HTMLForm = () => {
    return (
      <form className="recovery-form">
        <div className="e_b_77ddc">
          <p className="e_b_730da">
            In order to protect your account, make sure your password:
          </p>
          <p>
            <ul>
              <li>Is longer than 7 characters</li>
              <li>
                Contains at least 1 numeric character, 1 lowercase letter, 1
                uppercase letter, 1 special character
              </li>
              <li>
                Does not match or significantly contain your username/email
              </li>
              <li>Is not a common password like - "12345678"</li>
            </ul>
          </p>
        </div>
        <div
          data-react-toolbox="input"
          className="o_input_theme_input oc_Y_aba37 b_J_794a3 login-rows-inptfld"
        >
          <input
            className=""
            data-automation="ForgotPasswordForm_email_input"
            type="password"
            aria-label="Password"
            value={emailData.newPass}
            onChange={(evt) =>
              setEmailData({ ...emailData, newPass: evt.target.value })
            }
            placeholder="New Password"
          />
        </div>
        <div
          data-react-toolbox="input"
          className="o_input_theme_input oc_Y_aba37 b_J_794a3 login-rows-inptfld"
        >
          <input
            className=""
            data-automation="ForgotPasswordForm_email_input"
            type="password"
            aria-label="Password"
            value={emailData.confirmPass}
            onChange={(evt) =>
              setEmailData({ ...emailData, confirmPass: evt.target.value })
            }
            placeholder="Re-enter Your New Password"
          />
        </div>

        <button
          type="submit"
          onClick={(e) => saveNewPassword(e)}
          className="register-link"
        >
          Reset Password
          {isResetBtnLoading ? <div className="btn-loader"></div> : null}
        </button>
      </form>
    );
  };
  const NonValidHTML = () => {
    return (
      <div className="recovery-form">
        <h4>
          Problem resetting password. Password reset link is invalid or has
          expired. Please send another reset link.
        </h4>
        <a href="/">Go Home</a>
        <br />
        <a href="/password-recovery">Forgot Password</a>
      </div>
    );
  };
  console.log("isLoading", isLoading);
  return (
    <>
      <>
        <div className="password-recovery-cont">
          <div className="password-recover-modal">
            <div className="uiHeader uiHeaderBottomBorder interstitialHeader">
              <div className="clearfix uiHeaderTop">
                <div>
                  <h2 className="uiHeaderTitle" aria-hidden="true">
                    Reset Password
                  </h2>
                </div>
              </div>
            </div>
            {isLoading && (
              <div className="recovery-form reset-password-loading">
                Loading User Data...{" "}
              </div>
            )}
            {!isLoading ? (isValidLink ? HTMLForm() : NonValidHTML()) : null}
          </div>
        </div>
      </>
    </>
  );
};

export default ResetPassword;
