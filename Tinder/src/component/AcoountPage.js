import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function AccountPage(props) {
	const settings = [
		{ name: "shield-key", text: "Change Password" },
		{ name: "image-edit", text: "Change Profile Image" },
		{ name: "account-edit", text: "Change User Name" },
		{ name: "logout", text: "Log Out" },
	];

	return (
		<SafeAreaView>
			<View style={{ backgroundColor: "#2196F3" }}>
				<View style={styles.header}>
					<View>
						<Text style={[styles.text, { fontSize: 20 }]}>
							{props.userInfo.full_name}
						</Text>
						<Text style={styles.text}>{props.userInfo.instagram}</Text>
					</View>
					<Image
						source={{ uri: props.userInfo.profile_image }}
						style={styles.Image}
					/>
				</View>
				<View style={styles.containerFriends}>
					<Text style={styles.text}>Your Friends: 0</Text>
				</View>
				<View style={styles.containerSettings}>
					{settings.map((item) => {
						return (
							<TouchableOpacity
								onPress={
									item.name === "logout" ? () => props.LogIn([]) : undefined
								}
								style={styles.containerSettingsItems}
								key={item.name}
							>
								<MaterialCommunityIcons name={item.name} size={26} />
								<Text>{item.text}</Text>
							</TouchableOpacity>
						);
					})}
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header: {
		paddingTop: 30,
		borderWidth: 1,
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		gap: 12,
		alignItems: "center",
		backgroundColor: "black",
	},
	Image: {
		borderWidth: 1,
		borderRadius: 50,
		width: 100,
		height: 100,
	},
	text: {
		color: "white",
	},
	containerFriends: {
		display: "flex",
		alignItems: "center",
		backgroundColor: "gray",
	},
	containerSettings: {
		display: "flex",
		alignItems: "flex-end",
	},
	containerSettingsItems: {
		display: "flex",
		flexDirection: "row-reverse",
		alignItems: "center",
		width: 200,
	},
});
