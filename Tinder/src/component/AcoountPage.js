import { API_URL } from "@env";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
	Alert,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Overlay } from "react-native-elements";
import FetchRequest from "./FetchRequest";
import ImgPicker from "./ImagePicker";

export default function AccountPage(props) {
	const [visible, setVisible] = React.useState(false);
	const [popUpValue, setPopUpValue] = React.useState({
		name: "",
		placeholder: "",
	});
	const [change, setChange] = React.useState({
		id: props.userInfo.id,
		key: "",
		value: "",
	});
	const [image, setImage] = React.useState(null);
	const [fullImage, setFullImage] = React.useState(null);

	const getImg = (fullImage) => {
		setFullImage(fullImage);
	};

	const inputValue = (fieldName, text) => {
		setChange((prevUser) => {
			return {
				...prevUser,

				key: fieldName,
				value: text,
			};
		});
	};
	const settings = [
		{
			name: "password",
			nameIcons: "shield-key",
			text: "Change Password",
			placeholder: "Password",
		},
		{
			name: "profileImage",
			nameIcons: "image-edit",
			text: "Change Profile Image",
			placeholder: "Profile Image",
		},
		{
			name: "full_name",
			nameIcons: "account-edit",
			text: "Change User Name",
			placeholder: "User Name",
		},
		{ nameIcons: "logout", text: "Log Out" },
	];

	const changeItem = (event, name, placeholder) => {
		if (name !== undefined) {
			setVisible(!visible);
			setPopUpValue((prev) => ({
				...prev,
				name: name,
				placeholder: placeholder,
			}));
		}
		setChange({ id: props.userInfo.id, key: "", value: "" });
		setVisible(!visible);
		setImage(null);
		setFullImage(null);
	};

	const changeInfo = async (item) => {
		if (change.value === "" && fullImage === null) {
			Alert.alert("All fields must be filled");
		} else {
			if (change.key === "full_name") {
				change.value = change.value.toLowerCase();
				const sentences = change.value.split(" ");

				for (let i = 0; i < sentences.length; i++) {
					if (sentences[i]) {
						sentences[i] =
							sentences[i][0].toUpperCase() + sentences[i].substring(1);
					}
				}

				change.value = sentences.join(" ").trim();
			}

			if (change.key === "full_name") {
				change.value = change.value.toLowerCase();
				const sentences = change.value.split(" ");

				for (let i = 0; i < sentences.length; i++) {
					if (sentences[i]) {
						sentences[i] =
							sentences[i][0].toUpperCase() + sentences[i].substring(1);
					}
				}

				change.value = sentences.join(" ").trim();
			}
			try {
				const requst = {
					url: `${API_URL}/users/updateUser`,
					body: JSON.stringify({ change }),
					ContentType: "application/json; charset=UTF-8",
				};

				if (item === "profileImage") {
					const data = new FormData();
					data.append("id", change.id);
					data.append("my_photo", {
						uri: fullImage,
						name: props.userInfo.instagram,

						type: "image/jpg",
					});
					requst.ContentType = "multipart/form-data";
					requst.body = data;
				}

				await FetchRequest(requst).then(() => {
					changeItem();
					props.getAllActivity();
					props.getUser(props.userInfo.id);
					Alert.alert("The update was successful");
				});
			} catch (err) {
				Alert.alert(
					"Network request failed or received an unexpected response",
				);
			}
		}
	};

	return (
		<SafeAreaView>
			<View style={{ backgroundColor: "#a2e2e2", height: "100%" }}>
				<View style={styles.header}>
					<View>
						<Text style={[styles.text, { fontSize: 20 }]}>
							{props.userInfo.full_name}
						</Text>
						<Text style={styles.text}>{props.userInfo.instagram}</Text>
					</View>
					<Image
						source={{
							uri: `data:image/jpeg;base64,${props.userInfo.profile_image}`,
						}}
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
									item.nameIcons === "logout"
										? () => props.logOut([])
										: (event) => changeItem(event, item.name, item.placeholder)
								}
								style={styles.containerSettingsItems}
								key={item.nameIcons}
							>
								<MaterialCommunityIcons name={item.nameIcons} size={26} />
								<Text>{item.text}</Text>
							</TouchableOpacity>
						);
					})}
				</View>
				<View>
					{}
					<Overlay overlayStyle={styles.overlay} isVisible={visible}>
						<View style={styles.popUp}>
							<TouchableOpacity onPress={changeItem}>
								<Text>X</Text>
							</TouchableOpacity>
							{popUpValue.name !== "profileImage" ? (
								<TextInput
									onChangeText={(text) => inputValue(popUpValue.name, text)}
									style={styles.input}
									placeholder={`New ${popUpValue.placeholder}`}
								/>
							) : (
								<View style={{ display: "flex", alignItems: "center" }}>
									<ImgPicker getImg={getImg} />
								</View>
							)}
							<TouchableOpacity
								onPress={() => changeInfo(popUpValue.name)}
								style={styles.button}
							>
								<Text>Submit</Text>
							</TouchableOpacity>
						</View>
					</Overlay>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header: {
		paddingTop: 30,
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		gap: 12,
		alignItems: "center",
		backgroundColor: "#fe3c72",
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
		backgroundColor: "#fe3c72",
	},
	containerSettings: {
		marginTop: 90,
		display: "flex",
		alignItems: "flex-end",
	},
	containerSettingsItems: {
		display: "flex",
		flexDirection: "row-reverse",
		alignItems: "center",
		width: 200,
	},
	overlay: {
		display: "flex",

		height: 300,
		width: 300,
	},
	input: {
		height: 40,
		borderWidth: 1,

		padding: 5,
		marginTop: 10,
	},
	button: {
		display: "flex",
		alignItems: "center",
		marginLeft: "25%",
		marginTop: 10,
		backgroundColor: "#32a897",
		padding: 10,
		width: 150,
	},
	containerIMG: {
		borderWidth: 1,
		borderRadius: 50,
		width: 100,
		marginLeft: 100,
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
});
