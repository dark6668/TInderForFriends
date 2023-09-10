import React, { useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import FetchRequest from "./FetchRequest";
import { API_URL } from "@env";

export default function CalendarPage(props) {
	useEffect(() => {
		getYourActivity();
	}, []);

	const [selected, setSelected] = React.useState("");
	const [yourEvent, setYourEvent] = React.useState([]);
	const getYourActivity = async () => {
		const id = {
			id: props.userInfo.id,
		};
		const requst = {
			url: `${API_URL}/registration/yourActivity`,
			body: JSON.stringify(id),
			ContentType: "application/json; charset=UTF-8",
		};

		await FetchRequest(requst).then((data) => {
			setYourEvent(data);
		});
	};

	return (
		<View style={styles.container}>
			<Calendar
				onDayPress={(day) => {
					setSelected(day.dateString);
				}}
				markedDates={{
					[selected]: { selected: true, disableTouchEvent: true },
				}}
			/>
			<View>
				{yourEvent.length > 0 && (
					<View>
						{yourEvent.map((item) => {
							if (selected === item.date.split(" ")[0]) {
								return (
									<React.Fragment key={item.id}>
										<Text>Event: {item.activity}</Text>
										<Text>Location: {item.location}</Text>
										<Text>Date: {item.date.split(" ")[0]}</Text>
										<Text>Time: {item.date.split(" ")[1].slice(0, 5)}</Text>
										<Text>Organizer: {item.event_organizer}</Text>
									</React.Fragment>
								);
							} else {
								return null;
							}
						})}
					</View>
				)}
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});
