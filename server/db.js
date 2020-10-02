const { Pool } = require('pg');

// to be included inside .gitignore once everyone has set up
// TODO: use environment variables
const pool = new Pool({
  user: 'postgres',
  password: ' ',
  host: 'localhost',
  port: 8000,
  database: 'cs2102',
});

module.exports = pool;
