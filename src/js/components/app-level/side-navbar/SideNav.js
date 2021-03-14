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
  DownOutlined,
} from "@ant-design/icons";
import {
  goToPagesAction,
  setNavigationRouteAction,
} from "../../../actions/ApplevelActions";

const SideNav = ({
  showDrpdwnOpt,
  setShowDrpdwnOpt,
  dispatch,
  isLoggedIn,
  sidenavConfig,
}) => {
  const [visible, setVisible] = useState(false);
  const loginState = isLoggedIn;
  let history = useHistory();

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
        {sidenavConfig.map((each) => {
          let elem = null;
          if (each.id === "Logout") {
            if (loginState) {
              elem = (
                <div
                  className="hdr-drpdwn-elem"
                  onClick={() =>
                    each.onClickFunc({
                      each,
                      setNavigationRouteAction,
                      dispatch,
                      history,
                      setShowDrpdwnOpt,
                      goToPagesAction,
                    })
                  }
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
                onClick={() =>
                  each.onClickFunc({
                    each,
                    setNavigationRouteAction,
                    dispatch,
                    history,
                    setShowDrpdwnOpt,
                    goToPagesAction,
                  })
                }
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
                {each.child && (
                  <span>
                    <DownOutlined />
                  </span>
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
