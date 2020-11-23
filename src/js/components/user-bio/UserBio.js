import React from "react";
import "./UserBio.scss";

const UserBio = ({ userDetails }) => {
  console.log("useretails", userDetails);
  const abc = {
    firstname: "Suman",
    lastname: "Mondal",
    email: "smn.mndl1241@gmail.com",
    gender: "male",
    userbio: "Hi, this is Suman!",
    location: "Kolkata",
    joiningdata: "June 10, 2020",
  };
  return (
    <div className="user-bio-cont">
      <div className="user-bio-name">{`${abc.firstname} ${abc.lastname}`}</div>
      <div className="user-bio-email">{abc.email}</div>
      {abc.userbio && <div className="user-bio-biodtls">{abc.userbio}</div>}
      <div style={{ display: "flex", marginTop: "5px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
            fontSize: "1.1em",
          }}
        >
          <div className="user-bio-location-icon"></div>
          {abc.location}
        </div>
        <div
          style={{ display: "flex", alignItems: "center", fontSize: "1.1em" }}
        >
          <div className="user-bio-joiningdate-icon"></div>
          {abc.joiningdata}
        </div>
      </div>
    </div>
  );
};

export default UserBio;
