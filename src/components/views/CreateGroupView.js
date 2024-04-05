import React, { useState } from 'react';
import ButtonControl from '../controls/ButtonControl';
import ColorsView from './ColorsView';

const CreateGroupView = ({ onClose, onCreateGroup }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleCreateGroup = () => {
    if (!groupName) {
      setError('Por favor ingrese un nombre de grupo');
      return;
    }

    onCreateGroup(groupName, selectedColor);
    onClose();
  };

  const handleClose = () => {
    if (error) {
      setError('');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg relative">
        <button
          className="absolute top-0 right-1 p-2 z-10"
          onClick={handleClose}
        >
          <span className=" text-lg">×</span>
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Nuevo grupo</h2>
        <input
          type="text"
          className="border border-gray-400 rounded-md px-3 py-2 w-full mb-4"
          placeholder="Nombre del grupo"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />

        <div className="mb-4 border border-gray-400 rounded-md p-3">
          <ColorsView onSelectColor={handleColorSelect} />
        </div>
        <ButtonControl
          text={'Crear'}
          styles={'w-60 mx-auto'}
          onClickFn={handleCreateGroup}
        />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      </div>
    </div>
  );
};

export default CreateGroupView;
