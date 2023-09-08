const { CRUD } = require("../CRUD");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

class Users extends CRUD {
	constructor() {
		super("users");
	}
	async getAllUsers(req, res, errHandler) {
		try {
			super.getAllData().then((result) => {
				res.status(200).send(result);
			});
		} catch (err) {
			errHandler(err);
		}
	}

	async updateUser(req, res, errHandler) {
		try {
			if (req.file !== undefined) {
				const { originalname, buffer } = req.file;
				const { id } = req.body;
				super.getItemByID("profile_image ", id).then((result) => {
					console.log(result[0].profile_image);
					fs.writeFileSync(result[0].profile_image, buffer);

					res.status(200).send(true);
				});
			} else {
				let { id, key, value } = req.body.change;

				if (key === "password") {
					value = bcrypt.hashSync(value, 10);
				}
				super.updateItem(id, key, value).then((result) => {
					res.status(200).send(true);
				});
			}
		} catch (err) {
			errHandler(err);
		}
	}

	async getUserById(req, res, errHandler) {
		try {
			const { id } = req.body;
			const column = [
				"id",
				"full_name",
				"birthYear",
				"profile_image",
				"instagram",
			];
			super.getItemByID(column, id).then((result) => {
				super.readFileLocal(result[0].profile_image).then((img) => {
					result[0].profile_image = img;
					res.status(200).send(result[0]);
				});
			});
		} catch (err) {
			errHandler(err);
		}
	}

	async login(req, res, errHandler) {
		try {
			const { name, password } = req.body;

			super.getAllData().then((result) => {
				const isUserInSystem = result.find((item) => {
					return (
						item.full_name === name &&
						bcrypt.compareSync(password, item.password)
					);
				});
				if (isUserInSystem !== undefined) {
					super.readFileLocal(isUserInSystem.profile_image).then((result) => {
						isUserInSystem.profile_image = result;
						res.status(200).send(isUserInSystem);
					});
				} else {
					res.status(401).send("unauthorized");
				}
			});
		} catch (err) {
			errHandler(err);
		}
	}

	async signUp(req, res, errHandler) {
		try {
			const { buffer } = req.file;

			const { name, password, birthYear, instagram } = req.body;

			const filePath = path.join(__dirname, "user-img", instagram);

			const hashPassword = bcrypt.hashSync(password, 10);
			const value = [
				`'${name}','${hashPassword}',${birthYear},'${filePath}','${instagram}'`,
			];
			const column = [
				"full_name",
				"password",
				"birthYear",
				"profile_image",
				"instagram",
			];
			super.addToTables(column, value).then(() => {
				fs.writeFileSync(filePath, buffer);

				res.status(200).send({ goog: "good" });
			});
		} catch (err) {
			console.log(1);
			errHandler(err);
		}
	}
}

module.exports = {
	Users,
};
