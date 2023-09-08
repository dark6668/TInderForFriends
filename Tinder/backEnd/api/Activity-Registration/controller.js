const { CRUD } = require("../CRUD");
class ActivitiesRegistration extends CRUD {
	constructor() {
		super("activity_registration");
	}

	async registrationforEvent(req, res, errHandler) {
		try {
			const { userId, activityId, organizerId } = req.body.register;

			const column = ["user_id", "active_id", "event_organizer_Id", "status"];
			const values = [userId, activityId, organizerId, 1];
			super.addToTables(column, values).then((result) => {
				res.status(200).send(result);
			});
		} catch (err) {
			errHandler(err);
		}
	}
}
module.exports = { ActivitiesRegistration };
