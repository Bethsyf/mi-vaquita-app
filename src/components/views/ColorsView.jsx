import PropTypes from 'prop-types';

const ColorsView = ({ onSelectColor, selectedColor }) => {
  const colors = [
    '#a45494',
    '#64b44c',
    '#9c5434',
    '#4c84a4',
    '#FFFFFF',
    '#FFA72F',
    '#FCE4E4',
    '#FF2530',
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {colors.map((color, index) => (
        <button
          key={index+1}
          className={`w-8 h-8 border border-gray-300 cursor-pointer rounded-md ${
            selectedColor === color ? 'border-4 border border-green-400' : ''
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onSelectColor(color)}
       
        >          
        </button>
      ))}
    </div>
  );
};

ColorsView.propTypes = {
  selectedColor: PropTypes.string,
  onSelectColor: PropTypes.func.isRequired,
};

export default ColorsView;
