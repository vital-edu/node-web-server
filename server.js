const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'dev';
const maintenance = process.env.MAINTENANCE || false;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

if (env === 'dev') {
  app.use((req, res, next) => {
    var date = new Date().toString();
    var log = `${date}: ${req.method} ${req.url}`

    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
      if (error) {
        console.log('Unable to write in server.log.');
        console.log('Error: ' + error);
      }
    });
    next();
  });
};

if (maintenance) {
  app.use((req, res, next) => {
    res.render('maintenance.hbs');
  });
}

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.get('/', (req ,res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website.',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad request',
  });
});

app.listen(port, () => {
  if (env === 'dev') console.log(`Server is up on port ${port}`);
});

module.exports.app = app;