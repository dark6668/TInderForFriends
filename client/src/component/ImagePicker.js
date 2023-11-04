import React from "react";
import {
	Image,
	Text,
	TouchableOpacity,
	StyleSheet,
	PermissionsAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImgPicker(props) {
	const [image, setImage] = React.useState(null);

	const uploadeImg = async () => {
		const permissionCamera = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.CAMERA,
		);
		const permissionGallery = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
		);

		const options = {
			title: "Select Image",
			type: "library",
			options: {
				maxHeight: 200,
				maxWidth: 200,
				selectionLimit: 1,
				mediaType: "photo",
				includeBase64: true,
			},
		};
		const result = await ImagePicker.launchImageLibraryAsync({ options });

		if (!result.canceled) {
			setImage(result.assets[0].uri);
			props.getImg(result.assets[0].uri);
		}
	};

	return (
		<TouchableOpacity style={styles.containerIMG} onPress={uploadeImg}>
			{!image ? (
				<Text>Choose a picture</Text>
			) : (
				<Image source={{ uri: image }} style={styles.img} />
			)}
		</TouchableOpacity>
	);
}
const styles = StyleSheet.create({
	containerIMG: {
		zIndex: 2,
		marginBottom: 10,
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
});
