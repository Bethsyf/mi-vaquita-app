import { useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import 'sweetalert2/src/sweetalert2.scss';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import ButtonControl from '../controls/ButtonControl';

const ModalAddMember = ({ groupName, users, loading, onSubmit, onClose }) => {
  const modalRef = useRef(null);

  const initialValues = {
    emails: [],
  };

  const validationSchema = Yup.object().shape({
    emails: Yup.array()
      .of(Yup.string().email('Formato de correo electrónico inválido'))
      .min(1, 'Debes seleccionar al menos un correo electrónico')
      .required('Debes seleccionar al menos un correo electrónico'),
  });

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await onSubmit(values.emails);
      onClose();
      resetForm();
    } catch (error) {
      console.error('Error al agregar miembro:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg relative max-h-full overflow-auto" ref={modalRef}>
        <button type="button" className="absolute top-0 right-1 p-2 z-10" onClick={onClose}>
          <span className="text-lg">×</span>
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">{groupName}</h2>
        <p>Elige al menos un amigo para continuar:</p>
        {loading ? (
          <p>Cargando usuarios...</p>
        ) : (
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <div className="mb-6">
                  {users.map((user) => (
                    <label key={user.id} className="block">
                      <Field
                        type="checkbox"
                        name="emails"
                        value={user.email}
                        checked={values.emails.includes(user.email)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          if (isChecked) {
                            setFieldValue('emails', [...values.emails, user.email]);
                          } else {
                            setFieldValue(
                              'emails',
                              values.emails.filter((email) => email !== user.email)
                            );
                          }
                        }}
                        className="mr-2"
                      />
                      {user.email}
                    </label>
                  ))}
                  <ErrorMessage name="emails" component="div" className="text-red-500 text-sm" />
                </div>
                <ButtonControl text={'Agregar'} styles={'w-60 mx-auto'} type="submit" disabled={isSubmitting} />
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

ModalAddMember.propTypes = {
  groupName: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalAddMember;
