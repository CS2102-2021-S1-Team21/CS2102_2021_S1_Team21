const Pool = require('pg').Pool;

// to be included inside .gitignore once everyone has set up
const pool = new Pool({
    user: "postgres",
    password: " ",
    host: "localhost",
    port: 5432,
    database: "cs2102"
})

module.exports = pool;