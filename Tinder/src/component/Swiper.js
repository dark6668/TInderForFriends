import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import Swiper from "react-native-deck-swiper";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function MainSwiper(props) {
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
					<AntDesign name="infocirlceo" size={24} color="white" />
				</View>
				<Text style={styles.text}>{user.activity}</Text>
			</View>
		</View>
	);

	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [liked, setLiked] = React.useState([]);
	const [disLike, setdisLike] = React.useState([]);
	const [showSwiper, setShowSwiper] = React.useState(true);
	const swiperRef = React.useRef(currentIndex);

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
		setShowSwiper(false);
	};

	return (
		<SafeAreaView>
			{console.log(showSwiper)}
			{showSwiper ? (
				<View>
					<Swiper
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
							size={94}
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
							size={94}
							backgroundColor="transparent"
							underlayColor="transparent"
							activeOpacity={0.3}
							color={"red"}
							marginTop={10}
							onPress={() => swiperRef.current.swipeRight()}
						/>
					</View>
				</View>
			) : (
				<View
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100%",
					}}
				>
					<Text style={{ fontSize: 24 }}>Nothing To See</Text>
				</View>
			)}
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	container: {
		display: "flex",
		height: 4500,
		zIndex: 1,
		flex: 1,
	},

	buttonText: {
		color: "white",
		fontSize: 20,
		zIndex: 3,
		position: "absolute",
	},

	cardImge: {
		flex: 1,
		height: 100,
	},
	containerInfo: {
		display: "flex",
		position: "absolute",

		textAlign: "center",

		width: 250,
		top: "80%",
		left: 80,
		gap: 10,
	},
	containerInfoFlex: {
		display: "flex",
		flexDirection: "row-reverse",
		gap: 20,
	},
	text: {
		color: "white",
		fontSize: 20,
	},
	containerInstagram: {
		display: "flex",
		flexDirection: "row-reverse",
		justifyContent: "space-between",
	},
	IconsButton: {
		marginTop: 700,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		textAlign: "center",
	},
});
