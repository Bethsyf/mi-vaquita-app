const ColorsView = ({ onSelectColor }) => {
  const colors = [
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#FFFFFF',
    '#000000',
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {colors.map((color, index) => (
        <div
          key={index}
          className="w-8 h-8 border border-gray-300 cursor-pointer rounded-md"
          style={{ backgroundColor: color }}
          onClick={() => onSelectColor(color)}
        />
      ))}
    </div>
  );
};
export default ColorsView;
