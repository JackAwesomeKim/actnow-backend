const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'actnow',
  port: 3306
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});