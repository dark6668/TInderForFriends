import React from "react";
import {
	View,
	TextInput,
	Alert,
	Text,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { API_URL } from "@env";

export default function Login(props) {
	const [user, setUser] = React.useState({ name: "", password: "" });
	const [showPassword, setShowPassword] = React.useState(false);

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
							props.logIn(user);
						});
					}
				});
			} catch (err) {
				console.log(err);
			}
		}
	};
	const toggleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};
	const textFilde = [
		{ name: "name", placeholder: "Full Name" },
		{ name: "password", placeholder: "Password" },
	];
	return (
		<View
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
				backgroundColor: "#33FFA4",
			}}
		>
			<View style={styles.container}>
				<Text style={styles.titleText}>Tinder For Friends</Text>
				<Text>(If you have a friend on Tinder it's weird )</Text>
			</View>
			{textFilde.map((item) => (
				<View key={item.name}>
					<TextInput
						onChangeText={(text) => inputValue(item.name, text)}
						secureTextEntry={item.name === "password" && !showPassword}
						name={item.name}
						style={{ height: 40, borderWidth: 1, width: 200 }}
						placeholder={item.placeholder}
					/>
					{item.name === "password" && (
						<MaterialCommunityIcons
							name={showPassword ? "eye-off" : "eye"}
							size={26}
							color="#000"
							onPress={toggleShowPassword}
							style={{ position: "absolute", right: 170, top: 5 }}
						/>
					)}
				</View>
			))}

			<TouchableOpacity onPress={signIn} style={styles.button}>
				<Text style={{ color: "white" }}>Sign In</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={props.valueSignUp}>
				<Text style={{ marginTop: 21, borderBottomWidth: 1 }}>
					Don't Have an account?
				</Text>
			</TouchableOpacity>
		</View>
	);
}
const styles = StyleSheet.create({
	button: {
		marginTop: 10,
		backgroundColor: "#32a897",
		padding: 10,
	},
	container: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 20,
	},
	titleText: {
		fontSize: 28,
		fontWeight: "bold",
		color: "pink",
		textTransform: "uppercase",
		letterSpacing: 1,
	},
});
