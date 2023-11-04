import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import FetchRequest from "./FetchRequest";

export default function SwiperBody(props) {
	const swiperRef = React.useRef(currentIndex);
	const userId = props.userId;
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const renderCard = (user) => (
		<View style={styles.container}>
			<Image
				source={{ uri: `data:image/jpeg;base64,${user.ProfileImage}` }}
				style={styles.cardImge}
			/>
			<View style={styles.containerInfo}>
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

	const closeSwiper = () => {
		props.closeSwiper();
	};

	const handlerSwiped = async (swipe, index) => {
		setCurrentIndex(currentIndex + 1);
		try {
			const register = {
				userId,
				organizerId: props.cards[index].organizerId,
				activityId: props.cards[index].activityId,
				swipe,
			};

			const requst = {
				url: "/registration/registration",
				body: JSON.stringify({ register }),
				ContentType: "application/json; charset=UTF-8",
			};

			await FetchRequest(requst);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<View>
			<Swiper
				style={styles.body}
				ref={swiperRef}
				cards={props.cards}
				cardIndex={currentIndex}
				renderCard={renderCard}
				onSwipedRight={() => handlerSwiped("Right", currentIndex)}
				onSwipedLeft={() => handlerSwiped("Left", currentIndex)}
				infinite={false}
				onSwipedAll={closeSwiper}
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
