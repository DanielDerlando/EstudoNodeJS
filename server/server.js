// import dependencies and initialize express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

const healthRoutes = require('./routes/health-route');
const swaggerRoutes = require('./routes/swagger-route');
const translatorRoutes = require('./routes/translator-route');

const app = express();

// Config
// Template Engine
app.engine('handlebars', handlebars({dafaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// enable parsing of http request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// access to static files
app.use(express.static(path.join('views')));

// routes and api calls
app.use('/health', healthRoutes);
app.use('/swagger', swaggerRoutes);
app.use('/translator', translatorRoutes);

// default path to serve up index.html (single page application)
// app.all('', (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, '../public', 'index.html'));
// });

// start node server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App UI available http://localhost:${port}`);
  console.log(`Swagger UI available http://localhost:${port}/swagger/api-docs`);
});


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/translator', function(req, res){
  res.render('translate');
});


// error handler for unmatched routes or api calls
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

module.exports = app;
