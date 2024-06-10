import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
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
        'http://localhost:5000/api/v1/login',
        values
      );

      if (response.status === 200) {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userId', response.data.userId);
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
        <img
          className="h-auto w-48 object-cover"
          src={logo}
          alt="Grupo"          
        />
        <h1 className="text-5xl font-bold text-[#36190D]">Mi vaquita</h1>
        <h1 className="font-bold text-[#FFA72F]">
          Compartir gastos con tus amigos
        </h1>
        <h1 className="text-xl  mt-6 font-bold text-[#36190D]">
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
        <Form className="mt-16 w-full max-w-sm h-full">
          <div className="mb-8">
            <Field
              placeholder="Correo electrónico"
              type="email"
              id="email"
              name="email"
              className="form-input w-full mb-2 border rounded-md shadow-sm h-10 pl-4 pr-4"
            />
            <div className="text-red-500 text-sm">
              <ErrorMessage name="email" />
            </div>
          </div>

          <div className="mb-8 relative">
            <Field
              placeholder="Contraseña"
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="w-full mt-1 border rounded-md shadow-sm h-10 pr-10 pl-4 pr-4"
            />
            <span className=" absolute inset-y-0 right-0 pr-3 pt-6 flex items-center text-sm leading-5">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
              >
                {showPassword ? (
                  <FaEye className="text-2xl" />
                ) : (
                  <FaEyeSlash className="text-2xl" />
                )}
              </button>
            </span>
            <div className="text-red-500 text-sm">
              <ErrorMessage name="password" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-[#36190D] hover:bg-[#FFA72F] text-white font-bold py-2 rounded-md shadow-sm"
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
