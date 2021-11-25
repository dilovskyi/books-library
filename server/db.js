const Pool = require("pg-pool");
const pool = new Pool({
  user: "postgres",
  password: "Dudesweet2705martin",
  host: "localhost",
  port: "5432",
  database: "books-lib",
});

module.exports = pool;
