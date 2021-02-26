import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import SignIn from "../sign-in/SignIn";
import SignUp from "../sign-up/SignUp";
import "./SideNav.scss";
import { map } from "lodash";
import { Tooltip, Popover } from "antd";
import { Tag } from "antd";
import {
  TwitterOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import {
  goToPagesAction,
  setNavigationRouteAction,
} from "../../../actions/ApplevelActions";

const SideNav = ({ showDrpdwnOpt, setShowDrpdwnOpt, dispatch, isLoggedIn }) => {
  const [visible, setVisible] = useState(false);
  const loginState = isLoggedIn;
  let history = useHistory();

  const loginClickHandler = (each) => {
    setNavigationRouteAction(
      dispatch,
      `${history.location.pathname}${history.location.search}`
    );
    history.push(`/${each.id.toLowerCase()}`);
    setShowDrpdwnOpt(false);
    goToPagesAction(dispatch, `${each.display}Page`);
  };
  const logoutClickHandler = (id) => {
    history.push(`/home`);
    setShowDrpdwnOpt(false);
  };
  const SIDE_BAR_ITEMS = [
    { display: "Preview", id: "Preview", tooltip: false, onClickFunc: null },
    { display: "Share", id: "Share", tooltip: true, onClickFunc: null },
    {
      display: "Login",
      id: "Login",
      tooltip: false,
      onClickFunc: loginClickHandler,
    },
    {
      display: "LogOut!",
      id: "Logout",
      tooltip: false,
      onClickFunc: logoutClickHandler,
    },
    {
      display: "Sign Up",
      id: "SignUp",
      tooltip: false,
      onClickFunc: loginClickHandler,
    },
    {
      display: "About Us",
      id: "AboutUs",
      tooltip: false,
      onClickFunc: null,
    },
    {
      display: "Contact Us",
      id: "ContactUs",
      tooltip: false,
      onClickFunc: null,
    },
  ];
  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };
  const tooptipText = () => {
    return (
      <>
        <Tag icon={<WhatsAppOutlined />} color="#55acee">
          <a href="whatsapp://send?text=http://www.example.com">WhatsApp</a>
        </Tag>
      </>
    );
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
            ? "hdr-drpdwn-cont hdr-signin-cont hdr-drpdwn-cont-open"
            : "hdr-drpdwn-cont hdr-signin-cont hdr-drpdwn-cont-close"
        }
      >
        {SIDE_BAR_ITEMS.map((each) => {
          let elem = null;
          if (each.id === "Logout") {
            if (loginState) {
              elem = (
                <div
                  className="hdr-drpdwn-elem"
                  onClick={() => each.onClickFunc(each)}
                >
                  {each.tooltip ? (
                    <Popover
                      placement="topRight"
                      content={tooptipText()}
                      trigger="click"
                      visible={visible}
                      onVisibleChange={handleVisibleChange}
                    >
                      {each.display}
                    </Popover>
                  ) : (
                    each.display
                  )}
                </div>
              );
            }
          } else {
            elem = (
              <div
                className="hdr-drpdwn-elem"
                onClick={() => each.onClickFunc(each)}
              >
                {each.tooltip ? (
                  <Popover
                    placement="topRight"
                    content={tooptipText()}
                    trigger="click"
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                  >
                    {each.display}
                  </Popover>
                ) : (
                  each.display
                )}
              </div>
            );
          }
          return elem;
        })}
      </section>
    </>
  );
};
export default SideNav;
