require('dotenv').config();
const db = require('./config/db');
const express = require('express');
const cors = require('cors');
const tribeRoutes = require('./routes/tribeRoutes');
const languagesRoutes = require('./routes/languagesRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const { Sequelize } = require('sequelize');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
  }));
// Connect to PostgreSQL


// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/Tribe_API/tribes', tribeRoutes);
app.use('/Language_API/languages', languagesRoutes);
app.use('/Comment_API/comments', commentsRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the Echoes of Culture API!');
});

// Replace these with your actual PostgreSQL connection details
const sequelize = new Sequelize('tribeLang_db', 'postgres', 'gnani999', {
    host: 'localhost',     // Or the IP address of your PostgreSQL server
    dialect: 'postgres',   // Set the dialect to PostgreSQL
    port: 5432,        // Default PostgreSQL port
  });
  
  // Test the connection
  sequelize.authenticate()
    .then(() => {
      console.log('Database connected!');
        // Sync the models with the database
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });
  
  
  
  // Error middleware
  //app.use(errorMiddleware);
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  
