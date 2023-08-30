const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db-connection");
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const loginRoutes = require("./api/Login/login-routers");
const usersRouters = require("./api/Users/users-routers");
app.use("/api/login", loginRoutes);
app.use("/api/users", usersRouters);

app.listen(3000, async () => {
	console.log("in");
});
