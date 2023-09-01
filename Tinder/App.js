import React, { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { API_URL } from "@env";

import MainSwiper from "./src/component/Swiper";
import BottomMenu from "./src/component/BottomMenu";

export default function App() {
	useEffect(() => {
		getUserData();
	}, []);
	const [userData, setUserData] = React.useState([]);
	const [showSwiper, setShowSwiper] = React.useState(true);

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
						`Network request failed or received 
						an unexpected response`,
					);
				}
				response.json().then((result) => {
					data = result.map((item) => {
						return {
							PersonID: item.PersonID,
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

	const closeSwiper = () => {
		setShowSwiper(false);
	};
	return (
		<SafeAreaView>
			<View style={styles.body}>
				{userData.length > 0 && showSwiper ? (
					<MainSwiper userData={userData} closeSwiper={closeSwiper} />
				) : (
					<View
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "100%",
						}}
					>
						<Text style={{ fontSize: 24 }}>Nothing To See</Text>
					</View>
				)}
			</View>

			<BottomMenu />
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	body: {
		backgroundColor: "#4fd0e9",
	},
});
