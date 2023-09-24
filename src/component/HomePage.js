import React from "react";
import { View, Text } from "react-native";
import Form from "./Form";
import SignUp from "./SignUp";
import Login from "./LoginPage";
export default function HomePage(props) {
	const [signUpPage, setSignUpPage] = React.useState(false);

	const valueSignUp = () => {
		setSignUpPage((prev) => !prev);
	};

	return (
		<View>
			{!signUpPage ? (
				<Login logIn={props.logIn} valueSignUp={valueSignUp} />
			) : (
				<SignUp valueSignUp={valueSignUp} />
			)}
		</View>
	);
}
