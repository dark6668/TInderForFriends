import React, { useEffect } from "react";
import { View } from "react-native";
import { API_URL } from "@env";

import DeckSwiper from "./src/component/Swiper";

export default function App() {
	const [userData, setUserData] = React.useState([]);
	useEffect(() => {
		getUserData();
	}, []);

	const getUserData = async () => {
		try {
			await fetch(`${API_URL}/users/getUsers`, {
				method: "POST",
				body: JSON.stringify({ id: "id" }),
				headers: {
					"Content-Type": "application/json; charset=UTF-8",
				},
			}).then((response) => {
				if (response.status !== 200) {
					throw new Error(
						"Network request failed or received an unexpected response",
					);
				}
				response.json().then((result) => {
					data = result.map((item) => {
						return {
							fullName: item.FullName,
							age: item.age,
							ProfileImage: item.ProfileImage,
							instagram: item.instagram,
							activity: "play basketball",
						};
					});

					setUserData(data);
				});
			});
		} catch (Err) {
			console.log(Err);
		}
	};
	return (
		<View>{userData.length > 0 && <DeckSwiper userData={userData} />}</View>
	);
}
