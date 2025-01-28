const cron = require('node-cron');
const weatherController = require('../controllers/weatherController');

// croon job for every 10 minutes
cron.schedule('*/10 * * * *', () => {
    console.log('weather data corn');
    weatherController.fetchWeatherData();
});
