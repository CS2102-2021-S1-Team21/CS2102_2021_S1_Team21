const { Pool, types } = require('pg');

// to be included inside .gitignore once everyone has set up
// TODO: use environment variables
const pool = new Pool({
  user: 'postgres',
  password: ' ',
  host: 'localhost',
  port: 5432,
  database: 'cs2102',
});

// For some reason, allowing node-postgres to parse this caused the value to be returned in UTC time
types.setTypeParser(types.builtins.DATE, (val) => new Date(val));

module.exports = pool;
