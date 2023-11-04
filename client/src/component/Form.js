import React from "react";
import {
	TextInput,
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Form(props) {
	const [showPassword, setShowPassword] = React.useState(false);

	const [valueNewUser, setValueNewUser] = React.useState(
		props.input.reduce((prevValue, value) => {
			prevValue[value.name] = "";
			return prevValue;
		}, {}),
	);
	const changeuserValue = (fieldName, text) => {
		setValueNewUser((prevUser) => {
			return {
				...prevUser,
				[fieldName]: text,
			};
		});
	};

	const toggleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<View>
			{props.input.map((item) => (
				<View key={item.name}>
					<TextInput
						onChangeText={(text) => changeuserValue(item.name, text)}
						secureTextEntry={item.name === "password" && !showPassword}
						name={item.name}
						style={styles.textInput}
						placeholder={item.placeholder}
					/>

					{item.name === "password" && (
						<MaterialCommunityIcons
							name={showPassword ? "eye-off" : "eye"}
							size={26}
							color="#000"
							onPress={toggleShowPassword}
							style={{ position: "absolute", right: 170, top: 13 }}
						/>
					)}
				</View>
			))}

			<View>
				<TouchableOpacity
					onPress={() => {
						props.submit(valueNewUser);
					}}
					style={styles.button}
				>
					<Text style={{ color: "white" }}>{props.input[0].key}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	button: {
		marginTop: 10,
		backgroundColor: "#fe3c72",
		padding: 10,
		alignItems: "center",
	},
	textInput: {
		height: 50,
		borderWidth: 1,
		width: 200,
		padding: 5,
		marginBottom: 20,
	},
});
