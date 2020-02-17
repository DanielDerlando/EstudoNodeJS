const path = require('path');

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
// get health of application
exports.getTranslated = (req, res) => {
  console.log('In controller - getTranslated');
  languageTranslator.translate({
    text: req.query.text,
    modelId: req.query.modelId,
  }).then(translationResult => {
    console.log(JSON.stringify(translationResult, null, 2));
    res.render('translate', {result: translationResult,
      text: req.query.text,
      modelId: req.query.modelId});
  }).catch(err => {
    console.log('error:', err);
    res.sendFile(path.join(__dirname, '../public', '500.html'));
  });
};
