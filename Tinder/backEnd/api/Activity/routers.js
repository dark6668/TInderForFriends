const express = require("express");
const { Activities } = require("./controller");
const activitiesCrudControler = new Activities("activities");

const router = express.Router();

router.post(
	"/addActivity",
	activitiesCrudControler.addActivity.bind(activitiesCrudControler),
);
router.post(
	"/getAllActivity",
	activitiesCrudControler.getAllActivity.bind(activitiesCrudControler),
);

module.exports = router;
