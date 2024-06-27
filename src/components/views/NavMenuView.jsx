import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import polygon from '../../assets/polygon.svg';

const NavMenu = () => {
  const [selectedLink, setSelectedLink] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;

    if (pathname === '/') {
      setSelectedLink(2);
    } else {
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
          setSelectedLink(2);
      }
    }
  }, [location]);

  return (
    <nav className="text-white py-4 px-5 w-full md:w-auto md:mr-6">
      <ul className="flex font-bold justify-between space-x-4 md:space-x-40 md:text-xl">
        <li>
          <Link
            to="/friends"
            className={`relative ${
              selectedLink === 0 ? 'active' : ''
            } md:hover:underline`}
          >
            Amigos
            {selectedLink === 0 && (
              <img
                src={polygon}
                alt="Selected"
                className="absolute top-6 w-10 h-10 ml-2 md:hidden "
              />
            )}
          </Link>
        </li>
        <li>
          <Link
            to="/expenses"
            className={`relative ${
              selectedLink === 1 ? 'active' : ''
            } md:hover:underline`}
          >
            Gastos
            {selectedLink === 1 && (
              <img
                src={polygon}
                alt="Selected"
                className="absolute top-6 w-10 h-10 ml-2 md:hidden"
              />
            )}
          </Link>
        </li>
        <li>
          <Link
            to="/groups"
            className={`relative ${
              selectedLink === 2 ? 'active' : ''
            } md:hover:underline`}
          >
            Grupos
            {selectedLink === 2 && (
              <img
                src={polygon}
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
