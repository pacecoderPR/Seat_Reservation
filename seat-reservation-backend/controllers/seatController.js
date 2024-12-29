const { Seat } = require('../models/init');

// Get available seats
exports.getAvailableSeats = async (req, res) => {
  try {
    const seats = await Seat.findAll({
      order: [['id', 'ASC']]  
    });
    res.status(200).json({ seats });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Reserve seats

exports.checkSeatAvailability = async (req, res) => {
  const { count } = req.body;

  if (!count || count <= 0) {
    return res.status(400).json({ message: 'Invalid seat count' });
  }

  try {
    const availableSeats = await Seat.findAll({
      where: { is_reserved: false },
      limit: count,
    });

    const seatIds = availableSeats.map(seat => seat.id); 
    await Seat.update(
      { is_reserved: true },
      { where: { id: seatIds } } 
    );

    if (availableSeats.length === 0) {
      return res.status(404).json({ message: 'No seats available' });
    }

    return res.status(200).json({ seats: availableSeats });
  } catch (error) {
    console.error('Error fetching seat availability:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};