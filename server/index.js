const express = require('express');
const routes = require('./routes');

const app = express();

// Middleware

app.use('/api', routes); // prepend all routes with '/api'

// TODO: error handling for other routes

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});
