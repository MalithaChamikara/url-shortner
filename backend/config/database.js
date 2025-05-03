const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE,   // Database name
    process.env.DB_USER,       // Database username
    process.env.DB_PASSWORD,   // Database password
    {
      host: process.env.DB_HOST,  // Database host
      dialect: 'postgres',        // Specify PostgreSQL
      logging: false,             // Disable SQL query logging for security
      pool: {
        max: 10,     // Maximum number of connections in pool
        min: 0,      // Minimum number of connections in pool
        acquire: 30000, // Maximum time (ms) to acquire a connection
        idle: 10000,   // Maximum time (ms) that a connection can remain idle
      },
    }
  );
  

module.exports = sequelize;