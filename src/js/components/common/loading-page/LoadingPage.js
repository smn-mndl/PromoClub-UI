import React from 'react';
import './LoadingPage.scss';
import Fallback from '../fallback/Fallback';

const LoadingPage = ({ text }) => (
  <Fallback>
    <div className="ks-loading-cntr">
      <span>{text}</span>
    </div>
  </Fallback>
);

export default LoadingPage;
