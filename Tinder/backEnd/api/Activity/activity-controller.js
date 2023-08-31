const { CRUD } = require("../CRUD");
class Activities extends CRUD {
	constructor() {
		super("activities");
	}

	async addActivity(req, res) {
		const column = [
			"Activity",
			"ActivityDate",
			"ActivityLocation",
			"ResponsiblePersonID",
		];
		const VALUES = ["'play Games'", "'2002-08-10'", "'Aviv'", 1];
		super.addToTables(column, VALUES).then((result) => {
			console.log(result);
			if (result) {
				res.status(200).send(result);
			}
		});
	}
}
module.exports = { Activities };
