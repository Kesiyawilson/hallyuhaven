import React from 'react';
import './Title.css';

// Add 'alignment' to your props
const Title = ({ text1, text2, alignment }) => {
  return (
    // Conditionally add a class based on the 'alignment' prop
    <div className={`title-container ${alignment === 'left' ? 'align-left' : ''}`}>
      <h2 className="title-text prata-regular">
        <span className="text1">{text1}</span>
        <span className="text2">{text2}</span>
        <div className="title-line"></div>
      </h2>
    </div>
  );
};

export default Title;

