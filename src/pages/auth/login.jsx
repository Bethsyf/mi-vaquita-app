import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await loginUser(email, password);
  };

  const loginUser = async (email, password) => {
    try {
      const formData = {
        email,
        password
      };
      console.log("Enviando solicitud de inicio de sesión", formData);

      const response = await axios.post("http://localhost:5000/api/v1/login", formData);

      console.log("Respuesta del servidor:", response);
      if (response.status === 200) {
        sessionStorage.setItem('token', response.data.token); 
        console.log("Inicio de sesión exitoso, token guardado");
        navigate('/'); 
      } else {
        console.log("Error al hacer la petición");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleRegister = () => {
    navigate('/auth/signup');
  };

  return (
    <div className="flex flex-col m-3 items-center min-h-screen">
      <div className="mt-20 text-center">
        <img
          className="h-full w-full object-cover md:w-48"
          src={logo}
          alt="Grupo"
        />
        <h1 className="text-4xl font-bold text-[#36190D]">Iniciar Sesión</h1>
      </div>

      <form onSubmit={handleSubmit} className="mt-16 w-full max-w-sm">
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700">Correo electrónico</label>
          <input type="email" id="email" className="form-input w-full mt-1 border rounded-md shadow-sm h-10" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">Contraseña</label>
          <input type="password" id="password" className="form-input w-full mt-1 border rounded-md shadow-sm h-10" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="w-full mt-6 bg-[#36190D] hover:bg-[#FFA72F] text-white font-bold py-2 px-4 rounded-md shadow-sm">Iniciar sesión</button>
      </form>

      <button onClick={handleRegister} className="w-96 mt-4 bg-[#FFA72F] hover:bg-[#36190D] text-white font-bold py-2 px-4 rounded-md shadow-sm">Registrarse</button>
    </div>
  );
};

export default Login;
