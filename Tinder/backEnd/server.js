const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const createDatabaseConnection = require("./db-connection");
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({ storage });

const usersRouters = require("./api/Users/routers");
const activityRouters = require("./api/Activity/routers");

const errHandler = require("./middleware/errorHandler");
const activitiesRegistrationRouters = require("./api/Activity-Registration/routers");
app.use("/api/registration", activitiesRegistrationRouters, errHandler);
app.use("/api/users", upload.single("my_photo"), usersRouters, errHandler);
app.use("/api/activity", activityRouters, errHandler);

app.listen(3000, async () => {
	try {
		const db = await createDatabaseConnection();
		console.log("Server started on port 3000 and Connected to the database ");
	} catch (err) {
		console.error("Server cannot start due to database connection failure");
		process.exit(1);
	}
});
