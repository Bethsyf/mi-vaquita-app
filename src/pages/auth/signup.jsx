import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await registerUser(name, email, password);
  };

  const registerUser = async (name, email, password) => {
    try {
      const formData = {
        name,
        email,
        password
      };
      console.log("Enviando solicitud de registro", formData);

      const response = await axios.post("http://localhost:5000/api/v1/users", formData);

      console.log("Respuesta del servidor:", response);
      if (response.status === 201) {
        console.log("Registro exitoso");
        navigate('/'); 
      } else {
        console.log("Error al hacer la petición");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  return (
    <div className="flex flex-col m-3 items-center min-h-screen">
      <div className="mt-20 text-center">
        <img
          className="h-full w-full object-cover md:w-48"
          src={logo}
          alt="Grupo"
        />
        <h1 className="text-4xl font-bold text-[#36190D]">Registrarse</h1>
      </div>

      <form onSubmit={handleSubmit} className="mt-16 w-full max-w-sm">
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700">Nombre</label>
          <input type="text" id="name" className="form-input w-full mt-1 border rounded-md shadow-sm h-10" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700">Correo electrónico</label>
          <input type="email" id="email" className="form-input w-full mt-1 border rounded-md shadow-sm h-10" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">Contraseña</label>
          <input type="password" id="password" className="form-input w-full mt-1 border rounded-md shadow-sm h-10" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="w-full mt-6 bg-[#36190D] hover:bg-[#FFA72F] text-white font-bold py-2 px-4 rounded-md shadow-sm">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
