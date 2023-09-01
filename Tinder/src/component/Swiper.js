import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import Swiper from "react-native-deck-swiper";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function MainSwiper(props) {
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [liked, setLiked] = React.useState([]);
	const [disLike, setdisLike] = React.useState([]);
	const [showSwiper, setShowSwiper] = React.useState(true);
	const swiperRef = React.useRef(currentIndex);

	const renderCard = (user) => (
		<View style={styles.container}>
			<Image source={{ uri: user.ProfileImage }} style={styles.cardImge} />
			<View style={styles.containerInfo}>
				<View style={styles.containerInfoFlex}>
					<Text style={styles.text}>{user.fullName}</Text>

					<Text style={styles.text}>{user.age}</Text>
				</View>
				<View style={styles.containerInstagram}>
					<Text style={styles.text}>{user.instagram}</Text>
					<AntDesign
						name="infocirlceo"
						size={24}
						color="white"
						onPress={() => {}}
					/>
				</View>
				<Text style={styles.text}>{user.activity}</Text>
			</View>
		</View>
	);

	const handleSwiped = () => {
		setCurrentIndex(currentIndex + 1);
	};
	const dislike = (index) => {
		setdisLike((prev) => [...prev, props.userData[index].fullName]);
		if (currentIndex + 1 === props.userData.length) {
			end();
		}
	};

	const like = (index) => {
		setLiked((prev) => [...prev, props.userData[index].fullName]);

		if (currentIndex + 1 === props.userData.length) {
			end();
		}
	};
	const end = () => {
		console.log(`You disLike: ${disLike}`);

		console.log(`You Liked: ${liked}`);
		props.closeSwiper();
	};

	return (
		<SafeAreaView>
			<View>
				<Swiper
					style={styles.body}
					ref={swiperRef}
					cards={props.userData}
					cardIndex={currentIndex}
					renderCard={renderCard}
					onSwiped={handleSwiped}
					infinite={false}
					onSwipedLeft={dislike}
					onSwipedRight={like}
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
				<View style={styles.IconsButton}>
					<MaterialCommunityIcons.Button
						name="close"
						size={65}
						backgroundColor="transparent"
						underlayColor="transparent"
						activeOpacity={0.3}
						color={"red"}
						onPress={() => {
							swiperRef.current.swipeLeft();
						}}
					/>
					<MaterialCommunityIcons
						name="heart"
						size={65}
						backgroundColor="transparent"
						underlayColor="transparent"
						activeOpacity={0.3}
						color={"red"}
						marginTop={10}
						onPress={() => swiperRef.current.swipeRight()}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	Swiper: { backgroundColor: "red" },

	body: {
		backgroundColor: "red",
		borderWidth: 2022,
	},
	container: {
		display: "flex",
		flex: 1,
		marginTop: -55,
	},

	cardImge: {
		flex: 1,
		height: 20,
	},
	containerInfo: {
		display: "flex",
		position: "absolute",
		textAlign: "center",

		width: 250,
		top: "70%",
		left: 80,
		gap: 10,
	},
	containerInfoFlex: {
		display: "flex",

		flexDirection: "row-reverse",
		gap: 20,
	},
	text: {
		color: "#4FD0E9",
		fontSize: 20,
	},
	containerInstagram: {
		display: "flex",
		flexDirection: "row-reverse",
		justifyContent: "space-between",
	},
	IconsButton: {
		marginTop: 640,
		marginRight: 30,
		height: 90,
		width: 350,
		display: "flex",
		flexDirection: "row-reverse",
		justifyContent: "space-between",
		textAlign: "center",
	},
});
