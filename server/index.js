const cors = require('cors');
const express = require('express');
const routes = require('./routes');

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    // allow CORS for any port on localhost or example-domain.herokuapp.com
    // TODO: replace with actual heroku domain
    origin: /https?:\/\/(localhost:[0-9]{1,5})|(example-domain.herokuapp.com)/,
  }),
);

// Routing
app.use('/api', routes); // prepend all routes with '/api'

// Generic Error Handling
app.use((err, req, res, next) => {
  // TODO: decide structure of error response
  res.json({ error: 'An unexpected error occurred' });
  next(err);
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000!');
});
