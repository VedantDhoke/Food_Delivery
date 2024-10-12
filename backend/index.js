const express = require('express');
const app = express();
const port = 5000;
const mongodb = require('./db');
const cors = require('cors');

// CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Correct the origin URL
  credentials: true, // Access-Control-Allow-Credentials: true
  optionSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Connect to MongoDB
mongodb();

// Middleware
app.use(cors(corsOptions)); // Use this before your routes
app.use(express.json());

// Routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
