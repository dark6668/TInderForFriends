import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API_URL } from "@env";
import FetchRequest from "./FetchRequest";

import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
} from "react-native";
import DateTimePick from "./DateTimePicker";

export default function YourActivities(props) {
	const [activityInfo, setActivityInfo] = React.useState({
		activity: "",
		date: "",
		location: "",
		time: "",
		id: props.userInfo.id,
	});
	const input = [
		{ name: "activity", placeholder: "Name Of Activity" },
		{ name: "location", placeholder: "Location" },
	];

	const inputValue = (fieldName, text) => {
		setActivityInfo((prevUser) => {
			return {
				...prevUser,
				[fieldName]: text,
			};
		});
	};

	const getVlaueOFtime = (timeOrdate) => {
		const updatedActivityInfo = { ...activityInfo };

		if (timeOrdate.date !== undefined) {
			updatedActivityInfo.date = timeOrdate.date;
		} else if (timeOrdate.time !== undefined) {
			updatedActivityInfo.time = timeOrdate.time;
		}

		setActivityInfo(updatedActivityInfo);
	};

	const addActivity = async () => {
		try {
			if (
				activityInfo.activity === "" ||
				activityInfo.location === "" ||
				activityInfo.date === "" ||
				activityInfo.time === ""
			) {
				Alert.alert("All fields must be filled");
			} else {
				const requst = {
					url: `${API_URL}/activity/addActivity`,
					body: JSON.stringify({ activityInfo }),
					ContentType: "application/json; charset=UTF-8",
				};

				await FetchRequest(requst).then(() => {
					setActivityInfo({
						...activityInfo,
						time: "",
						activity: "",
						date: "",
						location: "",
					});

					Alert.alert("The activity has been added");
				});
			}
		} catch (err) {
			Alert.alert("Network request failed or received an unexpected response");
		}
	};
	return (
		<View
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
			}}
		>
			{input.map((item) => {
				return (
					<TextInput
						key={item.name}
						value={
							item.name === "activity"
								? activityInfo.activity
								: activityInfo.location
						}
						name={item.name}
						onChangeText={(text) => inputValue(item.name, text)}
						style={{ height: 40, borderWidth: 1, width: 200, marginTop: 10 }}
						placeholder={item.placeholder}
					/>
				);
			})}
			<DateTimePick sendVlaueOFtime={getVlaueOFtime} />

			<TouchableOpacity onPress={addActivity}>
				<View style={styles.containerButton}>
					<Text>Add Activity</Text>
					<MaterialCommunityIcons name="run" size={26} color="black" />
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	containerButton: {
		display: "flex",
		flexDirection: "row-reverse",
		alignItems: "center",
		marginTop: 10,
		backgroundColor: "#fe3c72",
		padding: 10,
	},
});
