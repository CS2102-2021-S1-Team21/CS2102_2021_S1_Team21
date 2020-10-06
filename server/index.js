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
    credentials: true,
    // TODO: replace with actual heroku domain
    origin: /https?:\/\/(localhost:[0-9]{1,5})|(example-domain.herokuapp.com)/,
    exposedHeaders: ['Set-Cookie'],
  }),
);

// -------------------- Authentication --------------------
auth.init(app); // TODO: change to use() pattern

const sessionConfig = {
  secret: 'simulator simulator', // process.env.SECRET, // TODO: add 'dotenv' and ENV variables
  resave: false, // TODO: figure out if this needs to be true
  saveUninitialized: true, // to allow tracking of repeat visitors
  cookie: {
    httpOnly: false, // allow browser JavaScript to access the cookie
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
  // TODO: how does session store work? what's a MemoryStore?
};
if (app.get('env') === 'production') {
  sessionConfig.cookie.secure = true; // only use cookie over HTTPS
}
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

// -------------------- Routing --------------------
app.use('/api', routes); // prepend all routes with '/api'

// Generic Error Handling
// Note: 4th parameter `next` is required for error-handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: 'An unexpected error occurred' });
});

// -------------------- Server --------------------
app.listen(8000, () => {
  console.log('Server is listening on port 8000!');
});
