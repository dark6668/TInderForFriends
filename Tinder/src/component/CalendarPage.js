import React, { useEffect} from "react";
import { Text, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import FetchRequest from "./FetchRequest";
import { API_URL } from "@env";
import messaging from '@react-native-firebase/messaging';


export default function CalendarPage(props) {

	const [selected, setSelected] = React.useState("");
	const [yourEvent, setYourEvent] = React.useState([]);

	useEffect(() => {
		getYourActivity();
		requestUserPermission()
	}, []);
	async function requestUserPermission() {
		const authStatus = await messaging().requestPermission();
		const enabled =
		  authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
		  authStatus === messaging.AuthorizationStatus.PROVISIONAL;
	  
		if (enabled) {
		  console.log('Authorization status:', authStatus);
		}
	  }
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
    <View style={styles.containerEvent}>
      {yourEvent.map((item) =>
        selected === item.date.split(" ")[0] ? (
          <View key={item.date + item.id} style={styles.event}>
            <Text  style={styles.text}>Event: {item.activity}</Text>
            <Text  style={styles.text}>Location: {item.location}</Text>
            <Text  style={styles.text}>Date: {item.date.split(" ")[0]}</Text>
            <Text  style={styles.text}>Time: {item.date.split(" ")[1].slice(0, 5)}</Text>
            <Text  style={styles.text}>Organizer: {item.event_organizer}</Text>
          </View>
        ) : null
      )}
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
	borderColor:'red',

	borderWidth:1,
	
		
	},
	text:{

	},
	containerEvent:{
		display:"flex",
		flexDirection:"column",
		justifyContent:"space-evenly",
		height:300
	}
});
