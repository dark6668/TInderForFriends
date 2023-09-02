import React from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { API_URL } from "@env";

export default function Login(props) {
	const [user, setUser] = React.useState({ name: "", password: "" });

	const inputValue = (fieldName, text) => {
		setUser((prevUser) => {
			return {
				...prevUser,
				[fieldName]: text,
			};
		});
	};

	const signIn = async () => {
		if (user.name.length === 0 && user.password.length === 0) {
			Alert.alert("Name And Password are empty");
		} else if (user.name.length === 0) {
			Alert.alert("Name is empty");
		} else if (user.password.length === 0) {
			Alert.alert("Password is empty");
		} else {
			try {
				await fetch(`${API_URL}/login/login`, {
					method: "POST",
					body: JSON.stringify({ user }),
					headers: {
						"Content-Type": "application/json; charset=UTF-8",
						// 'Authorization': `Bearer ${ await AsyncStorage.getItem()} `
					},
				})

				.then((result) => {
					if (result.status !== 200) {
						Alert.alert("unauthorized");
					} else {
						result.json().then(async (user) => {
							props.LogIn(user);
						});
					}
				});
			} catch (err) {
				console.log(err);
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
			}}
		>
			<TextInput
				onChangeText={(text) => inputValue("name", text)}
				name="name"
				style={{ height: 40, borderWidth: 1, width: 200 }}
				placeholder="name"
			/>
			<TextInput
				onChangeText={(text) => inputValue("password", text)}
				name="password"
				style={{ height: 40, borderWidth: 1, width: 200 }}
				placeholder="password"
			/>
			<Button title="Sign In" onPress={signIn} />
		</View>
	);
}
