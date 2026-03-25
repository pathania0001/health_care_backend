const express = require('express');
const app = express();
require('dotenv').config();

const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Healthcare Management System API is running.' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

module.exports = app;