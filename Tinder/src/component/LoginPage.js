import React from "react";
import { View, Alert, Text, TouchableOpacity, StyleSheet } from "react-native";
import Form from "./Form";

import { API_URL } from "@env";
import FetchRequest from "./FetchRequest";

export default function Login(props) {
	const input = [
		{ key: "Login", name: "name", placeholder: "Full Name" },
		{ key: "Login", name: "password", placeholder: "Password" },
	];

	const signIn = async (user) => {
		if (user.name.length === 0 && user.password.length === 0) {
			Alert.alert("Name And Password are empty");
		} else if (user.name.length === 0) {
			Alert.alert("Name is empty");
		} else if (user.password.length === 0) {
			Alert.alert("Password is empty");
		} else {

			try {
				user.name = user.name.toLowerCase();
				const sentences = user.name.split(" ");

				for (let i = 0; i < sentences.length; i++) {
					if (sentences[i]) {
						sentences[i] =
							sentences[i][0].toUpperCase() + sentences[i].substring(1);
					}
				}
				user.name = sentences.join(" ").trim();
				user.password = user.password.trim();
				const requst = {
					url: `${API_URL}/users/login`,
					body: JSON.stringify(user),
					ContentType: "application/json; charset=UTF-8",
				};
				await FetchRequest(requst).then((data) => {
					props.logIn(data);
				});
			} catch (err) {
				Alert.alert(err);
			}
		}
	};

	return (
		<View
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
				backgroundColor: "#a2e2e2",
			}}
		>
			<View style={styles.container}>
				<Text style={styles.titleText}>Tinder For Friends</Text>
				<Text>(If you have a friend on Tinder it's weird )</Text>
			</View>
			<Form input={input} submit={signIn} valueSignUp={props.valueSignUp} />
			<TouchableOpacity onPress={props.valueSignUp}>
				<Text
					style={{
						textAlign: "center",
						marginTop: 21,
						borderBottomWidth: 1,
					}}
				>
					Don't Have an account?
				</Text>
			</TouchableOpacity>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 20,
	},
	titleText: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#fe3c72",
		textTransform: "uppercase",
		letterSpacing: 1,
	},
});
