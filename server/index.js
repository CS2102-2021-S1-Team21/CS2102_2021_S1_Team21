const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const passport = require('passport');

const auth = require('./auth');
const routes = require('./routes');

const app = express();

// -------------------- General Setup --------------------
// support parsing of 'application/json' type POST data
app.use(bodyParser.json());
// support parsing of 'application/x-www-form-urlencoded' type data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    // allow CORS for any port on localhost or example-domain.herokuapp.com
    // TODO: replace with actual heroku domain
    origin: /https?:\/\/(localhost:[0-9]{1,5})|(example-domain.herokuapp.com)/,
  }),
);

// -------------------- Authentication --------------------
auth.init(app); // TODO: change to use() pattern
app.use(
  session({
    secret: 'simulator simulator', // process.env.SECRET, // TODO: add 'dotenv' and ENV variables
    resave: false, // TODO: figure out if this needs to be true
    saveUninitialized: true, // to allow tracking of repeat visitors
    cookie: {
      maxAge: 60000,
    },
    // TODO: how does session store work?
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// -------------------- Routing --------------------
app.use('/api', routes); // prepend all routes with '/api'

// Generic Error Handling
app.use((err, req, res) => {
  console.error(err.message);
  res.json({ status: 500, message: 'An unexpected error occurred' });
});

// -------------------- Server --------------------
app.listen(8000, () => {
  console.log('Server is listening on port 8000!');
});
