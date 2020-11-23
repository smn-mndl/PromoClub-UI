import React, { useState } from "react";
import RegisterRadio from "./RegisterRadio";
const apiKey = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;

const RegisterInput = ({ rowDtls, registerData, setRegisterData }) => {
  const radioBtns = rowDtls => {
    return (
      <RegisterRadio
        rowDtls={rowDtls}
        setRegisterData={setRegisterData}
        registerData={registerData}
      />
    );
  };
  return (
    <>
      <div className="register-rows">
        <div className="register-rows-inptfld">
          {rowDtls.type === "radio" ? (
            radioBtns(rowDtls)
          ) : (
            <input
              name={rowDtls.key}
              type={rowDtls.type}
              onChange={evt => {
                const tempObj = JSON.parse(JSON.stringify(registerData));
                tempObj[rowDtls.key] = evt.target.value;
                setRegisterData(tempObj);
              }}
              autoComplete={true}
            ></input>
          )}
        </div>
        <div className="register-rows-inptlabel">{rowDtls.dispVal}</div>
      </div>
    </>
  );
};

export default RegisterInput;
