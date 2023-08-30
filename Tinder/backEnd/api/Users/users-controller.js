const { CRUD } = require("../CRUD");

class Users extends CRUD {
	constructor() {
		super("users");
	}

	async getUsers() {
		console.log(1);
	}
}
module.exports = {
	Users,
};
