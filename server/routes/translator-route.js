// import dependencies and initialize the express router
const express = require('express');
const TranslatorController = require('../controllers/translator-controller');

const router = express.Router();

// define routes
router.get('/translate', TranslatorController.getTranslated);

module.exports = router;
