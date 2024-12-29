import React from 'react';
import'../styles/SeatCard.css'

const SeatCard = ({ seat }) => {
  return (
    <div className={`seat-card ${seat.is_reserved ? 'reserved' : 'available'}`}>
      <div>{seat.id}</div>
    </div>
  );
};

export default SeatCard;
