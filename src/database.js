const mysql = require('promise-mysql');

// Environment variables
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

function getConnection() {
    return connection;
}

module.exports = { getConnection }