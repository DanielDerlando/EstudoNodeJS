// import dependencies and initialize the express router
const express = require('express');
const TranslatorController = require('../controllers/translator-controller');

const router = express.Router();

// define routes
router.get('/translate', TranslatorController.getTranslated);
router.get('/translated', TranslatorController.getTranslatedAPI);
router.get('/', TranslatorController.getLanguages);

module.exports = router;
