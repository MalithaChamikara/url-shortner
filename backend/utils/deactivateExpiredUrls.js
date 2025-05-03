const { Op } = require('sequelize');
const Url = require('../models/urlModel');

const deactivateExpiredUrls = async () => {
    try {
        const result = await Url.update(
            { isActive: false },
            {
                where: {
                    expiresAt: {
                        [Op.lt]: new Date(), // Find URLs that have expired
                    },
                    isActive: true, // Only deactivate active URLs
                },
            }
        );
        console.log(` Deactivated ${result[0]} URLs deactivated.`);
    } catch (error) {
        console.error('Error deactivating expired URLs:', error);
    }
}

module.exports = deactivateExpiredUrls;