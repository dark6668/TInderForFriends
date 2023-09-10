import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { API_URL } from "@env";
import FetchRequest from "./FetchRequest";

export default function SwiperBody(props) {
	const swiperRef = React.useRef(currentIndex);
	const userId = props.userId;
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [data, setData] = React.useState(props.cards);
	const renderCard = (user) => (
		<View style={styles.container}>
			<Image
				source={{ uri: `data:image/jpeg;base64,${user.ProfileImage}` }}
				style={styles.cardImge}
			/>
			<View style={styles.containerInfo}>
				<View style={styles.containerInfoFlex}></View>
				<Text style={styles.text}>Date: {user.date.split(" ")[0]}</Text>
				<Text style={styles.text}>
					Time: {user.date.split(" ")[1].slice(0, 5)}
				</Text>

				<Text style={styles.text}>Instagram: {user.instagram}</Text>

				<Text style={styles.text}>Event: {user.activity}</Text>
				<Text style={styles.text}>Location: {user.location}</Text>
			</View>
			<View style={styles.IconsButton}>
				<MaterialCommunityIcons.Button
					name="close"
					size={65}
					backgroundColor="rgba(255,255,255)"
					underlayColor="rgba(255,255,255)"
					activeOpacity={0.3}
					color={"red"}
					onPress={() => {
						swiperRef.current.swipeLeft();
					}}
				/>
				<MaterialCommunityIcons.Button
					name="heart"
					size={65}
					backgroundColor="rgba(255,255,255)"
					underlayColor="rgba(255,255,255)"
					activeOpacity={0.3}
					color={"red"}
					onPress={() => {
						swiperRef.current.swipeRight();
					}}
				/>
			</View>
		</View>
	);

	const handleSwiped = () => {
		setCurrentIndex(currentIndex + 1);
	};

	const end = () => {
		props.closeSwiper();
	};

	const handlerSwipedRigth = async (index) => {
		try {
			const register = {
				userId,
				organizerId: data[index].organizerId,
				activityId: data[index].activityId,
			};
			const requst = {
				url: `${API_URL}/registration/registration`,
				body: JSON.stringify({ register }),
				ContentType: "application/json; charset=UTF-8",
			};

			await FetchRequest(requst).then((data) => {});
		} catch (err) {
			console.log(err);
		}
	};

	const handlerSwiped = async (swipe, index) => {
		console.log(index);

		try {
			const register = {
				userId,
				organizerId: data[index].organizerId,
				activityId: data[index].activityId,
				swipe,
			};
			const requst = {
				url: `${API_URL}/registration/registration`,
				body: JSON.stringify({ register }),
				ContentType: "application/json; charset=UTF-8",
			};

			await FetchRequest(requst).then((data) => {
				console.log(data);
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<View>
			<Swiper
				style={styles.body}
				ref={swiperRef}
				cards={data}
				cardIndex={currentIndex}
				renderCard={renderCard}
				onSwiped={handleSwiped}
				onSwipedRight={() => handlerSwiped("Right", currentIndex)}
				onSwipedLeft={() => handlerSwiped("Left", currentIndex)}
				infinite={false}
				onSwipedAll={end}
				disableBottomSwipe={true}
				disableTopSwipe={true}
				overlayLabels={{
					left: {
						title: "NOPE",
						style: {
							label: {
								backgroundColor: "red",
								borderColor: "red",
								color: "white",
								borderWidth: 1,
								fontSize: 24,
								position: "absolute",
								left: 50,
							},
							wrapper: {
								flexDirection: "column",
								alignItems: "flex-end",
								justifyContent: "flex-start",
								marginTop: 20,
								marginLeft: -20,
							},
						},
					},
					right: {
						title: "LIKE",
						style: {
							label: {
								position: "absolute",
								right: 40,
								backgroundColor: "blue",
								borderColor: "blue",
								color: "white",
								borderWidth: 1,
								fontSize: 24,
							},
							wrapper: {
								flexDirection: "column",
								alignItems: "flex-start",
								justifyContent: "flex-start",
								marginTop: 20,
								marginLeft: 20,
							},
						},
					},
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
	},

	cardImge: {
		flex: 1,
	},
	containerInfo: {
		display: "flex",
		position: "absolute",
		textAlign: "center",

		width: 290,
		top: "60%",
		left: 30,
		gap: 10,
	},
	containerInfoFlex: {
		display: "flex",

		flexDirection: "row-reverse",
		gap: 20,
	},
	text: {
		color: "white",
		fontWeight: "bold",
		fontSize: 20,
	},
	containerInstagram: {
		display: "flex",
		flexDirection: "row-reverse",
		justifyContent: "space-between",
	},
	IconsButton: {
		display: "flex",
		marginTop: -90,
		Width: 500,
		flexDirection: "row-reverse",
		justifyContent: "space-between",
		backgroundColor: "rgba(255,255,255)",
		underlayColor: "rgba(255,255,255)",
	},
});
