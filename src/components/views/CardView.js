import React from 'react';
import ButtonControl from '../controls/ButtonControl';

const CardView = ({ groupName, description, value }) => {
  return (
    <div className="flex items-center m-2 shadow-lg overflow-hidden pl-2">
      <div className="h-20 w-20 p-3 bg-[#FFA72F] md:flex-shrink-0 ">
        <img
          className="h-full w-full object-cover md:w-48"
          src="logo.svg"
          alt="Grupo"
        />
      </div>
      <div className="content-container p-5">
        <div className="tracking-wide text-sm font-semibold">{groupName}</div>

        <p className="text-gray-500">{description}</p>

        <p className="font-bold">Valor: {value}</p>

        <div className="mt-4 flex space-x-2">
          <ButtonControl text={'Editar'} styles={'py-0'} />
          <ButtonControl text={'Eliminar'} styles={'py-0'} />
        </div>
      </div>
    </div>
  );
};

export default CardView;
