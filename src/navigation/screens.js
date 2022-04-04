import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Color } from "../global/Colors"
import Icon from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome5"
import { TouchableHighlight, View, Platform, Text } from 'react-native'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'

// Screens 
import Shop from "../screens/ShopScreen"
import ShopDetails from "../screens/ShopDetailsScreen"
import Home from "../screens/HomeScreen"
import OrderDetail from "../screens/OrderDetailsScreen"
import You from "../screens/YouScreen"
import DrawerScreen from "../screens/DrawerScreen"
import Orders from "../screens/OrdersScreen"
import Settings from "../screens/SettingsScreen"
import Laundry from "../screens/LaundryScreen"
import { Fonts } from '../global/Fonts'


// Home
function HomeScreen() {
    const HomeStack = createStackNavigator()
    return (
        <HomeStack.Navigator screenOptions={{ headerStyle: { shadowOpacity: 0, elevation: 0 } }}>
            <HomeStack.Screen options={{ title: "" }} name="Home" component={Home} />
        </HomeStack.Navigator>
    )
}

// Settings
function SettingsScreen({ navigation }) {
    const OrdersStack = createStackNavigator()
    return (
        <OrdersStack.Navigator screenOptions={{ headerStyle: { elevation: 0, borderBottomWidth: Platform.OS === "ios" ? 0.2 : 0.6 } }} >
            <OrdersStack.Screen options={{ title: "Settings", headerRightContainerStyle: { paddingRight: 10 } }} name="settings" component={Settings} />
        </OrdersStack.Navigator>
    )
}

// Orders
function OrdersScreen({ navigation }) {
    const OrdersStack = createStackNavigator()
    const newOrder = () => {
        return (
            <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableHighlight underlayColor="white" style={{ width: 40, height: 40, marginRight: 5 }} onPress={() => navigation.navigate("Tailor")}>
                    <Icon style={{ position: "absolute", }} name="add-circle" size={30} color={Color.mainBlue} />
                </TouchableHighlight >
            </View>
        )
    }
    return (
        <OrdersStack.Navigator screenOptions={{ headerStyle: { elevation: 0, borderBottomWidth: Platform.OS === "ios" ? 0.2 : 0.6 } }} >
            <OrdersStack.Screen options={{ title: "", headerRight: () => newOrder(), headerRightContainerStyle: { paddingRight: 10 } }} name="orders" component={Orders} />
            <OrdersStack.Screen options={{ title: "Order Status", headerShown: false }} name="OrderDetail" component={OrderDetailScreen} />
        </OrdersStack.Navigator>
    )
}

// Order status
function OrderDetailScreen() {
    const OrderDetailStack = createStackNavigator()
    return (
        <OrderDetailStack.Navigator>
            <OrderDetailStack.Screen name="OrderDetail" options={{ title: "Order Status", }} component={OrderDetail} />
        </OrderDetailStack.Navigator>
    )
}

// Drawer
const DrawerStack = ({ navigation }) => {
    const ShopStack = createStackNavigator()
    const goToCart = () => {
        return (
            <View style={{ display: "flex", flexDirection: "row", paddingRight: 10 }}>
                <TouchableHighlight underlayColor="white" style={{ width: 35, height: 35, marginRight: 10, marginTop: 20 }} onPress={() => navigation.navigate("Cart")}>
                    <View>
                        <MaterialCommunityIcons name="cart-minus" size={30} color={Color.mainGray} />
                        <Text style={{ position: "absolute", left: 10, top: -12, fontSize: 15, color: Color.mainBlue, fontFamily: Fonts.interBold }}></Text>
                    </View>
                </TouchableHighlight >
            </View>
        )
    }
    return (
        <ShopStack.Navigator screenOptions={{ headerShown: false }}>
            <ShopStack.Screen name="Laundry" options={{ title: "", headerRight: goToCart }} component={Laundry} />
            <ShopStack.Screen name="Details" options={{ headerShown: false }} component={ShopDetailsScreen} />
        </ShopStack.Navigator>
    )
}

// Shop
function LaundryScreen({ navigation }) {
    const Drawer = createDrawerNavigator()
    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerScreen {...props} />}>
            <Drawer.Screen name="Shops" component={DrawerStack} />
        </Drawer.Navigator>
    )
}

//  Shop Details
function ShopDetailsScreen({ navigation }) {
    const ShopDetailsStack = createStackNavigator()
    const goToCart = () => {
        return (
            <TouchableHighlight underlayColor="white" style={{ width: 35, height: 35 }} onPress={() => navigation.navigate('Modal')}>
                <FontAwesome name="shopping-bag" size={20} color={Color.mainBlue} />
            </TouchableHighlight >
        )
    }
    return (
        <ShopDetailsStack.Navigator screenOptions={{ headerShown: true }}>
            <ShopDetailsStack.Screen name="Details" options={{ title: "Details", headerRight: goToCart }} component={ShopDetails} />
        </ShopDetailsStack.Navigator>
    )
}

// You
function YouScreen({ navigation }) {
    const YouStack = createStackNavigator()
    const leftButton = () => <Icon.Button underlayColor="white" onPress={() => navigation.navigate('Home')} name="information-circle-outline" style={{ backgroundColor: "white", paddingLeft: 15 }} size={30} color={Color.mainBlue} />
    const rightButton = () => <Icon.Button underlayColor="white" onPress={() => navigation.navigate('Settings')} name="settings-outline" style={{ backgroundColor: "white" }} size={25} color={Color.mainBlue} />

    return (
        <YouStack.Navigator>
            <YouStack.Screen name="Account" options={{ title: "Account", headerLeft: leftButton, headerRight: rightButton }} component={You} />
        </YouStack.Navigator>
    )
}

module.exports = {
    HomeScreen,
    // GetTailorScreen,
    LaundryScreen,
    OrdersScreen,
    SettingsScreen,
    YouScreen,
}