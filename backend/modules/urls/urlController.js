const urlService = require('./urlService');

// Handle URL shortening
const handleShortenUrl = async (req, res) => {
    //destructuring the request body
    const { originalUrl, alias, expiryDays } = req.body;
    try{
        const url = await urlService.generateShortUrl(originalUrl, alias, expiryDays);
        res.status(201).json({ shortUrl: url.shortUrl });
    }catch (error) {
        console.error('Error shortening URL:', error.message);
        res.status(500).json({ error: 'Error occurred while shortening URL' });
    }
}

// Handle URL redirection
const handleRedirect = async (req, res) => {
    const { shortUrl } = req.params;
    try {
        const url = await urlService.getUrlByShortUrl(shortUrl);
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }
        
        res.redirect(url.originalUrl);
    } catch (error) {
        console.error('Error redirecting URL:', error.message);
        res.status(500).json({ error: 'Error occurred while redirecting URL' });
    }
}

// Handle get All urls
const getAllUrlsHandler = async (req, res) => {
    const { name, date } = req.query;
    try {
        const urls = await urlService.getAllUrls(name, date);
        res.status(200).json(urls);
    } catch (error) {
        console.error('Error fetching URLs:', error.message);
        res.status(500).json({ error: 'Error occurred while fetching URLs' });
    }
}

// Hanlde update url
const updateUrlHandler = async (req, res) => {
    const { id } = req.params;
    const { originalUrl, alias, expiryDays } = req.body;
    try {
        const url = await urlService.updateUrl(id, originalUrl, alias, expiryDays);
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }
        res.status(200).json(url);
    } catch (error) {
        console.error('Error updating URL:', error.message);
        res.status(500).json({ error: 'Error occurred while updating URL' });
    }
}
// Handle delete url
const deleteUrlHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const url = await urlService.deleteUrl(id);
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }
        res.status(200).json({ message: 'URL deleted successfully' });
    } catch (error) {
        console.error('Error deleting URL:', error.message);
        res.status(500).json({ error: 'Error occurred while deleting URL' });
    }
}

module.exports = {
    handleShortenUrl,
    handleRedirect,
    getAllUrlsHandler,
    updateUrlHandler,
    deleteUrlHandler,
}