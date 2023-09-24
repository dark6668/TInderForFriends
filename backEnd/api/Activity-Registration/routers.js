const express = require("express");
const { ActivitiesRegistration } = require("./controller");
const activitiesRegistrationCrudControler = new ActivitiesRegistration(
	"activity_registration",
);

const router = express.Router();

router.post(
	"/registration",
	activitiesRegistrationCrudControler.registrationForEvent.bind(
		activitiesRegistrationCrudControler,
	),
);

module.exports = router;
