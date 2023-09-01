const { CRUD } = require("../CRUD");

class Users extends CRUD {
	constructor() {
		super("users");
	}
}
module.exports = {
	Users,
};
