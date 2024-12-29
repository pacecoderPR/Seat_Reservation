const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create a Sequelize instance
const sequelize = new Sequelize(process.env.DATABASE_URL);

// Define the seat model
const Seat = sequelize.define('Seat', {
  row_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  seat_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reserved_by: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_reserved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Function to seed the database with seat data
const initSeats = async () => {
  await sequelize.sync({ force: true }); // Clear existing seats (be careful with force)

  for (let i = 1; i <= 12; i++) {
    for (let j = 1; j <= (i === 12 ? 3 : 7); j++) {
      await Seat.create({
        row_number: i,
        seat_number: j,
      });
    }
  }

  console.log('Seats initialized successfully');
};

initSeats();

module.exports = { sequelize, Seat };
