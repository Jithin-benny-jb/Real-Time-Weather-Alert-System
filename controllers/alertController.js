const Alert = require('../models/alertModel');

exports.getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find({});
        res.status(200).json({ success: true, data: alerts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching alerts.' });
    }
};
