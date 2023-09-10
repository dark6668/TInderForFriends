const express = require("express");
const { ActivitiesRegistration } = require("./controller");
const activitiesRegistrationCrudControler = new ActivitiesRegistration(
	"activity_registration",
);

const router = express.Router();

router.post(
	"/registration",
	activitiesRegistrationCrudControler.registrationforEvent.bind(
		activitiesRegistrationCrudControler,
	),
);

router.post(
	"/yourActivity",
	activitiesRegistrationCrudControler.getYourActivity.bind(
		activitiesRegistrationCrudControler,
	),
);
module.exports = router;
