import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateTimePick(props) {
	const [showTimePicker, setShowTimePicker] = React.useState(false);
	const [mode, setMode] = React.useState("");
	const [time, setTime] = React.useState(new Date());

	const changeTime = (event, selectedDate) => {
		setShowTimePicker(false);
		if (event.type === "set" && selectedDate) {
			let formatted;
			if (mode === "time") {
				formatted = {
					time: selectedDate.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					}),
				};
			} else {
				formatted = { date: selectedDate.toISOString().split("T")[0] };
			}
			setTime(selectedDate);
			props.sendVlaueOFtime(formatted);
		} else {
			setTime(new Date());
		}
	};
	const pickPicker = (value) => {
		setShowTimePicker(true);
		setMode(value);
	};
	return (
		<View style={{}}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					pickPicker("time");
				}}
			>
				<Text>Pick a Time</Text>
				<MaterialCommunityIcons
					name="calendar-blank"
					size={26}
					color="black"
					style={styles.icon}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					pickPicker("date");
				}}
			>
				<Text>Pick a Date</Text>
				<MaterialCommunityIcons name="calendar-blank" size={26} color="black" />
			</TouchableOpacity>
			{showTimePicker && (
				<DateTimePicker
					mode={mode}
					value={time}
					display="spinner"
					onChange={changeTime}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#fe3c72",
		marginTop: 10,
		width: 200,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
});
