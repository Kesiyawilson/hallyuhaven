import React from 'react';
import './Title.css';

const Title = ({ text1, text2 }) => {
  return (
    <div className="title-container">
      <h2 className="title-text prata-regular">
        <span className="text1">{text1}</span>
        <span className="text2">{text2}</span>
        <div className="title-line"></div>
      </h2>
    </div>
  );
};

export default Title;

