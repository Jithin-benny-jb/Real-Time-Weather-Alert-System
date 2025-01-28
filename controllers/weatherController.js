const fs = require('fs');  // Import the fs module
const Weather = require('../models/weatherModel');
const City = require('../models/cityModel');
const Alert = require('../models/alertModel');
const weatherService = require('../services/weatherService');

// Log alert messages to a file
const logAlertToFile = (message) => {
    const logMessage = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFile('realtime_weather_alerts.log', logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
};



exports.fetchWeatherData = async (req, res) => {
    try {
        const cities = await City.find({});
        const weatherData = await Promise.all(
            cities.map((city) => weatherService.getWeatherForCity(city.name))
        );

        weatherData.forEach(async (data) => {
            console.log("🚀 ~ weatherData.forEach ~ data:", data);
            const { city, temperature, condition } = data;
            const weather = new Weather({ city, temperature, condition });
            await weather.save();

            // alert conditions
            if (condition.includes('rain')) {
                await new Alert({ city, type: 'Rain' }).save();
                const alertMessage = `Alert: Rain detected in ${city} at ${new Date()}`;
                console.log(alertMessage);
                logAlertToFile(alertMessage);  // Log to file
            }
            if (temperature > 30) {
                await new Alert({ city, type: 'High Temperature' }).save();
                const alertMessage = `Alert: High temperature (${temperature}°C) detected in ${city} at ${new Date()}`;
                console.log(alertMessage);
                logAlertToFile(alertMessage);  // Log to file
            }
            if (temperature < 10) {
                await new Alert({ city, type: 'Low Temperature' }).save();
                const alertMessage = `Alert: Low temperature (${temperature}°C) detected in ${city} at ${new Date()}`;
                console.log(alertMessage);
                logAlertToFile(alertMessage);  // Log to file
            }
        });

        if (res) {
            res.status(200).json({ success: true, message: 'Weather data fetched and processed successfully.' });
        }
    } catch (error) {
        console.error(error);
        if (res) {
            res.status(500).json({ success: false, message: 'Error fetching weather data.' });
        }
    }
};
