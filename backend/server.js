const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const urlRoutes = require('./modules/urls/urlRoutes');
const cron = require('node-cron');
const deactivateExpiredUrls = require('./utils/deactivateExpiredUrls'); 
require('dotenv').config();

const app = express();



const corsOptions = {
  origin: '*', // Allow all origins 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
//middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/urls', urlRoutes);

// Schedule the task to run every day at midnight to deactivate expired URLs
cron.schedule('0 0 * * *', async () => {
  console.log('Running cron job to deactivate expired URLs...');
  await deactivateExpiredUrls();
})
const PORT = process.env.PORT || 5000;

(async () => {
    try {
      // Test the Sequelize connection to the database
      await sequelize.authenticate();
      console.log('Database connected successfully via Sequelize!');

      // Sync models with the database
      // Automatically update schema if needed
      await sequelize.sync({ alter: true });
      console.log('Database models synced!');



      // Start the Express server
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (err) {
      console.log(err);

      console.error('Database connection failed:', err.message);
      process.exit(1);
    }
})();