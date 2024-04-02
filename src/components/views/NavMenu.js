import React from 'react';

const NavMenu = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <a href="#" className="hover:underline">
            Amigos
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Gastos
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Grupos
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
