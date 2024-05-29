import axios from 'axios';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


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
      
      const response = await axios.post("http://localhost:5000/api/v1/login", formData);

      if (response.status === 200) {   
         localStorage.setItem('token', response.data.token);      
      } else {
        console.log("Error al hacer la peticion ");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="flex flex-col m-3 items-center min-h-screen">
      <div className="mt-20 text-center">
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
    </div>
  );
};

export default Login;
