const Url = require('../models/urlModel');

const checkExpiration = async (req, res, next) => {
    //extract the shortUrl from the request parameters
    const { shortUrl } = req.params;
    try {
        //find the URL in the database using the shortUrl
        const url = await Url.findOne({ where: { shortUrl } });

        //if the URL is not found, return a 404 error
        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }

        //check if the URL has expired
        const currentTime = new Date();
        if (url.expiresAt < currentTime) {
            return res.status(410).json({ message: 'URL has expired' });
        }

        next();
    } catch (error) {
        console.error('Error checking URL expiration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}

module.exports = checkExpiration;