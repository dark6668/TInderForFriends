const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const createDatabaseConnection = require("../../db-connection");

async function SignUp(req, res) {
	const { originalname, buffer } = req.file;

	const { name, password, birthYear, instagram } = req.body;

	const filePath = path.join(__dirname, "uploads", originalname);

	const db = await createDatabaseConnection();
	const user = {
		full_name: name,
		password: password,
		birthYear: birthYear,
		profile_image: filePath,
		instagram: instagram,
	};
	console.log(user.password);
	bcrypt.hash(password, 10, async (err, hashPassword) => {
		if (err) {
			console.error("Error hashing password:", err);
			return;
		}
		const INSERT_QUERY = `INSERT INTO users (full_name, password, birthYear, profile_image, instagram) VALUES ('${user.full_name}','${hashPassword}','${user.birthYear}', '${user.profile_image}', '${user.instagram}')`;

		const db = await createDatabaseConnection();
		db.query(INSERT_QUERY, (err, result) => {
			if (err) {
				console.log(err);
			} else {
				if (!fs.existsSync(filePath)) {
					fs.writeFileSync(filePath, buffer);
					console.log("File saved successfully");
				} else {
					console.log("File already exists");
				}

				const fileStream = fs.createReadStream(filePath);
				fileStream.pipe(res);

				res.status(200).send({ goog: "good" });
			}
		});
	});
	//

	//  res.status(200).send({ image: base64Image });
	// });

	// })
	//

	// way to send buffer to react native
	// const imageBuffer = fs.readFileSync(imagePath);

	// const base64Image = imageBuffer.toString('base64');
	// res.status(200).send({ buffer: base64Image });
}
module.exports = { SignUp };
// const uri = req.body.user.data._parts[0][1]
