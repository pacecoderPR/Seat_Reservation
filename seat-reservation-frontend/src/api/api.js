import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// User Signup API
export const signupUser = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    const { token } = response.data;
    localStorage.setItem('token',token);

    console.log(token+" "+localStorage.getItem('token'));
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// User Login API
export const loginUser = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch Available Seats API
export const fetchSeats = async () => {
  try {
    const response = await api.get('/seats');
    return response.data.seats;
  } catch (error) {
    throw error.response.data;
  }
};

// Reserve Seats API
export const reserveSeats = async (reservationData, token) => {
  try {
    const response = await api.post(
      '/seats/reserve',
      reservationData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const checkSeatAvailability = async (requestData) => {

  const response = await fetch('http://localhost:5000/api/seats/availability', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch seat availability');
  }

  return response.json();
};