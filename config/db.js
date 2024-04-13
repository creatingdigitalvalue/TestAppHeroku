const { Sequelize } = require('sequelize');
require('dotenv').config();


// Create a Sequelize instance with environment variables
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || process.env.LO_DB_HOST,
  database: process.env.DB_NAME || process.env.LO_DB_NAME,
  username: process.env.DB_USER || process.env.LO_DB_USER,
  password: process.env.DB_PASSWORD || process.env.LO_DB_PASSWORD,
  port: process.env.DB_PORT || process.env.LO_DB_PORT
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;