import ButtonControl from '../controls/ButtonControl';
import logo from '../../assets/logo.svg';
import PropTypes from 'prop-types';

const CardGroupView = ({
  groupName, 
  participants,
 message,
 amountDue,
  selectedColor,
  onView,
  onDelete,
  onExit,  
  styles,
}) => {
  const cardStyles = `flex items-center m-2  overflow-hidden pl-2 md:m-6 ${styles}`;

  const getMessageColorClass = () => {
    switch (message) {
      case 'Debo':
        return 'text-red-500'; 
      case 'Me deben':
        return 'text-blue-500'; 
      case 'Balanceado':
        return 'text-gray-500'; 
      default:
        return 'text-black'; 
    }
  };

  return (
    <div className={`${cardStyles} font-fredoka`}>
      <div className="h-20 w-20 p-3" style={{ backgroundColor: selectedColor }}>
        <img
          className="h-full w-full object-cover md:w-48"
          src={logo}
          alt="Grupo"
        />
      </div>
      <div className="content-container p-5">
        <div className="tracking-wide text-m font-semibold">{groupName}</div>  
        <p className={`font-semibold ${getMessageColorClass()}`}>{`${message}: $${amountDue.toLocaleString('es-ES', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}</p>             
        <div className="flex space-x-2">
          {onExit ? (
            <>
              {' '}
              <ButtonControl
                type="button"
                text={'Ver'}
                styles={'py-0 mt-2'}
                onClickFn={() => onView()}
              />
              <ButtonControl
                type="button"
                text={'Abandonar'}
                styles={'py-0 mt-2'}
                onClickFn={() => onExit()}
              />
            </>
          ) : (
            <div>
            <p className='font-bold'>Participantes: {participants}</p> 
              <ButtonControl
                type="button"
                text={'Eliminar grupo'}
                styles={'py-0 mt-2'}
                onClickFn={() => onDelete()}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CardGroupView.propTypes = {
  groupName: PropTypes.string,  
  participants: PropTypes.string,
  amountDue: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  selectedColor: PropTypes.string,
  onView: PropTypes.func,
  onDelete: PropTypes.func,
  onExit: PropTypes.func,
  styles: PropTypes.string,
};

export default CardGroupView;
