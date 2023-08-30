import React, { useEffect } from "react";
import { Button, View } from "react-native";
import { API_URL } from "@env";

import DeckSwiper from "./src/component/Swiper";





const users = [

	{
		fullName: "Sophia Johnson",
		age: 28,
		ProfileImage: "https://shorturl.at/emQ46",
		instagram: "@SophiaJourney",
		activity: "play basketball",
	},
	{
		fullName: "Daniel Parker",
		age: 30,
		ProfileImage: "https://shorturl.at/AKPWY",
		instagram: "@DanielP_Fiction",
		activity: "gossip about the neighbors",
	},
	{
		fullName: "Olivia Anderson",
		age: 25,
		ProfileImage: "https://shorturl.at/uCVY3",
		instagram: "@OliviaCreates",
		activity: "jump on one leg",
	},
	{
		fullName: "Sophia Ramirez",
		age: 28,
		ProfileImage: "https://shorturl.at/wLR57",
		instagram: "@SophiaRamirezArt",
		activity: "Painting vibrant landscapes",
	},
	{
		fullName: "Liam Miller",
		age: 25,
		ProfileImage: "https://shorturl.at/lmzE7",
		instagram: "@LiamTheDude",
		activity: "write code",
	},
	{
		fullName: "Mary Mouser",
		age: 27,
		ProfileImage: "https://rb.gy/uhq2j",
		instagram: "@missmarymmouser",
		activity: "live in a haunted house ",	
	},
	{
		fullName: "Peyton List",
		age: 25,
		ProfileImage: "https://www.themoviedb.org/t/p/w500/5p8KwRgBUYVcKBKTYFdD30o6dAc.jpg",
		instagram: "@peytonlist",
		activity: "modeling",
	},
];
export default function App() {
	const [userData,setUserData] =React.useState([])
	useEffect(()=>{
		getUserData()
		
		},[])


		const getUserData=async()=>{
			try{
				await fetch(`${API_URL}/users/getUsers`,{
					method: 'POST',
					body: JSON.stringify({id:"id"}),
					headers: {
					  'Content-Type': 'application/json; charset=UTF-8',
					},
				  }).then((response)=>{
					if (response.status !== 200) {
						throw new Error('Network request failed or received an unexpected response');
					}
					response.json().then((result)=>{
						data = result.map((item)=>{
							return{
								fullName: item.FullName,
								age: item.age,
								ProfileImage: item.ProfileImage,
								instagram: item.instagram,
								activity: "play basketball",


							}
						
						}) 
					
					
						setUserData(data)
						
					})
				  })
					
			}
			catch(Err){
				console.log(Err);
			}
	
		}
	return (
		<View>
			{
				userData.length > 0&&<DeckSwiper userData={userData}  />
			}
			
		</View>
	);
}
