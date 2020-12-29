import React from "react";
import { Tabs, Button } from "antd";
import "./AppTabs.scss";
import Search from "../search/Search";
import { goToTabsAction } from "../../../actions/ApplevelActions";
import APP_TAB_CONFIG from "./app-tab-config";
import { useHistory } from "react-router";
import { DownOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const operations = <Button>Extra Action</Button>;

const AppTabs = ({ dispatch, currentTab }) => {
  let history = useHistory();

  const createTabs = () => {
    return APP_TAB_CONFIG.map((each) => (
      <li
        className={`app-tabs-navbar-items ${
          currentTab === each.key && "app-tabs-navbar-items-selected"
        }`}
      >
        {each.key === "search" ? (
          <Search />
        ) : (
          <>
            <a
              //   href={`${each.link}`}
              onClick={() => {
                goToTabsAction(dispatch, each.key);
                history.push(`/${each.link}`);
              }}
            >
              {each.disp}
            </a>
            {each.key === "tools" ? (
              <div className="app-tabs-tools-drpdwn">
                <DownOutlined />
              </div>
            ) : null}
          </>
        )}
        {/* {currentTab === each.key && <div className="down-arrow"></div>} */}
      </li>
    ));
  };
  return (
    <>
      <nav className="app-tabs-navbar">
        <ul className="app-tabs-navbar-items-list">{createTabs()}</ul>
      </nav>
      {/* <div className="down-arrow"></div> */}
    </>
  );
};

export default AppTabs;
