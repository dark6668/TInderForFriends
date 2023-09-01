async function Login(req, res, errHandler) {
	try {
		console.log("Login");
	} catch (err) {
		errHandler(err);
	}
}
module.exports = { Login };
