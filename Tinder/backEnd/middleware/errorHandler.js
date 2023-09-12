async function err(req, res, err) {
	console.log(err);

	res.status(500).send("Somthing went wrong");
}
module.exports = err;
