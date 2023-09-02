import React from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarPage() {
	const [markedDates, setMarkedDates] = React.useState({
		"2023-09-01": {
			selected: true,
			marked: true,
			selectedColor: "blue",
			events: [
				{
					title: "Event 1",
					description: "Description for Event 1",
				},
				{
					title: "Event 2",
					description: "Description for Event 2",
				},
			],
		},
	});

	return (
		<View style={styles.container}>
			<Calendar
				markedDates={markedDates}
				onDayPress={(day) => {
					const selectedDate = day.dateString;
					const eventsForSelectedDate = markedDates[selectedDate];
					if (eventsForSelectedDate) {
						console.log("Events for selected date:", eventsForSelectedDate);
					} else {
						console.log("No events for selected date");
					}
				}}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});
