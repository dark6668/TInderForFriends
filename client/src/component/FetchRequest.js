import { API_URL } from "@env";

export default function FetchRequest(requst) {
	try {
		return new Promise((resolve, reject) => {
			fetch(`${API_URL}${requst.url}`, {
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
	} catch (err) {
		console.log(err);
	}
}
