const crypto = require('crypto');
const { Op } = require('sequelize');
const Url = require('../../models/urlModel');
const Analytics = require('../../models/analytics');
const axios = require('axios');

//Vlidate URL format
const isValidUrl = (url) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
};

// Generate a unique short URL
const generateShortUrl = async (originalUrl, alias, expiryDays = 7) => {
    try {
        //validate the original URL format
        if (!isValidUrl(originalUrl)) {
            throw new Error('Invalid URL format');
        }
        let shortUrl = crypto.randomBytes(4).toString('hex'); // Generate a random 8-character string
        //set expiration time 
        const expiresAt = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);
        // Check if the alias is already in use
        if (alias) {
            const existingUrl = await Url.findOne({ where: { alias } });
            if (existingUrl) {
                throw new Error('Alias already in use');
            }
            shortUrl = alias; // Use the provided alias
        } else {
            // Check if the generated short URL already exists
            const existingUrl = await Url.findOne({ where: { shortUrl } });
            while (existingUrl) {
                shortUrl = crypto.randomBytes(4).toString('hex');// Generate a new random string
                existingUrl = await Url.findOne({ where: { shortUrl } });
            }
        }
        // Create the URL  in the database
        const newUrl = await Url.create({
            originalUrl,
            shortUrl,
            alias,
            expiresAt,

        });
        await Analytics.create({ urlId: newUrl.id, clickCount: 0 });
        return newUrl;
    } catch (error) {
        console.error('Error generating short URL:', error.message);
        throw error
    }

};

// get Url by shortUrl
const getUrlByShortUrl = async (shortUrl) => {
    try {
        const url = await Url.findOne({ where: { shortUrl } });
        if (!url) {
            throw new Error('URL not found');
        }

        const analytics = await Analytics.findOne({ where: { urlId: url.id } });
        if (analytics) {
            analytics.clickCount += 1; // Increment the click count
            await analytics.save(); // Save the updated analytics
        }
        return url;
    } catch (error) {
        console.error('Error fetching URL:', error.message);
        throw error;
    }
};

// Get all urls with optional filters
const getAllUrls = async (name, date) => {
    try {
        const where = {};
        if (name) {
            where.shortUrl = {
                [Op.iLike]: `%${name}%`,
            };
        }
        if (date) {
            where.createdAt = {
                [Op.gte]: new Date(date),
                [Op.lte]: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
            };
        }
        const urls = await Url.findAll({
            where,
            include: [{ model: Analytics,as:'analytics' }], // Include Analytics model
        });

        console.log('Fetched URLs:', urls);
        return urls;

    } catch (error) {
        console.error('Error fetching URLs:', error.message);
        throw error;
    }
};

// update url by id
const updateUrlById = async (id, data) => {
    try {
        const url = await Url.findByPk(id);
        if (!url) {
            throw new Error('URL not found');
        }
        await url.update(data);
        return url;
    } catch (error) {
        console.error('Error updating URL:', error.message);
        throw error;
    }
};
// delete url by id
const deleteUrlById = async (id) => {
    try {
        const url = await Url.findByPk(id);
        if (!url) {
            throw new Error('URL not found');
        }
        await url.destroy();
        return url;
    } catch (error) {
        console.error('Error deleting URL:', error.message);
        throw error;
    }
};


module.exports = {
    isValidUrl,
    generateShortUrl,
    getUrlByShortUrl,
    getAllUrls,
    updateUrlById,
    deleteUrlById,
}