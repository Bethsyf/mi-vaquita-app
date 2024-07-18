import HeaderView from '../components/views/HeaderView';
import logo from '../assets/logo.svg';
import FooterView from '../components/views/FooterView';

const HomePage = () => {
  const name = sessionStorage.getItem('name');
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="sticky top-0 z-40 bg-white">
          <HeaderView name={name} />
        </div>
        <div className="flex flex-col items-center justify-center flex-grow mt-10 px-4 text-center">
          <img className="h-auto w-48 object-cover mb-6" src={logo} alt="logo" />
          <h1 className="text-5xl font-bold text-[#36190D]">Bienvenidos a Mi Vaquita</h1>
          <p className="text-xl text-gray-800 mt-4">
            ¡Organiza tus grupos y gastos de manera fácil y eficiente!
          </p>
          <p className="text-lg text-gray-600 mt-4 max-w-md">
            Mi Vaquita es la mejor forma de gestionar tus gastos en grupo. Ya sea para un evento familiar, una salida con amigos o cualquier otra actividad en la que compartas costos, aquí encontrarás todas las herramientas necesarias para mantener tus finanzas en orden.
          </p>
        </div>
      </main>
      <FooterView />
    </div>
  );
};

export default HomePage;