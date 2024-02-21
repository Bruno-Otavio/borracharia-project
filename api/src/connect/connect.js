const mysql = require("mysql");

const connection = mysql.createConnection({
    user: "root",
    host: "localhost",
    database: "borracharia"
});

module.exports = connection;
