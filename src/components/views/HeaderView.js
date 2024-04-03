import React from 'react';
import NavMenu from './NavMenu';

const HeaderView = () => {
  return (
    <header className="bg-[#36190D]">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-2">
        <div className="flex items-end pl-5">
          {' '}
          {/* Added padding to the left */}
          <img src="logo.svg" alt="Workflow" className="w-10 h-10 mr-2" />
          <h1 className="text-xl font-bold text-[#f9f9f9] min-w-full md:min-w-0">
            Mi Vaquita
          </h1>
        </div>
        <NavMenu />
      </div>
    </header>
  );
};

export default HeaderView;
