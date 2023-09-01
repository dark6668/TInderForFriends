const { CRUD } = require("../CRUD");
class Activities extends CRUD {
	constructor() {
		super("activities");
	}

	async addActivity(req, res, errHandler) {
		try {
			const column = [
				"Activity",
				"ActivityDate",
				"ActivityLocation",
				"ResponsiblePersonID",
			];
			// TODO: extract from DB

			const VALUES = ["'play Games'", "'2002-08-10'", "'Aviv'", 1];
			super.addToTables(column, VALUES).then((result) => {
				console.log(result);
				res.status(200).send(result);
			});
		} catch (err) {
			errHandler(err);
		}
	}
}
module.exports = { Activities };
