import React, { useEffect, useContext } from "react";
import "./PasswordRecover.scss";
import { useHistory } from "react-router";
import { goToPagesAction } from "../../../actions/ApplevelActions";
import { Store } from "../../../store/Store";

const arrow = `<`;
const PasswordRecovery = () => {
  const { dispatch, state } = useContext(Store);
  const {
    navigation: { route, currentPage },
  } = state;
  let history = useHistory();
  /** Set current page as Login Page if direct URL is entered */
  useEffect(() => {
    if (currentPage !== "PasswordRecoverPage") {
      goToPagesAction(dispatch, `PasswordRecoverPage`);
    }
  }, []);
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
          <div class="uiHeader uiHeaderBottomBorder interstitialHeader">
            <div class="clearfix uiHeaderTop">
              <div>
                <h2 class="uiHeaderTitle" aria-hidden="true">
                  Recover Password
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordRecovery;
