import { useEffect, useRef} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ButtonControl from '../controls/ButtonControl';
import PropTypes from 'prop-types';

const ModalAddExpense = ({ groupName, participants, onSubmit, onClose }) => {
  const modalRef = useRef(null);


  const initialValues = {
    expenseName: '',
    amount: '',
    paidByUserId: '',
    participants: [],
  };

  const validationSchema = Yup.object().shape({
    expenseName: Yup.string()
      .min(3, 'Mínimo 3 caracteres permitidos')
      .max(50, 'Máximo 50 caracteres permitidos')
      .required('Ingresa un nombre para el gasto'),
    amount: Yup.number()
      .min(0.01, 'El monto debe ser mayor que cero')
      .required('Ingresa el monto del gasto'),
    paidByUserId: Yup.string().required('Selecciona quién pagó este gasto'),
    participants: Yup.array()
      .of(Yup.string().required('Selecciona al menos un participante'))
      .min(1, 'Selecciona al menos un participante')
      .required('Selecciona al menos un participante'),
  });

  const handleFormSubmit = async (values) => {
    try {     
      await onSubmit(values);
    } catch (error) {
      console.error('Error submitting form:', error);
      
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
      <div
        className="bg-white p-8 rounded-lg relative max-h-full overflow-auto m-2"
        ref={modalRef}
      >
        <button
          type="button"
          className="absolute top-0 right-1 p-2 z-10"
          onClick={onClose}
        >
          <span className="text-lg">×</span>
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">{groupName}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="expenseName" className="block mb-1">
                  Nombre del gasto:
                </label>
                <Field
                  type="text"
                  id="expenseName"
                  name="expenseName"
                  className="border border-gray-400 rounded-md px-3 py-2 w-full"
                  placeholder="Nombre del gasto"
                />
                <ErrorMessage
                  name="expenseName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="amount" className="block mb-1">
                  Monto del gasto:
                </label>
                <Field
                  type="number"
                  id="amount"
                  name="amount"
                  className="border border-gray-400 rounded-md px-3 py-2 w-full"
                  placeholder="Monto del gasto"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="paidByUserId" className="block mb-1">
                  Pagado por:
                </label>
                <Field
                  as="select"
                  id="paidByUserId"
                  name="paidByUserId"
                  className="border border-gray-400 rounded-md px-3 py-2 w-full"
                >
                  <option value="" className='max-h-24 overflow-y-auto'>Selecciona</option>
                  {participants.map((email, index) => (
                    <option key={index} value={email} className='max-h-24 overflow-y-auto'>
                      {email}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="paidByUserId" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4 max-h-24 overflow-y-auto">
                <label className="block mb-1">Participantes:</label>
                {participants.map((participant, index) => (
                  <label key={index} className="block">
                    <Field
                      type="checkbox"
                      name="participants"
                      value={participant}
                      checked={values.participants.includes(participant)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          setFieldValue('participants', [
                            ...values.participants,
                            participant,
                          ]);
                        } else {
                          setFieldValue(
                            'participants',
                            values.participants.filter(
                              (email) => email !== participant
                            )
                          );
                        }
                      }}
                      className="mr-2"
                    />
                    {participant}
                  </label>
                ))}
                <ErrorMessage
                  name="participants"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <ButtonControl
                text={'Agregar gasto'}
                styles={'w-60 mx-auto'}
                type="submit"
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

ModalAddExpense.propTypes = {
  groupName: PropTypes.string.isRequired, 
  participants: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalAddExpense;
