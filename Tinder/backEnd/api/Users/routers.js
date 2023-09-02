const express = require("express");
const { Users } = require("./controller");
const usersCrudControler = new Users("users");
const router = express.Router();

router.post(
	"/getUsers",
	usersCrudControler.getAllUsers.bind(usersCrudControler),
);

module.exports = router;
