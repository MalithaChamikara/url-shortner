const express = require('express');
const router = express.Router();
const urlController = require('./urlController');
const limiter = require('../../middlewares/rateLimit'); 

//Routes

// POST /api/urls/shortenUrl
router.post('/shortenUrl',limiter, urlController.handleShortenUrl);

// GET /api/urls/:shortUrl
router.get('/:shortUrl', urlController.handleRedirect);

// GET /api/urls
router.get('/', urlController.getAllUrlsHandler);

// PUT /api/urls/:id
router.put('/:id', urlController.updateUrlHandler);

// DELETE /api/urls/:id
router.delete('/:id', urlController.deleteUrlHandler);

module.exports = router;