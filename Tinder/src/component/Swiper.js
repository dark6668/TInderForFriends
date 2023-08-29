import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Swiper from "react-native-deck-swiper";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const DeckSwiper = (props) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [liked, setLiked] = useState([]);
	const [disLike, setdisLike] = useState([]);

	const handleSwiped = () => {
		setCurrentIndex(currentIndex + 1);
	};
	const dislike = (index) => {
		console.log("dislike");
		setdisLike((prev) => [...prev, props.users[index].name]);
		if (currentIndex + 1 === props.users.length) {
			end();
		}
	};

	const like = (index) => {
		console.log("like");
		setLiked((prev) => [...prev, props.users[index].name]);

		if (currentIndex + 1 === props.users.length) {
			end();
		}
	};
	const end = () => {
		console.log(`You disLike: ${disLike}`);

		console.log(`You Liked: ${liked}`);
	};
	const renderCard = (user) => (
		<View style={styles.border}>
		
				<View style={styles.border}>
					<View>
						<Image source={{ uri: user.img }} style={styles.image} />
					</View>
					<View style={styles.containerInfo}>
						<View style={styles.containerInfoFlex}>
							<Text style={styles.text}>{user.name}</Text>
							<Text style={styles.text}>{user.age}</Text>
						</View>
						<View style={styles.containerInstagram}>
							<Text style={styles.text}>{user.instagram}</Text>
							<AntDesign name="infocirlceo" size={24} color="white" />
						</View>
						<Text style={styles.text}>{user.activity}</Text>
					</View>
				</View>
			
		</View>
	);

	return (
		<View style={styles.container}>
			<Swiper
				cards={props.users}
				cardIndex={currentIndex}
				renderCard={renderCard}
				onSwiped={handleSwiped}
				infinite={false}
				onSwipedLeft={dislike}
				onSwipedRight={like}
				onSwipedAll={end}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	center: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: 650,
	},
	border: { display: "flex", justifyContent: "center", alignItems: "center" },
	image: { position: "relative", width: 400, height: 900 },
	containerInfo: {
		display: "flex",
		position: "absolute",
		width: 250,
		top: "80%",
		left: 110,
		gap: 10,
	},
	containerInfoFlex: {
		display: "flex",
		flexDirection: "row-reverse",
		gap: 20,
	},
	containerInstagram: {
		display: "flex",
		flexDirection: "row-reverse",
		justifyContent: "space-between",
	},
	text: {
		color: "white",
		fontSize: 20,
	},
});

export default DeckSwiper;
