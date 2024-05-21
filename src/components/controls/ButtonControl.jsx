import PropTypes from 'prop-types';

const ButtonControl = ({ text, styles, onClickFn, disabled }) => {
  const buttonStyles = `px-4 py-1 bg-[#36190D] text-white font-medium rounded-md hover:bg-[#FFA72F] ${styles}`;

  return (
    <button className={buttonStyles} onClick={onClickFn} disabled={disabled}>
      {text}
    </button>
  );
};

ButtonControl.propTypes = {
  text: PropTypes.string,
  styles: PropTypes.string,
  onClickFn: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ButtonControl;
