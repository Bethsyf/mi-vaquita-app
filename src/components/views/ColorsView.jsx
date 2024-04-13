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
        <div
          key={index}
          className={`w-8 h-8 border border-gray-300 cursor-pointer rounded-md relative ${
            selectedColor === color ? 'border-4 border-black' : ''
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onSelectColor(color)}
        >
          {selectedColor === color && (
        <div
        className={`absolute bottom-5 left-5 rounded-full w-3 h-3 bg-[#64b44c] border border-gray`}    
      />
          )}
        </div>
      ))}
    </div>
  );
};

ColorsView.propTypes = {
  selectedColor: PropTypes.string,
  onSelectColor: PropTypes.func,
};

export default ColorsView;
