export default function FetchRequest(requst) {
	return new Promise((resolve, reject) => {
		fetch(requst.url, {
			method: "POST",
			body: requst.body,
			headers: {
				"Content-Type": requst.ContentType,
			},
		}).then((response) => {
			if (response.status !== 200) {
				reject("Unauthorized");
			} else {
				response
					.json()
					.then((responseData) => {
						resolve(responseData);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		});
	});
}
