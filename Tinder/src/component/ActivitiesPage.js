import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API_URL } from "@env";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
} from "react-native";

export default function YourActivities(props) {
	const [activityInfo, setActivityInfo] = React.useState({
		activity: "",
		date: "",
		location: "",
		time: "",
		id: props.userInfo.id,
	});
	const [date, setDate] = React.useState(new Date());
	const [mode, setMode] = React.useState("date");
	const [showDatePicker, setShowDatePicker] = React.useState(false);
	const [time, setTime] = React.useState("false");
	const onChange = (event, selectedDate) => {
		setShowDatePicker(false);
		const currentDate = selectedDate;
		const tempDate = new Date(currentDate);
		const fTime = `${tempDate.getHours().toString().padStart(2, "0")}:${tempDate
			.getMinutes()
			.toString()
			.padStart(2, "0")}`;
		const [hours, minutes] = fTime.split(":").map(Number);
		tempDate.setUTCHours(hours, minutes, 0, 0);
		let dateTime = tempDate.toISOString();
		dateTime = new Date(dateTime);
		setTime(fTime);
		setDate(dateTime);
	};
	const inputValue = (fieldName, text) => {
		setActivityInfo((prevUser) => {
			return {
				...prevUser,
				[fieldName]: text,
			};
		});
	};

	const addActivity = async () => {
		if (time === "false") {
			Alert.alert("Must Pick Time");
		} else {
			let newDate = new Date(date);

			const [hours, minutes] = time.split(":").map(Number);

			newDate.setUTCHours(hours, minutes, 0, 0);

			newDate = newDate.toISOString();

			activityInfo.date = newDate;
			try {
				if (activityInfo.activity === "" || activityInfo.location === "") {
					Alert.alert("All fields must be filled");
				} else {
					await fetch(`${API_URL}/activity/addActivity`, {
						method: "POST",
						body: JSON.stringify({ activityInfo }),
						headers: {
							"Content-Type": "application/json; charset=UTF-8",
						},
					}).then((response) => {
						if (response.status !== 200) {
							throw new Error(
								`Network request failed or received 
						an unexpected response`,
							);
						}
						response.json().then((result) => {
							setActivityInfo({
								...activityInfo,
								activity: "",
								date: "",
								location: "",
							});
							setTime("false");
							Alert.alert("The activity has been added");
						});
					});
				}
			} catch (Err) {
				console.log(Err);
			}
		}
	};
	const showTimepicker = (courrnMode) => {
		setShowDatePicker(true);
		setMode(courrnMode);
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
			<TextInput
				value={activityInfo.activity}
				name="activity"
				onChangeText={(text) => inputValue("activity", text)}
				style={{ height: 40, borderWidth: 1, width: 200 }}
				placeholder="Name Of Activity"
			/>

			<TextInput
				value={activityInfo.location}
				name="location"
				onChangeText={(text) => inputValue("location", text)}
				style={{ height: 40, borderWidth: 1, width: 200 }}
				placeholder="Location"
			/>
			<TouchableOpacity
				onPress={() => {
					showTimepicker("date");
				}}
			>
				<View style={[styles.containerButton, { backgroundColor: "gray" }]}>
					<Text>Pick a Date</Text>
					<MaterialCommunityIcons
						name="calendar-blank"
						size={26}
						color="black"
					/>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					showTimepicker("time");
				}}
			>
				<View style={[styles.containerButton, { backgroundColor: "gray" }]}>
					<Text>Pick a Time</Text>
					<MaterialCommunityIcons
						name="calendar-blank"
						size={26}
						color="black"
					/>
				</View>
			</TouchableOpacity>

			{showDatePicker && (
				<DateTimePicker
					value={date}
					mode={mode}
					is24Hour={true}
					display={Platform.OS === "ios" ? "spinner" : "default"}
					onChange={onChange}
				/>
			)}

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
		backgroundColor: "green",
		padding: 10,
	},
});
