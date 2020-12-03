const mysql = require('mysql');
const logSymbols = require('log-symbols');

const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,

    // Config local
    host: process.env.INSTANCE_CONNECTION_NAME,
    port: 8889,
};

if (
    process.env.INSTANCE_CONNECTION_NAME &&
    process.env.NODE_ENV === 'production'
) {
    config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}

// local mysql db connection
const connection = mysql.createConnection(config);

connection.connect(function (err) {
    if (!err) {
        console.log(logSymbols.success, '\x1b[32m', 'Database is connected');
    } else {
        console.log(logSymbols.error, '\x1b[31m', 'Error connecting database');
        throw err;
    }
});

module.exports = connection;