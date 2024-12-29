import React, { useState, useEffect } from 'react';
import SeatGrid from '../components/SeatGrid';
import SeatReservation from '../components/SeatReservation'; // Import the SeatReservation component
import { fetchSeats } from '../api/api'; // Assuming this function fetches the seats
import '../styles/Home.css'; // Import the CSS for styling

const Home = () => {
  const [availableSeats, setAvailableSeats] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState('');

  const updateSeats = (seats) => {
    const result = availableSeats.map((seat) => {
      const seatBooked = seats.some((selectedSeat) => selectedSeat.id === seat.id);
      if (seatBooked) {
        seat.is_reserved = true;
      }
      return seat; 
    });
    setAvailableSeats(result);
  };
  

  // Fetch available seats when the component mounts
  useEffect(() => {
    const getSeats = async () => {
      try {
        const seatsData = await fetchSeats(); // Fetch available seats from the API
        setAvailableSeats(seatsData);
      } catch (error) {
        setError('Error fetching seats: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    getSeats();
  }, []); // Only run on mount

  // Log availableSeats whenever it changes
  useEffect(() => {
   
  }, [availableSeats]); 

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetch fails
  }

  return (
    <div className="home-container">

      <div className="content">
        <div className="seat-grid-container">
          <h1>Available Seats</h1>
          <SeatGrid seats={availableSeats} />
        </div>
        <div className="ticket-booking-container">
          <h2>Ticket Booking</h2>
          <SeatReservation updatedSeats={updateSeats} />
        </div>
      </div>
    </div>
  );
};

export default Home;
