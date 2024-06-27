import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavMenu from './NavMenuView';
import logo from '../../assets/logo.svg';
import { BiSolidUserCircle } from 'react-icons/bi';
import PropTypes from 'prop-types';
import ButtonControl from '../controls/ButtonControl';

const HeaderView = ({ name }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('email');   
    navigate('/auth/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="bg-[#36190D] relative">
      <div className="container font-fredoka mx-auto flex flex-wrap items-center justify-between py-2 md:px-10">
        <div className="flex items-end pl-5 md:items-center md:pl-0">
          <img
            src={logo}
            alt="Workflow"
            className="w-10 h-10 mr-2 md:w-20 md:h-20 md:mr-4"
          />
          <h1 className="text-xl font-bold text-[#f9f9f9] min-w-full md:min-w-0 md:text-4xl md:font-extrabold md:pt-4">
            Mi Vaquita
          </h1>
        </div>
        <div className="absolute top-4 right-0 md:top-8" ref={menuRef}>
          <button onClick={handleMenuToggle}>
            <BiSolidUserCircle className="text-4xl text-[#f9f9f9] mr-3" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 w-48 bg-white rounded-lg z-10 border-2">
              <div className="px-4 py-2 text-gray-800">Hola, {name}</div>
              <div className="border-t border-gray-200 "></div>
              <ButtonControl
                text={'Cerrar sesión'}
                styles={'block w-full text-center'}
                type="button"
                onClickFn={handleLogout}
              />
            </div>
          )}
        </div>
        <NavMenu />
      </div>
    </header>
  );
};

HeaderView.propTypes = {
  name: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default HeaderView;
