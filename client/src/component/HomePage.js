import React from "react";
import { View } from "react-native";
import Login from "./LoginPage";
import SignUp from "./SignUp";
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
