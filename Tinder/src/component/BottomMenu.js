import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function BottomMenu() {
	const navigation = () => {
		useNavigation.navigate("/home/david/repos/project/Tinder/App.js");
	};
	return (
		<View style={styles.containerButtom}>
			<MaterialCommunityIcons
				name="account"
				size={80}
				marginTop={-3}
				color="gray"
				onPress={() => console.log("User icon pressed")}
			/>
			<MaterialCommunityIcons
				name="calendar-clock"
				size={80}
				marginTop={-3}
				color="gray"
				onPress={navigation}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	containerButtom: {
		borderWidth: 1,
		marginTop: "190%",
		backgroundColor: "#4fd0e9",

		width: 385,
		position: "absolute",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		height: 120,
	},
});
