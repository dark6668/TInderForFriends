import React, { useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import SwiperBody from "./SwiperBody";

export default function MainSwiper(props) {
	return (
		<SafeAreaView>
			<View>
				{props.showSwiper && props.usersData.length > 0 ? (
					<View style={{ backgroundColor: "#a2e2e2", height: "100%" }}>
						<SwiperBody
							cards={props.usersData}
							closeSwiper={props.closeSwiper}
							userId={props.userId}
						/>
					</View>
				) : (
					<View
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "100%",
							backgroundColor: "#a2e2e2",
						}}
					>
						<Text style={{ fontSize: 24 }}>Nothing To See</Text>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
}
