import React from "react";
import { Text, Alert, View, TouchableOpacity } from "react-native";
import Form from "./Form";
import ImgPicker from "./ImagePicker";
import FetchRequest from "./FetchRequest";

export default function SignUp(props) {
	const [fullImage, setFullImage] = React.useState(null);

	const input = [
		{ key: "Sign Up", name: "name", placeholder: "Full Name" },
		{ key: "Sign Up", name: "password", placeholder: "Password" },
		{ key: "Sign Up", name: "birthYear", placeholder: "BirthYear" },
		{ key: "Sign Up", name: "instagram", placeholder: "Instagram" },
	];

	const getImg = (fullImage) => {
		setFullImage(fullImage);
	};

	const signUp = async (valueNewUser) => {
		try {
			if (
				valueNewUser.name.length === 0 ||
				valueNewUser.password.length === 0 ||
				valueNewUser.birthYear.length === 0 ||
				valueNewUser.instagram.length === 0 ||
				fullImage === null
			) {
				Alert.alert("All fields must be filled");
			} else {
				valueNewUser.name = valueNewUser.name.toLowerCase();
				const sentences = valueNewUser.name.split(" ");

				for (let i = 0; i < sentences.length; i++) {
					if (sentences[i]) {
						sentences[i] =
							sentences[i][0].toUpperCase() + sentences[i].substring(1);
					}
				}

				valueNewUser.name = sentences.join(" ").trim();
				valueNewUser.password = valueNewUser.password.trim();
				const data = new FormData();
				data.append("name", valueNewUser.name);
				data.append("password", valueNewUser.password);
				data.append("birthYear", valueNewUser.birthYear);
				data.append("instagram", valueNewUser.instagram);

				data.append("my_photo", {
					uri: fullImage,
					name: valueNewUser.instagram,
					type: "image/jpg",
				});

				const requst = {
					url: "/users/signUp",
					body: data,
					ContentType: "multipart/form-data",
				};
				await FetchRequest(requst).then(() => {
					props.valueSignUp();
				});
			}
		} catch (err) {
			Alert.alert(`Network request failed or received 
			an unexpected response`);
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
			<ImgPicker getImg={getImg} />
			<Form input={input} submit={signUp} />
			<TouchableOpacity onPress={props.valueSignUp}>
				<Text
					style={{
						textAlign: "center",
						marginTop: 21,
						borderBottomWidth: 1,
					}}
				>
					Sign In
				</Text>
			</TouchableOpacity>
		</View>
	);
}
