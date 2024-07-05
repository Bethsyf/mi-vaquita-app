import PropTypes from 'prop-types';
import ButtonControl from '../controls/ButtonControl';

const CardExpenseView = ({
  expenseName,
  participants,
  paidBy,
  amount,
  message,
  amountDue,
  onView,
  onDelete,
  styles,
}) => {
  const cardStyles = `flex items-center m-2 overflow-hidden pl-2 md:m-6 ${styles}`;

  // Determina la clase de color basada en el mensaje
  const getMessageColorClass = () => {
    switch (message) {
      case 'Debo':
        return 'text-red-500'; // Rojo
      case 'Me deben':
        return 'text-blue-500'; // Azul
      case 'No participé':
        return 'text-gray-500'; // Gris oscuro
      default:
        return 'text-black'; // Negro por defecto
    }
  };

  return (
    <div className={`${cardStyles} font-fredoka`}>
      <div className="content-container p-5">
        <div className="tracking-wide text-m font-semibold">{expenseName}</div>
        <p className="text-gray-500">{`${paidBy} pagó $${amount.toLocaleString('es-ES', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}</p>
        <p className={`font-semibold ${getMessageColorClass()}`}>{`${message}: $${amountDue.toLocaleString('es-ES', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}</p>
        <p className="text-gray-500">Participantes: {participants} personas</p>
        <div className="flex space-x-2">
          <ButtonControl
            type="button"
            text={'Ver'}
            styles={'py-0 mt-2'}
            onClickFn={onView}
          />
          <ButtonControl
            type="button"
            text={'Eliminar'}
            styles={'py-0 mt-2'}
            onClickFn={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

CardExpenseView.propTypes = {
  userId: PropTypes.number.isRequired,
  expenseName: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
    })
  ).isRequired,
  paidBy: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  amountDue: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  onView: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  styles: PropTypes.string,
};

export default CardExpenseView;
