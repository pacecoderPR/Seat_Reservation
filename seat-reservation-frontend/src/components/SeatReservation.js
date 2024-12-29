import React, { useState } from 'react';
import { checkSeatAvailability, reserveSeats, fetchSeats } from '../api/api';
import SeatGrid from './SeatGrid'; // Import SeatGrid component
import '../styles/SeatReservation.css';

const SeatReservation = ({ updatedSeats }) => {
  const [requestedSeats, setRequestedSeats] = useState(""); 
  const [availableSeats, setAvailableSeats] = useState([]); 
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [message, setMessage] = useState('');

  const handleSeatRequest = async () => {
    if (requestedSeats <= 0) {
      setMessage('Please enter a valid number of seats');
      return;
    }

    try {
      const data = await checkSeatAvailability({ count: requestedSeats});
      if (data.seats && data.seats.length > 0) {
        setAvailableSeats(data.seats);
        setMessage('Seats Available!!!');
        updatedSeats(data.seats);
      } else {
        setMessage('No seats available for the requested count');
      }
    } catch (error) {
      setMessage('Error checking seat availability: ' + error.message);
    }
  };

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      if (selectedSeats.length < requestedSeats) {
        setSelectedSeats([...selectedSeats, seat]);
      } else {
        setMessage(`You can select only ${requestedSeats} seats`);
      }
    }
  };

  return (
    <div className="seat-reservation-container">
      <h3>Request and Reserve Seats</h3>

      <div className="seat-request">
        <label htmlFor="seat-count">Number of Seats:</label>
        <input
          type="number"
          id="seat-count"
          min="1"
          value={requestedSeats}
          onChange={(e) => setRequestedSeats(Number(e.target.value))}
        />
        <button onClick={handleSeatRequest} className="check-availability-button">
           Book
        </button>
      </div>
      {availableSeats.length > 0 && (
        <div style={{display:'flex', flexWrap:'wrap', gap:'1rem'}}>
          <h4>Booked Seats:</h4>
          <div className="seat-grid">
            {availableSeats.map(seat => (
             <span key={seat.seat_number} style={{ margin: '5px' }}>{`Seat ${seat.id}`}</span>
            ))}
          </div>
        </div>
      )}
      
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SeatReservation;