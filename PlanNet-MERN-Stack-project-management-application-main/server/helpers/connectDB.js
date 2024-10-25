
require('dotenv').config();
const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASENAME
});


module.exports = mysqlConnection