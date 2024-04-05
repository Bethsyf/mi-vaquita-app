import React from 'react';
import PropTypes from 'prop-types';

const ButtonControl = ({ text, styles, onClickFn }) => {
  const buttonStyles = `px-4 py-1 bg-[#36190D] text-white rounded-md hover:bg-[#FFA72F] ${styles}`;

  return (
    <button className={buttonStyles} onClick={onClickFn}>
      {text}
    </button>
  );
};

ButtonControl.propTypes = {
  text: PropTypes.string,
  styles: PropTypes.string,
  onClickFn: PropTypes.func,
};

export default ButtonControl;
