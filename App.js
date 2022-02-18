import React from 'react'
import AppLoading from 'expo-app-loading'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { Color } from "./src/global/Colors"
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
import { HomeScreen, YouScreen, LaundryScreen, OrdersScreen, SettingsScreen, } from "./src/navigation/screens"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"

import CartsScreen from "./src/screens/CartScreen"
import GetTailorScreen from "./src/screens/GetTailorCreeen"
import WishListScreen from "./src/screens/WishListScreen"

// Bar Icons
const tabBarIcon = ({ route }) => ({
	tabBarIcon: ({ focused }) => {
		switch (route.name) {
			case "Home":
				return <Ionicons style={{ paddingTop: 5 }} name={focused ? "home" : "home-outline"} color={focused ? Color.mainBlue : Color.warmGray} size={25} />
			case "Orders":
				return <Ionicons style={{ paddingTop: 5 }} name={focused ? "timer" : "timer-outline"} color={focused ? Color.mainBlue : Color.warmGray} size={25} />
			case "Laundry":
				return <MaterialIcons name="local-laundry-service" color={focused ? Color.mainBlue : Color.warmGray} size={27} />
			case "You":
				return <Ionicons name={focused ? "person" : "person-outline"} color={focused ? Color.mainBlue : Color.warmGray} size={25} />
		}
	}
})

// Tab Options
const tabBarOptions = {
	activeTintColor: Color.mainBlue,
	inactiveTintColor: Color.warmGray
}

function Tab() {
	const TabNav = createBottomTabNavigator()
	return (
		<TabNav.Navigator screenOptions={tabBarIcon} tabBarOptions={tabBarOptions} >
			<TabNav.Screen name="Laundry" component={LaundryScreen} />
			<TabNav.Screen name="Home" component={HomeScreen} />
			{/* <TabNav.Screen name="Shop" component={ShopScreen} /> */}
			<TabNav.Screen name="Orders" component={OrdersScreen} />
			<TabNav.Screen name="You" component={YouScreen} />
		</TabNav.Navigator>
	)
}

function Stack() {
	const StackNav = createStackNavigator()
	return (
		<StackNav.Navigator initialRouteName="Home" mode="modal" headerMode="none" screenOptions={{ cardOverlayEnabled: true, gestureEnabled: true, ...TransitionPresets.ModalPresentationIOS }}>
			<StackNav.Screen name="Home" component={Tab} />
			<StackNav.Screen name="Cart" component={CartsScreen} />
			<StackNav.Screen name="WishList" component={WishListScreen} />
		</StackNav.Navigator>
	)
}

// Tab Navigation
export default function App() {
	let [fontsLoaded] = useFonts({
		"Inter-Regular": Inter_400Regular,
		"Inter-Black": Inter_500Medium,
	})

	if (!fontsLoaded) {
		return <AppLoading />
	}
	const GetTailorStack = createStackNavigator()
	return (
		<NavigationContainer>
			<GetTailorStack.Navigator headerMode="none">
				<GetTailorStack.Screen options={{ title: "" }} name="Home" component={Stack} />
				<GetTailorStack.Screen options={{ title: "" }} name="Tailor" component={GetTailorScreen} />
				<GetTailorStack.Screen options={{ title: "" }} name="Settings" component={SettingsScreen} />
			</GetTailorStack.Navigator>
		</NavigationContainer>
	)
}