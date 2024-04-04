import React from 'react';

const ButtonControl = ({ text, styles, onClickFn }) => {
  const buttonStyles = `px-4 py-1 bg-[#36190D] text-white rounded-md hover:bg-blue-600 ${styles}`;

  return (
    <button className={buttonStyles} onClick={onClickFn}>
      {text}
    </button>
  );
};

export default ButtonControl;
