const express = require("express");
const { Users } = require("./controller");
const usersCrudControler = new Users("users");
const router = express.Router();

router.post(
	"/getUsers",
	usersCrudControler.getAllUsers.bind(usersCrudControler),
);
router.post(
	"/updateUser",
	usersCrudControler.updateUser.bind(usersCrudControler),
);
router.post(
	"/getUser",
	usersCrudControler.getUserById.bind(usersCrudControler),
);
router.post("/login", usersCrudControler.login.bind(usersCrudControler));

router.post("/signUp", usersCrudControler.signUp.bind(usersCrudControler));

module.exports = router;
