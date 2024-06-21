import ButtonControl from '../controls/ButtonControl';
import logo from '../../assets/logo.svg';
import PropTypes from 'prop-types';

const CardView = ({
  groupName,
  description,
  value,
  selectedColor,
  onView,
  onDelete,
  onExit,  
  styles,
}) => {
  const cardStyles = `flex items-center m-2  overflow-hidden pl-2 md:m-6 ${styles}`;

  let textColor, balanceText;
  if (value < 0) {
    textColor = 'text-blue-500';
    balanceText = `Me deben: ${Math.abs(value)}`;
  } else if (value > 0) {
    textColor = 'text-red-500';
    balanceText = `Debes: ${value}`;
  } else {
    textColor = 'text-red-500';
    balanceText = 'Debes: 0';
  }
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
        <div className="tracking-wide text-sm font-semibold">{groupName}</div>

        <p className="text-gray-500">{description}</p>

        <p className={`font-bold ${textColor}`}>{balanceText}</p>

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
            <p className='font-bold'>Participantes: 0</p>
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

CardView.propTypes = {
  groupName: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.number,
  selectedColor: PropTypes.string,
  onView: PropTypes.func,
  onDelete: PropTypes.func,
  onExit: PropTypes.func,
  styles: PropTypes.string,
};

export default CardView;
