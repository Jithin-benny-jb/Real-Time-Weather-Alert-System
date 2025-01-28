const City = require('../models/cityModel');

exports.addCity = async (req, res) => {
    try {
        const { name } = req.body;
        const city = new City({ name });
        await city.save();
        res.status(201).json({ success: true, message: 'City added successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error adding city.' });
    }
};

exports.getCities = async (req, res) => {
    try {
        const cities = await City.find({});
        res.status(200).json({ success: true, data: cities });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching cities.' });
    }
};

exports.deleteCity = async (req, res) => {
    try {
        const { city } = req.params;
        const deletedCity = await City.findOneAndDelete({ name: city });

        if (!deletedCity) {
            return res.status(404).json({ success: false, message: 'City not found.' });
        }

        res.status(200).json({ success: true, message: 'City deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error deleting city.' });
    }
};
