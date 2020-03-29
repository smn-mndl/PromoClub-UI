import React from "react";

const LoginInput = ({ rowDtls, loginData, setLoginData }) => {
  return (
    <>
      <div className="login-rows">
        <div className="login-rows-inptfld">
          <input
            name={rowDtls.key}
            type={rowDtls.type}
            onChange={evt => {
              const tempObj = JSON.parse(JSON.stringify(loginData));
              tempObj[rowDtls.key] = evt.target.value;
              setLoginData(tempObj);
            }}
            autoComplete={true}
          ></input>
        </div>
        <div className="login-rows-inptlabel">{rowDtls.dispVal}</div>
      </div>
    </>
  );
};

export default LoginInput;
