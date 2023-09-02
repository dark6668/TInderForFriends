import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import SwiperBody from "./SwiperBody";

export default function MainSwiper(props) {
	return (
		<SafeAreaView>
			<View>
				{props.showSwiper && props.usersData.length > 0 ? (
					<View>
						<SwiperBody
							cards={props.usersData}
							closeSwiper={props.closeSwiper}
						/>
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
			</View>
		</SafeAreaView>
	);
}
