const mysql = require('mysql2');

// Create connection pool to MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',           // Default XAMPP MySQL user
  password: '',           // Default XAMPP MySQL password (empty)
  database: 'habitflow',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export promise-based pool
const promisePool = pool.promise();

module.exports = promisePool;
