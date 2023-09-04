const createDatabaseConnection = require("../db-connection");
class CRUD {
	constructor(collectionName) {
		this.collectionName = collectionName;
	}

	async getAllData(req, res, errHandler) {
		try {
			const db = await createDatabaseConnection();

			const SELECT_QUERY = `SELECT * FROM ${this.collectionName}`;
			const result = await new Promise((resolve) => {
				db.query(SELECT_QUERY, (err, result) => {
					if (err) {
						throw new Error(err);
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

	async addToTables(column, VALUES, errHandler) {
		const db = await createDatabaseConnection();

		const INSERT_QUERY = `INSERT INTO ${this.collectionName} (${column.join(
			", ",
		)}) VALUES (${VALUES.join(", ")})`;
		return new Promise((resolve, reject) => {
			db.query(INSERT_QUERY, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(true);
				}
			});
		}).then((result) => {
			return true;
		});
	}

	async getItemByID(collectionName, column, id, condition) {
		const db = await createDatabaseConnection();

		const SELECT_QUERY = `SELECT ${column}
	FROM ${collectionName}
	${condition};`;

		return new Promise((resolve, reject) => {
			db.query(SELECT_QUERY, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		}).then((result) => {
			return result;
		});
	}
	async usingJOIN(id, table1Name, bothColumn, ON) {
		const SELECT_QUERY = `SELECT ${bothColumn} FROM ${table1Name} INNER JOIN ${ON} `;
		const db = await createDatabaseConnection();

		return new Promise((resolve, reject) => {
			db.query(SELECT_QUERY, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		}).then((result) => {
			return result;
		});
	}
}

module.exports = {
	CRUD,
};
