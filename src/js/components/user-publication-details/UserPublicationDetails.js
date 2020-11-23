import React, { useEffect, useContext } from "react";
import "./UserPublicationDetails.scss";
import { Tabs } from "antd";
import { Store } from "../../store/Store";
import { getUserPublisedDataAction } from "../../actions/UserDetailsActions";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
const UserPublicationDetails = (props) => {
  const {
    state: {
      userPublishedData,
      userDetails: { userDetails },
    },
    dispatch,
  } = useContext(Store);
  useEffect(() => {
    if (!userPublishedData) {
      getUserPublisedDataAction(
        dispatch,
        userDetails ? userDetails.email : "smn.mndl1241@gmail.com"
      );
    }
  });
  return (
    <div className="user-publication-details">
      <Tabs animated={false} defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Published" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Likes" disabled key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Links" disabled key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserPublicationDetails;
