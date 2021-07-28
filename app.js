// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const app = express();
const session = require('express-session');

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      // cookie: { secure: true },
    })
  );
  app.use((req, res, next) => {
    console.log(req.session);
    next();
  });
  
// default value for title local
const projectName = 'lab-express-basic-auth';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const index = require('./routes/index');
const signup = require('./routes/signup');
const signin = require('./routes/signin');
const main = require('./routes/main');

app.use('/', index);
app.use('/signup', signup);
app.use('/signin', signin);

app.use('/main', main);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;

