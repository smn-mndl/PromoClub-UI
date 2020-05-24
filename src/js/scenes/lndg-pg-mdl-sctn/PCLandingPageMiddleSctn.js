import React, { useState, useEffect, useContext } from "react";
import "./PCLandingPageMiddleSctn.scss";
import { Store } from "../../store/Store";
import {
  getPublisedDataAction,
  publishedDataLoadingAction,
  getPublishedDataLengthAction,
} from "../../actions/LandingPageActions";
import PublishedDataTile from "../../components/published-data-tile/PublishedDataTile";
import { Skeleton, Switch, Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const LandingPageMiddleSctn = () => {
  const {
    state: { publishedData, isPublishDataLoading, publishedDataCount },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    getPublishedDataLengthAction(dispatch);
  }, []);

  useEffect(() => {
    getPublisedDataAction(dispatch);
  }, []);

  const getTiles = () => {
    const clonedData = JSON.parse(JSON.stringify(publishedData));
    return clonedData.reverse().map((each) => {
      return (
        <div>
          <PublishedDataTile tileData={each} />
        </div>
      );
    });
  };
  const skeleton = () => {
    let skeletonHTML = [];
    for (let i = 0; i < publishedDataCount; i++) {
      skeletonHTML.push(
        <div className="published-data-tile-cont">
          <Skeleton loading={true} avatar active>
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title="Card title"
              description="This is the description"
            />
          </Skeleton>
        </div>
      );
    }
    return skeletonHTML;
  };
  const getDOMElem = () => {
    let domHTML = [];
    return publishedDataCount && publishedData.length !== 0
      ? getTiles()
      : skeleton();
  };
  return (
    <>
      <div>{getDOMElem()}</div>
    </>
  );
};
export default LandingPageMiddleSctn;
