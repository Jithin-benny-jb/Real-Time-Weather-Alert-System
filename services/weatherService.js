const axios = require('axios');

exports.getWeatherForCity = async (city) => {
    const API_KEY = process.env.WEATHER_API_KEY;
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    console.log("the endpoint is", endpoint)
    const { data } = await axios.get(endpoint);
    return {
        city: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].description,
    };
};
