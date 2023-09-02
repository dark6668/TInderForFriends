const { CRUD } = require("../CRUD");
const bcrypt = require("bcrypt");
const createDatabaseConnection = require("../../db-connection");

class Login extends CRUD {
	constructor() {
		super("users");
	}

	async Login(req, res, errHandler) {
		try {
			const { name, password } = req.body.user;

			// Your password is 123
			super.getAllData().then((result) => {
				const isUserInSystem = result.find((item) => {
					return (
						item.full_name === name &&
						bcrypt.compareSync(password, item.password)
					);
				});
				if (isUserInSystem !== undefined) {
					res.status(200).send(isUserInSystem);
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
