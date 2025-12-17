const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const modelRoutes = require('./routes/modelRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/api/models', modelRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server ff running on port ${PORT}`);
});