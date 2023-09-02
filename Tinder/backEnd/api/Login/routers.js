const express = require("express");
const { Login } = require("./controller");
const loginCrudControler = new Login("users");

const router = express.Router();

router.post("/login", loginCrudControler.Login.bind(loginCrudControler));

module.exports = router;
