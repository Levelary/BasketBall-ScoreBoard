const mysql = require('mysql');
const pool = mysql.createPool({
    'host': 'localhost',
    'user': 'root',
    'password': 'bharath',
    'database': 'scoredb'
})

module.exports = pool();