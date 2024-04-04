import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavMenu = () => {
  const [selectedLink, setSelectedLink] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    switch (pathname) {
      case '/friends':
        setSelectedLink(0);
        break;
      case '/expenses':
        setSelectedLink(1);
        break;
      case '/groups':
        setSelectedLink(2);
        break;
      default:
        setSelectedLink(null);
    }
  }, [location]);

  const handleClick = (index) => {
    setSelectedLink(index);
  };

  return (
    <nav className="text-white py-4 px-5 w-full md:w-auto">
      <ul className="flex font-bold justify-between space-x-4 md:space-x-40">
        <li>
          <Link
            to="/friends"
            onClick={() => handleClick(0)}
            className={`relative ${
              selectedLink === 0 ? 'active' : ''
            } md:hover:underline`}
          >
            Amigos
            {selectedLink === 0 && (
              <img
                src="polygon.svg"
                alt="Selected"
                className="absolute top-6 w-10 h-10 ml-2 md:hidden "
              />
            )}
          </Link>
        </li>
        <li>
          <Link
            to="/expenses"
            onClick={() => handleClick(1)}
            className={`relative ${
              selectedLink === 1 ? 'active' : ''
            } md:hover:underline`}
          >
            Gastos
            {selectedLink === 1 && (
              <img
                src="polygon.svg"
                alt="Selected"
                className="absolute top-6 w-10 h-10 ml-2 md:hidden"
              />
            )}
          </Link>
        </li>
        <li>
          <Link
            to="/groups"
            onClick={() => handleClick(2)}
            className={`relative ${
              selectedLink === 2 ? 'active' : ''
            } md:hover:underline`}
          >
            Grupos
            {selectedLink === 2 && (
              <img
                src="polygon.svg"
                alt="Selected"
                className="absolute top-6 w-10 h-10 ml-2 md:hidden"
              />
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
