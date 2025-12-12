const mysql = require('mysql2');


const pool = mysql.createPool({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12811684',           
  password: 'FDA2ZXcuST',           
  database: 'sql12811684',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


const promisePool = pool.promise();

module.exports = promisePool;
