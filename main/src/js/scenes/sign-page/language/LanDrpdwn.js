import React, { useState } from "react";
import "./LanDrpdwn.scss";
import Languages from "./Languages";

const getUlNo = windowWidth => {
  let ulNo = 0;
  if (windowWidth > 800) {
    ulNo = 4;
  } else if (windowWidth > 600) {
    ulNo = 3;
  } else if (windowWidth > 400) {
    ulNo = 2;
  } else {
    ulNo = 1;
  }
  return ulNo;
};
const LanDrpdwn = ({ selectedLan, setSelectedLan }) => {
  const [ulNo, setUlNo] = useState(getUlNo(window.innerWidth));

  const createDrpdwnLi = elem => {
    return (
      <li
        className={
          selectedLan === elem ? "each-lan each-lan-selected" : "each-lan"
        }
        onClick={() => setSelectedLan(elem)}
      >
        {elem}
      </li>
    );
  };
  const createDrpdwnUl = liElemArr => {
    return <ul>{liElemArr}</ul>;
  };
  const func = (ulNo, i, each, index) => {
    if (
      index >= (Languages.length / ulNo) * (i - 1) &&
      index < (Languages.length / ulNo) * i
    ) {
      return createDrpdwnLi(each);
    }
  };
  const drpdwnHTML = ulNo => {
    const drpdwnHTMLArr = [];
    for (let i = 1; i <= ulNo; i++) {
      const liElemArr = [];
      Languages.map((each, index) => {
        let liElem = func(ulNo, i, each, index);
        liElem && liElemArr.push(liElem);
      });
      drpdwnHTMLArr.push(createDrpdwnUl(liElemArr));
    }
    return drpdwnHTMLArr;
  };
  window.addEventListener("resize", () => {
    setUlNo(getUlNo(window.innerWidth));
  });
  return <>{drpdwnHTML(ulNo)}</>;
};
export default LanDrpdwn;
