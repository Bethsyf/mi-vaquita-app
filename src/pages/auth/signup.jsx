import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../assets/logo.svg';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    password: ''
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
      .required('Contraseña requerida')
  });

  const registerUser = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/users", values);

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al hacer la petición'
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El correo electrónico ya está registrado'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al registrar'
        });
      }
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

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          registerUser(values);
          setSubmitting(false);
        }}
      >
        <Form className="mt-16 w-full max-w-sm">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700">Nombre</label>
            <Field type="text" id="name" name="name" className="form-input w-full mt-1 border rounded-md shadow-sm h-10 pl-4 pr-4" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700">Correo electrónico</label>
            <Field type="email" id="email" name="email" className="form-input w-full mt-1 border rounded-md shadow-sm h-10 pl-4 pr-4" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-gray-700">Contraseña</label>
          
            <Field type={showPassword ? "text" : "password"} id="password" name="password" className="w-full mt-1 border rounded-md shadow-sm h-10 pr-10 pl-4 pr-4" />
            <span className=" absolute inset-y-0 right-0 pr-3 pt-6 flex items-center text-sm leading-5">
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
                {showPassword ? <FaEye className="text-2xl" /> : <FaEyeSlash className="text-2xl" />}
              </button>
            </span>
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>
          <button type="submit" className="w-full mt-6 bg-[#36190D] hover:bg-[#FFA72F] text-white font-bold py-2 px-4 rounded-md shadow-sm">Registrarse</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
