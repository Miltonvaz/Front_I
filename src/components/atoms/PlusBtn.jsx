// PlusButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';


const PlusButton = ({ to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button className="plus-button" onClick={handleClick}>
      +
    </button>
  );
};

export default PlusButton;
