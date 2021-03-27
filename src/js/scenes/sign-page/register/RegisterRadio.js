import React from "react";

const RegisterRadio = ({ rowDtls, registerData, setRegisterData }) => {
  return rowDtls.values.map((each) => {
    return (
      <>
        <label for={each.type}>
          <input
            id={each.type}
            type={rowDtls.type}
            name={each.name}
            value={each.type}
            onChange={(evt) => {
              const tempObj = JSON.parse(JSON.stringify(registerData));
              tempObj[rowDtls.key] = evt.target.value;
              setRegisterData(tempObj);
            }}
          />
          <span>{each.type}</span>
        </label>
      </>
    );
  });
};

export default RegisterRadio;
