import React from "react";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import {
	PermissionsAndroid,
} from "react-native";

export default async function NotificationsEvent(item) {
	const time = item.ActivityDate;
	const [datePart, timePart] = time.split("T");
	const [hours, minutes] = timePart.slice(0, -5).split(":");
	const targetDate = new Date(`${datePart}T${hours}:${minutes}:00.000Z`);

	targetDate.setHours(hours);
	targetDate.setMinutes(minutes);
	targetDate.setSeconds(0);

	const currentTime = new Date();
	const timeDifferenceInSeconds =
		Math.max(0, targetDate.getTime() - currentTime.getTime()) / 1000;
	try {
		const permissionAlert = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
		  );

		if (permissionAlert !== "granted" ) {
			console.log("Notification permissions not granted");
			return;
		} else {
			await Notifications.scheduleNotificationAsync({
				content: {
					title: item.ActivitName,
					body: `Time: ${item.ActivityDate.split("T")[1].slice(0, 5)}, Location: ${item.ActivityLocation}, Organizer: ${
						item.EventOrganizer
					}`,
				},
				trigger: {
					seconds: timeDifferenceInSeconds,
				},
			});
		}
		Alert.alert("Notification scheduled successfully");
	} catch (error) {
		console.log("Error scheduling notification:", error);
	}
}
