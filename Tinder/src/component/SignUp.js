import React, { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
	Text,
	View,
	TextInput,
	Button,
	Image,
	PermissionsAndroid,
	StyleSheet,
	TouchableOpacity,
	Alert,
} from "react-native";
import { API_URL } from "@env";

import * as ImagePicker from "expo-image-picker";

export default function SignUp(props) {
	const [image, setImage] = React.useState(null);
	const [fullImage, setFullImage] = React.useState(null);
	const [showPassword, setShowPassword] = React.useState(false);
	const [user, setUser] = React.useState({
		name: "",
		password: "",
		birthYear: "",
		instagram: "",
	});

	const inputValue = (fieldName, text) => {
		setUser((prevUser) => {
			return {
				...prevUser,
				[fieldName]: text,
			};
		});
	};

	const uploadeImg = async () => {
		const permissionCamera = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.CAMERA,
		);
		const permissionGallery = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
		);
		console.log(permissionCamera);
		const options = {
			title: "Select Image",
			type: "library",
			options: {
				maxHeight: 200,
				maxWidth: 200,
				selectionLimit: 1,
				mediaType: "photo",
				includeBase64: false,
			},
		};
		const result = await ImagePicker.launchImageLibraryAsync({ options });

		if (!result.canceled) {
			setFullImage(result.assets[0].uri);
			setImage(result.assets[0].uri);
		}
	};

	const toggleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	const signUp = async () => {
		try {
			if (
				user.name.length === 0 ||
				user.password.length === 0 ||
				user.birthYear.length === 0 ||
				user.instagram.length === 0 ||
				fullImage === null
			) {
				Alert.alert("All fields must be filled");
			} else {
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
				const data = new FormData();
				data.append("name", user.name);
				data.append("password", user.password);
				data.append("birthYear", user.birthYear);
				data.append("instagram", user.instagram);
				data.append("my_photo", {
					uri: fullImage,
					name: user.instagram,
					type: "image/jpg",
				});

				await fetch(`${API_URL}/signUp/signUp`, {
					method: "POST",
					body: data,
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}).then((result) => {
					if (result.status !== 200) {
					} else {
						result.json().then((data) => {
							props.valueSignUp();
						});
					}
				});
			}
		} catch (err) {
			console.log(err);
		}
	};
	const textFilde = [
		{ name: "name", placeholder: "Full Name" },
		{ name: "password", placeholder: "Password" },
		{ name: "birthYear", placeholder: "BirthYear" },
		{ name: "instagram", placeholder: "Instagram" },
	];
	return (
		<View
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
				backgroundColor: "red",
			}}
		>
			<TouchableOpacity onPress={uploadeImg}>
				<View style={styles.containerIMG}>
					{!image ? (
						<Text>+</Text>
					) : (
						<Image source={{ uri: image }} style={styles.img} />
					)}
				</View>
			</TouchableOpacity>
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
			<TouchableOpacity onPress={signUp} style={styles.button}>
				<Text style={{ color: "white" }}>Sign Up</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={props.valueSignUp}>
				<Text style={{ marginTop: 21, borderBottomWidth: 1 }}>Sign In</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	containerIMG: {
		borderWidth: 1,
		borderRadius: 50,
		width: 100,
		height: 100,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	img: {
		borderWidth: 1,
		borderRadius: 50,
		width: 100,
		height: 100,
	},
	button: {
		marginTop: 10,
		backgroundColor: "#32a897",
		padding: 10,
	},
});
