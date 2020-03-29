import React from "react";
import "./UserDetails.scss";

const config = ["Profile", "Inbox", "Notifications", "Settings", "Log Out"];

const UserDetails = ({ showDrpdwnOpt, setShowDrpdwnOpt, dispatch }) => {
  const createUserDtlsList = () => {
    return config.map(each => {
      return <div className="user-dtls-list-item">{each}</div>;
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
