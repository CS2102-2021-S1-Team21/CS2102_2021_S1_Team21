const { Pool, types } = require('pg');
require('dotenv').config();
// to be included inside .gitignore once everyone has set up
// TODO: use environment variables
// const pool = new Pool({
//   user: 'postgres',
//   password: ' ',
//   host: 'localhost',
//   port: 5432,
//   database: 'cs2102',
// });

const devConfig = {
  user: 'postgres',
  password: ' ',
  host: 'localhost',
  port: 5432,
  database: 'cs2102',
};

const proConfig = {
  connectionString: process.env.DATABASE_URL, // heroku addons
};

const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig);

// For some reason, allowing node-postgres to parse this caused the value to be returned in UTC time
types.setTypeParser(types.builtins.DATE, (val) => new Date(val));

module.exports = pool;
