const { CRUD } = require("../CRUD");
const createDatabaseConnection = require("../../db-connection");
class ActivitiesRegistration extends CRUD {
	constructor() {
		super("activity_registration");
	}

	async registrationforEvent(req, res, errHandler) {
		try {
			const { userId, activityId, organizerId, swipe } = req.body.register;

			let status = 1;
			if (swipe === "Left") {
				status = 0;
			}
			const column = ["user_id", "active_id", "event_organizer_Id", "status"];
			const values = [userId, activityId, organizerId, status];

			super.addToTables(column, values).then((result) => {
				res.status(200).send(result);
			});
		} catch (err) {
			errHandler(err);
		}
	}
}
module.exports = { ActivitiesRegistration };
