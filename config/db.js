const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  // If running on Heroku, use the DATABASE_URL environment variable
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // Disable logging (you can enable it for debugging)
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // This line is important on Heroku
      }
    }
  });
} else {
  // If running locally or in other environments, use the provided credentials
  sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || process.env.LO_DB_HOST,
    database: process.env.DB_NAME || process.env.LO_DB_NAME,
    username: process.env.DB_USER || process.env.LO_DB_USER,
    password: process.env.DB_PASSWORD || process.env.LO_DB_PASSWORD,
    port: process.env.DB_PORT || process.env.LO_DB_PORT
  });
}

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
