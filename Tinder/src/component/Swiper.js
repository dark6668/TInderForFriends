import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Swiper from "react-native-deck-swiper";
import { AntDesign } from "@expo/vector-icons";

const DeckSwiper = (props) => {
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [liked, setLiked] = React.useState([]);
	const [disLike, setdisLike] = React.useState([]);
    const [shoWSwiper, setShoWSwiper] = React.useState(true);
	const [data,setData] =  React.useState(props.userData)
	const handleSwiped = () => {
		setCurrentIndex(currentIndex + 1);
	};
	const dislike = (index) => {
		console.log("dislike");
		setdisLike((prev) => [...prev, props.userData[index].fullName]);
		if (currentIndex + 1 === props.userData.length) {
			end();
		}
	};

	const like = (index) => {
		console.log("like");
		setLiked((prev) => [...prev, props.userData[index].fullName]);

		if (currentIndex + 1 === props.userData.length) {
			end();
        
		}
	};
	const end = () => {
		console.log(`You disLike: ${disLike}`);

		console.log(`You Liked: ${liked}`);
            setShoWSwiper(false)
	};		



const renderCard = (user) => (
    <View style={styles.border}>
		

            <View style={styles.border}>
                <View>
                    <Image source={{ uri: user.ProfileImage }} style={styles.image} />
                </View>
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
      
	
    </View>
);
	return (
		<View>
     
                <Swiper
				cards={props.userData}
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


// <View style={styles.border}>
		
// <View style={styles.border}>
// 	<View>
// 		<Image source={{ uri: user.ProfileImage }} style={styles.image} />
// 	</View>
// 	<View style={styles.containerInfo}>
// 		<View style={styles.containerInfoFlex}>
// 			<Text style={styles.text}>{user.fullName}</Text>
// 			<Text style={styles.text}>{user.age}</Text>
// 		</View>
// 		<View style={styles.containerInstagram}>
// 			<Text style={styles.text}>{user.instagram}</Text>
// 			<AntDesign name="infocirlceo" size={24} color="white" />
// 		</View>
// 		{/* <Text style={styles.text}>{user.activity}</Text> */}
// 	</View>
// </View>

// </View>