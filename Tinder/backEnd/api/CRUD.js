const createDatabaseConnection = require("../db-connection");
class CRUD {
	constructor(collectionName) {
		this.collectionName = collectionName;
	}

	async getAllData(req, res, errHandler) {
		try {
			const db = await createDatabaseConnection();

			const SELECT_QUERY = `SELECT * FROM ${this.collectionName}`;
			const result = await new Promise((resolve, reject) => {
				db.query(SELECT_QUERY, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
			return result;
		} catch (err) {
			throw new Error(err);
		}
	}

	async addToTables(column, VALUES) {
		try {
			const db = await createDatabaseConnection();

			const INSERT_QUERY = `INSERT INTO ${this.collectionName} (${column.join(
				", ",
			)}) VALUES (${VALUES.join(", ")})`;

			db.query(INSERT_QUERY, (err) => {
				if (err) {
					throw new Error(err);
				} else {
					return true;
				}
			});
		} catch (err) {
			throw new Error(err);
		}
	}
}

module.exports = {
	CRUD,
};
