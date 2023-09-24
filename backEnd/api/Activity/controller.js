const fs = require("fs");
const path = require("path");

const { CRUD } = require("../CRUD");
class Activities extends CRUD {
	constructor() {
		super("activities");
	}

	async getAllActivity(req, res, errHandler) {
		try {
			const { id } = req.body;

			// TODO: extract from DB activities.*
			const column = [
				"activities.id AS activityId",
				"activities.activity",
				"activities.date",
				"activities.location",
				"users.id AS userId",
				"users.full_name",
				"users.profile_image",
				"users.instagram",
			];
			const ON = `
			users ON users.id = activities.event_organizer
		
			WHERE activities.event_organizer != ${id}
			AND activities.id NOT IN (
				SELECT active_id
				FROM activity_registration
				WHERE activity_registration.user_id = ${id}
			);
	
			`;
			super
				.usingJOIN(column, ON)
				.then(async (result) => {
					const newResult = await Promise.all(
						result.map(async (item) => {
							try {
								const data = await fs.promises.readFile(item.profile_image);
								const base64Image = data.toString("base64");
								item.profile_image = base64Image;
								return item;
							} catch (err) {
								console.error(`Error reading file: ${err}`);
								return item;
							}
						}),
					);

					res.status(200).send(newResult);
				})
				.catch((err) => {
					errHandler(err);
				});
		} catch (err) {
			errHandler(err);
		}
	}

	async addActivity(req, res, errHandler) {
		try {
			const { activity, date, location, id, time } = req.body.activityInfo;

			const combinedDateTime = `${date} ${time}`;

			const column = ["activity", "date", "location", "event_organizer"];
			// TODO: extract from DB

			const VALUES = [
				`'${activity}','${combinedDateTime}',"${location}",${id} `,
			];
			super
				.addToTables(column, VALUES)
				.then((result) => {
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
module.exports = { Activities };
