const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  password: process.env.psqlPassword,
  host: "localhost",
  port: "5432",
  database: "pasaporte",
});

module.exports = pool;
