import React from "react";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

export default async function NotificationsEvent(item) {
	const time = item.ActivityDate;
	const [datePart, timePart] = time.split(" ");
	const [hours, minutes] = timePart.split(":");
	const targetDate = new Date(datePart);
	targetDate.setHours(hours);
	targetDate.setMinutes(minutes);
	targetDate.setSeconds(0);

	const currentTime = new Date();
	const timeDifferenceInSeconds =
		Math.max(0, targetDate.getTime() - currentTime.getTime()) / 1000;

	try {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: item.ActivitName,
				body: `Time: ${item.ActivityDate.split(" ")[1].slice(
					0,
					5,
				)}, Location: ${item.ActivityLocation}, Organizer: ${
					item.EventOrganizer
				}`,
			},
			trigger: {
				seconds: timeDifferenceInSeconds,
			},
		});

		Alert.alert("Notification scheduled successfully");
	} catch (error) {
		console.log("Error scheduling notification:", error);
	}
}
