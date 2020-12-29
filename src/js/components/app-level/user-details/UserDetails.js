import React, { useContext } from "react";
import "./UserDetails.scss";
import {
  goToPagesAction,
  userLoginStatusAction,
} from "../../../actions/ApplevelActions";
import { Store } from "../../../store/Store";

const config = [
  "Profile",
  "Inbox",
  "Notifications",
  "Settings",
  "About Us",
  "Contact Us",
  "Log Out",
];

const UserDetails = ({ showDrpdwnOpt, setShowDrpdwnOpt, dispatch }) => {
  const createUserDtlsList = () => {
    return config.map((each) => {
      return (
        <div
          className="user-dtls-list-item"
          onClick={() => {
            if (each === "Profile") {
              goToPagesAction(dispatch, "UserProfilePage", "");
            } else if (each === "Inbox") {
              goToPagesAction(dispatch, "UserInboxPage", "");
            } else if (each === "Log Out") {
              userLoginStatusAction(dispatch, false);
            }
          }}
        >
          {each}
        </div>
      );
    });
  };
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
            ? "hdr-drpdwn-cont hdr-user-dtls-cont hdr-drpdwn-cont-open"
            : "hdr-drpdwn-cont hdr-user-dtls-cont hdr-drpdwn-cont-close"
        }
      >
        <div className="user-dtls-list"> {createUserDtlsList()}</div>
      </section>
    </>
  );
};
export default UserDetails;
