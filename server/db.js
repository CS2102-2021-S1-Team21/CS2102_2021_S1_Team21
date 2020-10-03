const { Pool } = require('pg');
const fs = require('fs');

// to be included inside .gitignore once everyone has set up
// TODO: use environment variables
const pool = new Pool({
  user: 'postgres',
  password: ' ',
  host: 'localhost',
  port: 5432,
  database: 'cs2102',
});

module.exports = pool;
