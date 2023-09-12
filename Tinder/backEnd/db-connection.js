const mysql = require("mysql2");
require("dotenv").config();

function createDatabaseConnection() {
	return new Promise((resolve, reject) => {
		const db = mysql.createConnection({
			host: process.env.DATABASE_HOST,
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
		});

		db.connect((err) => {
			if (err) {
				reject(err);
			} else {
				resolve(db);
			}
		});
	});
}

module.exports = createDatabaseConnection;
