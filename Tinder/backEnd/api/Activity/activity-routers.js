const express = require("express");
const { Activities } = require("./activity-controller");
const activitiesCrudControler = new Activities("Activities");

const router = express.Router();

router.post(
	"/addActivity",
	activitiesCrudControler.addActivity.bind(activitiesCrudControler),
);

module.exports = router;
