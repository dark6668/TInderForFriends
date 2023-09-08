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
			const table1Name = "users";
			const column1 = [
				"users.id  AS userId",
				"users.full_name",
				"users.profile_image",
				"users.instagram",
			];

			const column2 = [
				"activities.id  AS activityId",
				"activities.activity",
				"activities.date",
				"activities.location",
			];

			const bothColumn = [column1, column2];
			const ON = "activities ON activities.event_organizer =users.id";
			super.usingJOIN(table1Name, bothColumn, ON).then(async (result) => {
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
			super.addToTables(column, VALUES).then((result) => {
				res.status(200).send(result);
			});
		} catch (err) {
			errHandler(err);
		}
	}
}
module.exports = { Activities };
