import { API_URL } from "@env";

import React from "react";

import Navigation from "./src/component/Navigation";

export default function App() {
	const [usersData, setUsersData] = React.useState([]);
	const [showSwiper, setShowSwiper] = React.useState(true);
	const [user, setUser] = React.useState([]);

	const getUsersData = async () => {
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
						`Network request failed or received 
						an unexpected response`,
					);
				}
				response.json().then((result) => {
					data = result.map((item) => {
						return {
							PersonID: item.id,
							fullName: item.full_name,
							age: item.age,
							ProfileImage: item.profile_image,
							instagram: item.instagram,
							activity: "play basketball",
						};
					});

					setUsersData(data);
				});
			});
		} catch (Err) {
			console.log(Err);
		}
	};

	const closeSwiper = () => {
		setShowSwiper(false);
	};

	const LogIn = (userInfo) => {
		setUser(userInfo);
		if (userInfo.length !== 0) {
			getUsersData();
		}
	};

	return (
		<Navigation
			user={user}
			LogIn={LogIn}
			usersData={usersData}
			closeSwiper={closeSwiper}
			showSwiper={showSwiper}
		/>
	);
}
