import React from 'react';

const CardView = ({ groupName, description, value }) => {
  return (
    <div className="flex items-center justify-center max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="h-20 w-20 p-3 bg-[#FF0000] md:flex-shrink-0 ">
        <img
          className="h-full w-full object-cover md:w-48"
          src="logo.svg"
          alt="Grupo"
        />
      </div>
      <div className="content-container p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {groupName}
        </div>

        <p className="mt-2 text-gray-500">{description}</p>

        <p className="mt-2 font-bold">Valor: {value}</p>

        <div className="mt-4 flex space-x-4">
          <button className="px-4 py-2 bg-[#36190D] text-white rounded-md hover:bg-blue-600">
            Editar
          </button>
          <button className="px-4 py-2 bg-[#36190D] text-white rounded-md hover:bg-red-600">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardView;
