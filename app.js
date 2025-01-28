require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const weatherRoutes = require('./routes/weatherRoutes');
const cityRoutes = require('./routes/cityRoutes');
const alertRoutes = require('./routes/alertRoutes');
const scheduler = require('./tasks/scheduler');

const app = express();
app.use(express.json());

app.use('/api', weatherRoutes);
app.use('/api', cityRoutes);
app.use('/api', alertRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
