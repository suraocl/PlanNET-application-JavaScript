const mysqlConnection = require("../helpers/connectDB");

async function executeQuery(sql, values) {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(sql, values, (error, results, fields) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = executeQuery;