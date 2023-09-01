const createDatabaseConnection = require("../db-connection");
class CRUD {
	constructor(collectionName) {
		this.collectionName = collectionName;
	}

	async getAllData(req, res, errHandler) {
		try {
			const db = await createDatabaseConnection();

			const SELECT_QUERY = `SELECT * FROM ${this.collectionName}`;
			db.query(SELECT_QUERY, (err, result) => {
				if (err) {
					console.log(err);
				} else {
					res.status(200).send(result);
				}
			});
		} catch (err) {
			errHandler(err);
		}
	}

	async addToTables(res) {
		try {
			const INSERT_QUERY = `INSERT INTO ${this.collectionName} (${column.join(
				", ",
			)}) VALUES (${VALUES.join(", ")})`;
			const db = await createDatabaseConnection();

			db.query(INSERT, (err) => {
				if (err) {
					console.log(err);
					throw new Error(err);
				} else {
					return true;
				}
			});
		} catch (err) {
			console.log(err);
			throw new Error(err);
		}
	}
}

module.exports = {
	CRUD,
};
