


const Login = () => {
  return (
    <div className="flex flex-col m-3 items-center min-h-screen ">
      <div className="mt-20 text-center">
        <h1 className="text-4xl font-bold text-[#36190D]">Iniciar Sesión</h1>
      </div>

      <form className="mt-16 w-full max-w-sm">
        <div className="mb-6">
          <label for="email" className="block text-gray-700">Correo electrónico</label>
          <input type="email" id="email" className="form-input w-full mt-1 border rounded-md shadow-sm h-10" />

        </div>

        <div className="mb-6">
          <label for="password" className="block text-gray-700">Contraseña</label>
          <input type="password" id="password" className="form-input w-full mt-1 border rounded-md shadow-sm h-10" />
        </div>

        <button type="submit" className="w-full mt-6 bg-[#36190D] hover:bg-[#FFA72F] text-white font-bold py-2 px-4 rounded-md shadow-sm">Iniciar sesión</button>
        
      </form>
    </div>
  );
};

export default Login;
