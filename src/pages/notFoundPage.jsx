import { Link } from 'react-router-dom';
import cow from '../assets/cow-not-found.png';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="text-center flex justify-center flex-col items-center">
      <img className="h-auto w-48 object-cover" src={cow} alt="logo" />
        <h1 className="text-3xl md:text-5xl font-bold text-[#36190D]">404 - Not Found</h1>
        <p className="mt-4 mb-4 text-lg md:text-xl text-[#FFA72F]">La página que estás buscando no existe.</p>
        <Link
          to="/"
          className="mt-6 px-4 py-2 bg-[#36190D] hover:bg-[#FFA72F] text-white rounded-md shadow-md text-sm md:text-base"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
