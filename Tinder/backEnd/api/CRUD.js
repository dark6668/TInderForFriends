const createDatabaseConnection = require("../db-connection");
const fs = require("fs");
const path = require("path");

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
						reject(err);
					}
					resolve(result);
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
		} catch (err) {
			throw new Error(err);
		}
	}

	async getItemByID(column, id) {
		try {
			const db = await createDatabaseConnection();

			const SELECT_QUERY = `SELECT ${column}
		FROM  ${this.collectionName}
		WHERE id=${id};`;

			return new Promise((resolve, reject) => {
				db.query(SELECT_QUERY, (err, result) => {
					if (err) {
						reject(err);
					}
					resolve(result);
				});
			}).then((result) => {
				return result;
			});
		} catch (err) {
			throw new Error(err);
		}
	}
	async usingJOIN(column, ON) {
		try {
			const SELECT_QUERY = `SELECT ${column} FROM ${this.collectionName} INNER JOIN ${ON} `;
			console.log(SELECT_QUERY);
			const db = await createDatabaseConnection();

			return new Promise((resolve, reject) => {
				db.query(SELECT_QUERY, (err, result) => {
					if (err) {
						reject(err);
					}
					resolve(result);
				});
			}).then((result) => {
				return result;
			});
		} catch (err) {
			throw new Error(err);
		}
	}
	async readFileLocal(path) {
		try {
			return new Promise((resolve, reject) => {
				fs.readFile(path, (err, data) => {
					if (err) {
						reject(err);
					}
					const base64Image = data.toString("base64");
					resolve(base64Image);
				});
			});
		} catch (err) {
			throw new Error(err);
		}
	}

	async updateItem(id, key, value) {
		try {
			const UPDATE_QUERY = `UPDATE ${this.collectionName}
		SET ${key} = '${value}'
		WHERE id =${id}`;

			const db = await createDatabaseConnection();

			return new Promise((resolve, reject) => {
				db.query(UPDATE_QUERY, (err, result) => {
					if (err) {
						reject(err);
					}
					resolve(true);
				});
			}).then((result) => {
				return result;
			});
		} catch (err) {
			throw new Error(err);
		}
	}
}

module.exports = {
	CRUD,
};
