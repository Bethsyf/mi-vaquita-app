import { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ButtonControl from '../controls/ButtonControl';
import ColorsView from './ColorsView';
import PropTypes from 'prop-types';

const CreateGroupView = ({ onClose, onCreateGroup }) => {
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const modalRef = useRef(null);

  const initialValues = {
    groupName: '',
  };

  const validationSchema = Yup.object().shape({
    groupName: Yup.string()
      .min(3, 'Mínimo 3 caracteres permitidos')
      .max(30, 'Máximo 30 caracteres permitidos')
      .required('Elige un nombre para continuar'),
  });

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      await onCreateGroup(values.groupName, selectedColor);
      onClose();
    } catch (error) {
      console.error('Error al crear el grupo:', error);
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
        <h2 className="text-xl font-bold mb-4 text-center">Nuevo grupo</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6 h-12">
                <Field
                  type="text"
                  name="groupName"
                  className="border border-gray-400 rounded-md px-3 py-2 w-full h-full"
                  placeholder="Nombre del grupo"
                />
                <ErrorMessage name="groupName" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4 border border-gray-400 rounded-md p-3">
                <ColorsView onSelectColor={handleColorSelect} selectedColor={selectedColor} />
              </div>
              <ButtonControl text={'Crear'} styles={'w-60 mx-auto'} type="submit" disabled={isSubmitting} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

CreateGroupView.propTypes = {
  onClose: PropTypes.func,
  onCreateGroup: PropTypes.func,
};

export default CreateGroupView;
