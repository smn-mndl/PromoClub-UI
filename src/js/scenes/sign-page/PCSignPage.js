import React, { useState, useContext, useEffect } from "react";
import "./PCSignPage.scss";
import LanDrpdwn from "./language/LanDrpdwn";
import { Store } from "../../store/Store";
import PCSignUp from "./sign-up/PCSignUp";
import PCSignIn from "./sign-in/PCSignIn";
// import { googleTranslate } from "../../components/google-translate/GoogleTranslateUtil";
import {
  getLanguageCodesAction,
  setSelectedLanguageAction,
} from "../../actions/ApplevelActions";
import LOGIN_CONFIG from "./login/login-config";

const PCSignPage = () => {
  const [showLanDrpdwn, setShowLanDrpdwn] = useState(false);
  const [loginConfig, setLoginConfig] = useState(LOGIN_CONFIG);
  const [buttonTxt, setButtonTxt] = useState(["Login", "Register"]);
  const [txt, setTxt] = useState("Not a member? Please");

  const { dispatch, state } = useContext(Store);
  const {
    navigation: { subPage, slctdLan },
    languageCodes,
  } = state;
  const [selectedSubPage, setSelectedSubPage] = useState(subPage);

  // console.log("state in pcsignupapge", state);
  useEffect(() => {
    setSelectedSubPage(subPage);
  }, [subPage]);
  // useEffect(() => {
  //   // getLanguageCodesAction(dispatch);
  //   if (languageCodes.length === 0) {
  //     googleTranslate.getSupportedLanguages("en", (err, lanCodes) => {
  //       getLanguageCodesAction(dispatch, lanCodes);
  //     });
  //   }
  // });

  // const getTranslation = lan => {
  //   const cnfg = JSON.parse(JSON.stringify(loginConfig));
  //   return cnfg.map(eachObj => {
  //     let trnstltdTxt = "";
  //     googleTranslate.translate(
  //       eachObj.dispVal,
  //       lan.language,
  //       (err, translation) => {
  //         trnstltdTxt = translation.translatedText;
  //         eachObj["dispVal"] = trnstltdTxt;
  //       }
  //     );
  //     return eachObj;
  //   });
  // };

  // const getBtnTxts = (lan, getBtnTxts) => {
  //   let arr = [];
  //   getBtnTxts.forEach(each => {
  //     googleTranslate.translate(each, lan.language, (err, translation) => {
  //       arr.push(translation.translatedText);
  //       console.log(translation);
  //     });
  //   });
  //   return arr;
  // };

  // const getTxt = (lan, txt) => {
  //   let tempTxt = "";
  //   googleTranslate.translate(txt, lan.language, (err, translation) => {
  //     tempTxt = translation.translatedText;
  //     setTxt(tempTxt);
  //   });
  //   return tempTxt;
  // };

  // const lanChangeHandler = async lan => {
  //   const reponse = await getTranslation(lan);
  //   const btnTxts = await getBtnTxts(lan, buttonTxt);
  //   const tempTxt = await getTxt(lan, txt);
  //   console.log("tempTxt", tempTxt);
  //   setLoginConfig(reponse);
  //   setButtonTxt(btnTxts);
  //   setSelectedLanguageAction(dispatch, lan);
  // };

  return (
    <>
      <div className="sign-up-page">
        <div className="sign-up-header">
          <div
            className="lan-label"
            onClick={() => setShowLanDrpdwn(!showLanDrpdwn)}
          >
            {slctdLan.name}
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              class=""
              data-icon="down"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              className={
                showLanDrpdwn ? `sign-in-menu-up` : `sign-in-menu-down`
              }
            >
              <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
            </svg>
          </div>
          {showLanDrpdwn ? (
            <div
              className="lan-drpdwn-pgmask"
              onClick={() => setShowLanDrpdwn(false)}
            ></div>
          ) : null}
          <div
            className={
              showLanDrpdwn
                ? "lan-drpdwn lan-drpdwn-open"
                : "lan-drpdwn lan-drpdwn-close"
            }
          >
            {/* <LanDrpdwn
              selectedLan={slctdLan}
              setSelectedLan={lanChangeHandler}
              languageCodes={languageCodes}
            /> */}
          </div>
          <div className="sign-up-hdr-cntct-us">Contact Us 24/7</div>
        </div>
      </div>
      {selectedSubPage === "SignIn" ? (
        <PCSignIn loginConfig={loginConfig} buttonTxt={buttonTxt} txt={txt} />
      ) : (
        <PCSignUp />
      )}
    </>
  );
};

export default PCSignPage;
