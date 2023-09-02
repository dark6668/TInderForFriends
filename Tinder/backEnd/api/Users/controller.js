const { CRUD } = require("../CRUD");

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
}
module.exports = {
	Users,
};
