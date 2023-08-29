import React from "react";
import { View } from "react-native";

import DeckSwiper from "./src/component/Swiper";
const users = [
	{
		name: "Eleanor Mitchell",
		age: 35,
		img: "https://shorturl.at/abvT1",
		instagram: "@EleanorTheDude",
		activity: "dance",
	},
	{
		name: "Sophia Johnson",
		age: 28,
		img: "https://shorturl.at/emQ46",
		instagram: "@SophiaJourney",
		activity: "play basketball",
	},
	{
		name: "Daniel Parker",
		age: 30,
		img: "https://shorturl.at/AKPWY",
		instagram: "@DanielP_Fiction",
		activity: "gossip about the neighbors",
	},
	{
		name: "Olivia Anderson",
		age: 25,
		img: "https://shorturl.at/uCVY3",
		instagram: "@OliviaCreates",
		activity: "jump on one leg",
	},
	{
		name: "Sophia Ramirez",
		age: 28,
		img: "https://shorturl.at/wLR57",
		instagram: "@SophiaRamirezArt",
		activity: "Painting vibrant landscapes",
	},
	{
		name: "Liam Miller",
		age: 25,
		img: "https://shorturl.at/lmzE7",
		instagram: "@LiamTheDude",
		activity: "write code",
	},
	{
		name: "Mary Mouser",
		age: 27,
		img: "https://rb.gy/uhq2j",
		instagram: "@missmarymmouser",
		activity: "live in a haunted house ",
	},
	{
		name: "Peyton List",
		age: 25,
		img: "https://www.themoviedb.org/t/p/w500/5p8KwRgBUYVcKBKTYFdD30o6dAc.jpg",
		instagram: "@peytonlist",
		activity: "modeling",
	},
];
export default function App() {
	const [listOfUser, setListOfuser] = React.useState(users);

	return (
		<View>
			<DeckSwiper users={users} />
		</View>
	);
}
