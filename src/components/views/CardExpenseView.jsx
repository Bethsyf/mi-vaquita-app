import React from 'react';
import ButtonControl from '../controls/ButtonControl';
import PropTypes from 'prop-types';

const CardExpenseView = ({
  expenseName,
  participants,
  paidBy,
  amount,
  onView,
  onDelete,
  styles,
}) => {
  const cardStyles = `flex items-center m-2 overflow-hidden pl-2 md:m-6 ${styles}`;

  let textColor, balanceText;

  // Calculating the amount owed or owed per person
  if (amount < 0) {
    textColor = 'text-blue-500';
    balanceText = `Te deben: ${Math.abs(amount).toFixed(2)}`;
  } else if (amount > 0) {
    if (participants > 0) {
      if (paidBy.name === 'Tu nombre') {
        const perPersonAmount = amount / participants;
        const amountOwed = amount - perPersonAmount;
        balanceText = `Te deben: ${amountOwed.toFixed(2)}`;
      } else {
        const amountOwed = amount / participants;
        textColor = 'text-red-500';
        balanceText = paidBy === 'yoyoyo' ? `Te deben: ${(amountOwed * (participants - 1)).toFixed(2)}` : `Debes: ${amountOwed.toFixed(2)}`;
      }
    } else {
      balanceText = `Debes: ${0}`;
    }
  } else {
    textColor = 'text-red-500';
    balanceText = 'Debes: 0'; 
  }

  return (
    <div className={`${cardStyles} font-fredoka`}>
      <div className="content-container p-5">
        <div className="tracking-wide text-m font-semibold">{expenseName}</div>
        <p className="text-gray-500">{`${paidBy} pagó $${amount.toFixed(2)}`}</p>
        <p className={`font-bold ${textColor}`}>{balanceText}</p>
        <p className="text-gray-500">Participantes: {participants} personas</p>
        <div className="flex space-x-2">
          <ButtonControl
            type="button"
            text={'Ver'}
            styles={'py-0 mt-2'}
            onClickFn={() => onView()}
          />
          <ButtonControl
            type="button"
            text={'Eliminar'}
            styles={'py-0 mt-2'}
            onClickFn={() => onDelete()}
          />
        </div>
      </div>
    </div>
  );
};

CardExpenseView.propTypes = {
  expenseName: PropTypes.string.isRequired,
  participants: PropTypes.number.isRequired,
  paidBy: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  onView: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  styles: PropTypes.string,
};

export default CardExpenseView;
