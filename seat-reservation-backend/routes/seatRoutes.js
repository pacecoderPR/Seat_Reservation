const express = require('express');
const { getAvailableSeats, reserveSeats,checkSeatAvailability } = require('../controllers/seatController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getAvailableSeats); 
router.post('/availability', authencheckSeatAvailability);
module.exports = router;
