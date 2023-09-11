import React, { useEffect, useRef } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import FetchRequest from "./FetchRequest";
import { API_URL } from "@env";
import NotificationsEvent from "./Notification";

export default function CalendarPage(props) {
	const [selected, setSelected] = React.useState("");
	const [yourEvent, setYourEvent] = React.useState([]);

	useEffect(() => {
		getYourActivity();
	}, []);
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
	const notifications = async (item) => {
		await NotificationsEvent(item);
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
					<View style={styles.containerEvent}>
						{yourEvent.map((item) => {
							return selected === item.date.split(" ")[0] ? (
								<View key={item.id} style={styles.event}>
									<Text style={styles.text}>
										Event: {yourEvent[0].activity}
									</Text>
									<Text style={styles.text}>
										Location: {yourEvent[0].location}
									</Text>
									<Text style={styles.text}>
										Date: {yourEvent[0].date.split(" ")[0]}
									</Text>
									<Text style={styles.text}>
										Time: {yourEvent[0].date.split(" ")[1].slice(0, 5)}
									</Text>
									<Text style={styles.text}>
										Organizer: {yourEvent[0].event_organizer}
									</Text>
									<TouchableOpacity
										onPress={() => {
											notifications(yourEvent[0]);
										}}
									>
										<Text style={styles.button}>Notify Me</Text>
									</TouchableOpacity>
								</View>
							) : null;
						})}
					</View>
				)}
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		height: "100%",
		backgroundColor: "#a2e2e2",
	},
	event: {
		display: "flex",
		alignItems: "center",
	},
	text: {},
	button: {
		display: "flex",
		alignItems: "center",
		textAlign: "center",

		backgroundColor: "#fe3c72",
		padding: 10,
		width: 150,
	},
	containerEvent: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
		height: 400,
	},
});
