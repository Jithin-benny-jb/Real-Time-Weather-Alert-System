const express = require('express');
const { addCity, getCities, deleteCity } = require('../controllers/cityController');
const router = express.Router();

// create new city
router.post('/cities', addCity);

//view all city
router.get('/view_cities', getCities);

// remove a city 
router.delete('/cities/:city', deleteCity);

module.exports = router;
