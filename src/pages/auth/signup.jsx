import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiKeyOutline } from 'react-icons/ti';
import { GiPadlock } from 'react-icons/gi';
import { LuUser } from 'react-icons/lu';
import axios from 'axios';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import logo from '../../assets/logo.svg';
import FooterView from '../../components/views/FooterView';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Mín. 3 caracteres')
      .max(100, 'Máx. 100 caracteres')
      .required('Nombre requerido'),
    email: Yup.string()
      .email('Correo electrónico inválido')
      .required('Correo requerido'),
    password: Yup.string()
      .min(8, 'Mín. 8 caracteres')
      .matches(/[A-Z]/, 'Debe contener una mayúscula')
      .matches(/[!@#$%^&*(),.?":{}|<>\-_/]/, 'Debe tener un carácter especial')
      .required('Contraseña requerida'),
  });

  const registerUser = async (values) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/users',
        values
      );

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al hacer la petición',
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El correo electrónico ya está registrado',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al registrar',
        });
      }
    }
  };

  return (
    <div className="flex flex-col m-3 items-center min-h-screen">
      <div className="mt-20 text-center">
        <img className="h-auto w-48 object-cover" src={logo} alt="Grupo" />
        <h1 className="text-5xl font-bold text-[#36190D]">Mi vaquita</h1>
        <h1 className="font-bold text-[#FFA72F]">
          Compartir gastos con tus amigos
        </h1>
        <h1 className="text-xl  mt-6 font-bold text-[#36190D]">Registro</h1>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          registerUser(values);
          setSubmitting(false);
        }}
      >
        <Form className="mt-4 mb-8 w-full max-w-sm">
          <div className="mb-6 relative">
            <Field
              placeholder="Nombre"
              type="text"
              id="name"
              name="name"
              className="w-full mt-1 border rounded-md shadow-sm h-10 px-4"
            />
            <LuUser className="text-2xl absolute inset-y-0 right-3 top-3" />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="mb-6 relative">
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
              className="text-red-500 text-sm"
            />
          </div>
          <div className="mb-6 relative">
            <Field
              placeholder="Contraseña"
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="w-full mt-1 border rounded-md shadow-sm h-10 pr-10 px-4"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-sm leading-5">
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
              className="text-red-500 text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-[#36190D] hover:bg-[#FFA72F] text-white font-bold py-2 px-4 rounded-md shadow-sm"
          >
            Registrarme
          </button>
          <a
            href="/auth/login"
            className="mt-6 flex items-center justify-center text-[#FFA72F] text-center"
          >
            Volver al login
          </a>
        </Form>
      </Formik>
      <FooterView />
    </div>
  );
};

export default Register;
