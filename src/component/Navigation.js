import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import AccountPage from "./AcoountPage";
import CalendarPage from "./CalendarPage";
import MainSwiper from "./SwiperPage";
import ActivitiesPage from "./ActivitiesPage";
import HomePage from "./HomePage";
const Tab = createBottomTabNavigator();

export default function Navigation(props) {
	const componentList = {
		MainSwiper,
		AccountPage,
		CalendarPage,
		ActivitiesPage,
	};
	const tabNavigator = [
		{
			componentName: "MainSwiper",
			nameMaterial: "map-search",
			nameLabel: "Search Activity",
			props: {
				usersData: props.usersData,
				closeSwiper: props.closeSwiper,
				showSwiper: props.showSwiper,
				userId: props.user.id,
			},
		},
		{
			componentName: "CalendarPage",
			nameMaterial: "calendar-search",
			nameLabel: "Your Events",
			props: { userInfo: props.user },
		},

		{
			componentName: "ActivitiesPage",
			nameMaterial: "walk",
			nameLabel: "Activities",
			props: { userInfo: props.user },
		},
		{
			componentName: "AccountPage",
			nameMaterial: "account",
			nameLabel: "Account",
			props: {
				userInfo: props.user,
				logOut: props.logOut,
				getAllActivity: props.getAllActivity,
				getUser: props.getUser,
			},
		},
	];

	function TabScreen(tab) {
		const Component = componentList[tab.route.name];

		const Componentprops = tabNavigator.find((item) => {
			return item.componentName === tab.route.name;
		});
		if (Component) {
			return <Component {...Componentprops.props} />;
		} else {
			return (
				<View
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100%",
					}}
				>
					<Text>Component not found for component name</Text>
				</View>
			);
		}
	}

	return (
		<NavigationContainer>
			{props.user.length === 0 ? (
				<HomePage logIn={props.logIn} />
			) : (
				<Tab.Navigator
					screenOptions={{
						tabBarStyle: { backgroundColor: "#fe3c72" },
						tabBarInactiveTintColor: "black",
						tabBarLabelStyle: {
							color: "white",
							fontWeight: "bold",
						},
					}}
				>
					{tabNavigator.map((item) => (
						<Tab.Screen
							key={item.componentName}
							name={item.componentName}
							component={TabScreen}
							initialParams={{ name: item.componentName }}
							options={{
								headerShown: false,
								tabBarIcon: ({ color }) => (
									<MaterialCommunityIcons
										name={item.nameMaterial}
										size={26}
										color={color}
									/>
								),
								tabBarLabel: item.nameLabel,
							}}
						/>
					))}
				</Tab.Navigator>
			)}
		</NavigationContainer>
	);
}
