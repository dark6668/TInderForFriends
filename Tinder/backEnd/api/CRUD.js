const db = require(".././db-connection");
class CRUD {
	constructor(collectionName) {
		this.collectionName = collectionName;
	}

	async getAllData(req, res) {
		try {
			const SELECT = `Select * FROM ${this.collectionName}`;
			db.query(SELECT, (err, result) => {
				if (err) {
					console.log(err);
				} else {
					res.status(200).send(result);
				}
			});
		} catch (err) {
			console.log(err);
			res.status(500).send("Somthing went wrong");
		}
	}

	// Activity            | varchar(100) | YES  |     | NULL    |                |
	// | ActivityDate        | date         | YES  |     | NULL    |                |
	// | ActivityLocation    | varchar(20)  | YES  |     | NULL    |                |
	// | ResponsiblePersonID

	async addToTables(res) {
		try {
			const INSERT = `INSERT INTO ${this.collectionName} (${column.join(
				", ",
			)}) VALUES (${VALUES.join(", ")})`;
			console.log(INSERT);
			db.query(INSERT, (err) => {
				if (err) {
					console.log(err);
					return false;
				} else {
					return true;
				}
			});
		} catch (err) {
			console.log(err);
			res.status(500).send("Somthing went wrong");
		}
	}
}

module.exports = {
	CRUD,
};
