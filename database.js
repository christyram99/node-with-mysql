const mysql = require('mysql2/promise');
const bluebird = require('bluebird');
const config = require('./config/app')

const pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  connectionLimit: 10,
  supportBigNumbers: true,
  Promise: bluebird,
});

module.exports = pool