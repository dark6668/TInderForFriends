const { CRUD } = require("../CRUD");
const bcrypt = require("bcrypt");
const createDatabaseConnection = require("../../db-connection");

const fs = require("fs");
const path = require("path");

class Login extends CRUD {
	constructor() {
		super("users");
	}

	async Login(req, res, errHandler) {
		try {
			const { name, password } = req.body.user;

			super.getAllData().then((result) => {
				const isUserInSystem = result.find((item) => {
					return (
						item.full_name === name &&
						bcrypt.compareSync(password, item.password)
					);
				});

				if (isUserInSystem !== undefined) {
					fs.readFile(isUserInSystem.profile_image, (err, data) => {
						if (err) {
							console.error(`Error reading file: ${err}`);
							return;
						}
						const base64Image = data.toString("base64");
						isUserInSystem.profile_image = base64Image;
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
}
module.exports = { Login };
