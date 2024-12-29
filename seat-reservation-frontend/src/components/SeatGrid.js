import React, { useState, useEffect } from 'react';
import SeatCard from './SeatCard';
import '../styles/SeatGrid.css';

const SeatGrid = ({ seats }) => {
  const [availableCount, setAvailableCount] = useState(0);
  const [bookedCount, setBookedCount] = useState(0);

  useEffect(() => {
    calculateSeatCounts(seats);
  }, [seats]);

  const calculateSeatCounts = (seats) => {
    const available = seats.filter((seat) => !seat.is_reserved).length;
    const booked = seats.filter((seat) => seat.is_reserved).length;
    setAvailableCount(available);
    setBookedCount(booked);
  };

  return (
    <div className="seat-grid-container">
      <div className="seat-grid">
        {seats.map((seat) => (
          <SeatCard key={seat.id} seat={seat} />
        ))}
      </div>
      <div className="seat-counts">
        <button className="seat-count-button available">
          Available Seats: {availableCount}
        </button>
        <button className="seat-count-button booked">
          Booked Seats: {bookedCount}
        </button>
      </div>
    </div>
  );
};

export default SeatGrid;
