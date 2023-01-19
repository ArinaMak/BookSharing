const mysql = require('mysql')

function connectingToDB() {
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "libweb",
        password: "AcbD1324_"
    });
    return db;
}

module.exports = {
  connectingToDB
};