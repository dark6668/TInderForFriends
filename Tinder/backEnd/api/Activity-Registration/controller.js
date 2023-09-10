const { CRUD } = require("../CRUD");
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
	async getYourActivity(req, res, errHandler) {
		try {
			const { id } = req.body;
			// TODO: extract from DB

			const column = [
				"activities.activity",
				"activities.date",
				"activities.location",
				"activity_registration.id as registration_id ",
				"users.full_name as event_organizer",
				"users.instagram",
			];

			const ON = `activities ON activities.event_organizer = activity_registration.event_organizer_Id INNER JOIN
		users
		ON
		users.id = activity_registration.event_organizer_Id WHERE activity_registration.user_id = ${id};`;
			super
				.usingJOIN(column, ON)
				.then(async (result) => {
					res.status(200).send(result);
				})
				.catch((err) => {
					errHandler(err);
				});
		} catch (err) {
			errHandler(err);
		}
	}
}
module.exports = { ActivitiesRegistration };
