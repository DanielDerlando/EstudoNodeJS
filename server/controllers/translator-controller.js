const path = require('path');

let languagesLoaded;

const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { BasicAuthenticator } = require('ibm-watson/auth');
const languageTranslator = new LanguageTranslatorV3({
  version: '2018-05-01',
  authenticator: new BasicAuthenticator({
    username: 'apikey',
    password: 'wxP9vcqaNQWKlIne0Fnjn0_MQwr7nlccbu0sU5u56ruU',
  }),
  url: 'https://api.us-south.language-translator.watson.cloud.ibm.com/' +
  'instances/e5c8ac81-def8-4b52-a306-0904028d8522',
});

// get translated api
var getTranslatedAPI = function(req, res) {
  console.log('In controller - getTranslatedAPI');
  languageTranslator.translate({
    text: req.query.text,
    modelId: req.query.de + '-' + req.query.para,
  }).then(translationResult => {
    res.json({
      text: translationResult.result.translations[0].translation,
    });
  });
};

exports.getTranslatedAPI = getTranslatedAPI;

// get text translated
exports.getTranslated = (req, res) => {
  console.log('In controller - getTranslated');
  languageTranslator.translate({
    text: req.query.text,
    modelId: req.query.de + '-' + req.query.para,
  }).then(translationResult => {
    console.log(JSON.stringify(translationResult, null, 2));
    res.render('translate', {result: translationResult,
      text: req.query.text,
      languages: languagesLoaded,
      de: req.query.de,
      para: req.query.para});
  }).catch(err => {
    console.log('error:', err);
    res.sendFile(path.join(__dirname, '../public', '500.html'));
  });
};


// get all languages for translation
exports.getLanguages = (req, res) => {
  console.log('In controller - getLanguages');
  languageTranslator.listIdentifiableLanguages().then(identifiedLanguages => {
    console.log(JSON.stringify(identifiedLanguages, null, 2));
    languagesLoaded = identifiedLanguages;
    res.render('translate', {languages: languagesLoaded});
  });
};
