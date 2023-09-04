import { API_URL } from "@env";

import React, { useEffect } from "react";

import Navigation from "./src/component/Navigation";

export default function App() {
	const [usersData, setUsersData] = React.useState([]);
	const [showSwiper, setShowSwiper] = React.useState(true);
	const [user, setUser] = React.useState([]);

	const getAllActivity = async (id) => {
		try {
			await fetch(`${API_URL}/activity/getAllActivity`, {
				method: "POST",
				body: JSON.stringify({ id: id }),
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
							id: item.id,
							activity: item.activity,
							fullName: item.full_name,
							date: item.date,
							ProfileImage: item.profile_image,
							instagram: item.instagram,
							location: item.location,
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

	const logIn = (user) => {
		setUser(user);

		setShowSwiper(true);
		getAllActivity(user.id);
	};

	const logOut = () => {
		setUser([]);
		setUsersData([]);
		setShowSwiper(false);
	};

	return (
		<Navigation
			user={user}
			logIn={logIn}
			logOut={logOut}
			usersData={usersData}
			closeSwiper={closeSwiper}
			showSwiper={showSwiper}
		/>
	);
}
