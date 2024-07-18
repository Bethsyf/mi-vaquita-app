import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { TiKeyOutline } from 'react-icons/ti';
import { GiPadlock } from 'react-icons/gi';
import { LuUser } from 'react-icons/lu';
import logo from '../../assets/logo.svg';
import FooterView from '../../components/views/FooterView';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Correo electrónico no válido')
      .required('El correo electrónico es requerido'),
    password: Yup.string().required('La contraseña es requerida'),
  });

  const loginUser = async (values) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/login`,
        values
      );

      if (response.status === 200) {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userId', response.data.userId);
        sessionStorage.setItem('name', response.data.name);
        navigate('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al hacer la petición',
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Correo electrónico o contraseña incorrectos',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al iniciar sesión',
        });
      }
    }
  };

  const handleRegister = () => {
    navigate('/auth/signup');
  };

  return (
    <div className="flex flex-col m-3 items-center min-h-screen">
      <div className="text-center flex justify-center flex-col items-center">
        <img className="h-auto w-48 object-cover" src={logo} alt="logo" />
        <h1 className="text-5xl font-bold text-[#36190D]">Mi vaquita</h1>
        <h1 className="font-bold text-[#FFA72F]">
          Compartir gastos con tus amigos
        </h1>
        <h1 className="text-xl mt-4 font-bold text-[#36190D]">
          Iniciar Sesión
        </h1>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          loginUser(values);
          setSubmitting(false);
        }}
      >
        <Form className="mt-10 w-full max-w-sm h-full flex flex-col items-center">
          <div className="mb-8 w-72 md:w-96 relative">
            <Field
              placeholder="Correo electrónico"
              type="email"
              id="email"
              name="email"
              className="w-full mt-1 border rounded-md shadow-sm h-10 px-4"
            />
            <LuUser className="text-2xl absolute inset-y-0 right-3 top-3" />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm absolute pl-2 bottom-[-1.5rem]"             
            />
          </div>

          <div className="mb-6 relative w-72 md:w-96">
            <Field
              placeholder="Contraseña"
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="w-full mt-1 border rounded-md shadow-sm h-10 px-4"
            />
            <span className=" absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
              >
                {showPassword ? (
                  <TiKeyOutline className="text-2xl" />
                ) : (
                  <GiPadlock className="text-2xl" />
                )}
              </button>
            </span>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm absolute pl-2 bottom-[-1.5rem]"              
            />
          </div>

          <button
            type="submit"
            className="w-72 mt-6 bg-[#36190D] hover:bg-[#FFA72F] text-white font-bold py-2 rounded-md shadow-sm md:w-96"
          >
            Ingresar
          </button>
        </Form>
      </Formik>

      <button
        onClick={handleRegister}
        className="w-72 mb-10 md:w-96 mt-4 bg-[#FFA72F] hover:bg-[#36190D] text-white font-bold py-2 rounded-md shadow-sm"
      >
        Registrarme
      </button>
      <FooterView />
    </div>
  );
};

export default Login;
