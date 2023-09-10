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

			// TODO: extract from DB

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
			activity_registration ON users.id = activities.event_organizer
			LEFT JOIN
			activity_registration ON activities.id = activity_registration.active_id
			WHERE
			(activity_registration.active_id IS NULL
				OR (activity_registration.active_id IS NOT NULL AND activity_registration.status IS NULL  ))
				AND users.id != ${id};`;

			super
				.usingJOIN(column, ON)
				.then(async (result) => {
					const filteredResult = result.filter((item) => item.userId !== id);

					const newResult = await Promise.all(
						filteredResult.map(async (item) => {
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
