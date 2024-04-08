import NavMenu from './NavMenuView';
import logo from '../../assets/logo.svg';

const HeaderView = () => {
  return (
    <header className="bg-[#36190D]">
      <div className="container font-fredoka mx-auto flex flex-wrap items-center justify-between py-2">
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
        <NavMenu />
      </div>
    </header>
  );
};

export default HeaderView;
