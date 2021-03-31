import React from "react";

const LoginInput = ({ rowDtls, loginData, setLoginData, onChangeHandler }) => {
  return (
    <>
      <div className="login-rows">
        <div className="login-rows-inptfld">
          <input
            name={rowDtls.key}
            type={rowDtls.type}
            onChange={(evt) => {
              onChangeHandler(rowDtls.key, evt.target.value);
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
