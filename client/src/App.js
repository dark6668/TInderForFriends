import React from "react";

import Navigation from "./component/Navigation";

import FetchRequest from "./component/FetchRequest";

export default function App() {
	const [usersData, setUsersData] = React.useState([]);
	const [showSwiper, setShowSwiper] = React.useState(true);
	const [user, setUser] = React.useState([]);
	const getAllActivity = async (id) => {
		try {
			const requst = {
				url: "/activity/getAllActivity",
				body: JSON.stringify({ id: id }),
				ContentType: "application/json; charset=UTF-8",
			};
			await FetchRequest(requst).then((result) => {
				const data = result.map((item) => {
					return {
						organizerId: item.userId,
						activityId: item.activityId,
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
		} catch (Err) {
			console.log(Err);
		}
	};

	const getUser = async (id) => {
		try {
			const requst = {
				url: "/users/getUser",
				body: JSON.stringify({ id: id }),
				ContentType: "application/json; charset=UTF-8",
			};

			await FetchRequest(requst).then((result) => {
				setUser(result);
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
			getUser={getUser}
			logIn={logIn}
			logOut={logOut}
			usersData={usersData}
			closeSwiper={closeSwiper}
			getAllActivity={getAllActivity}
			showSwiper={showSwiper}
		/>
	);
}
