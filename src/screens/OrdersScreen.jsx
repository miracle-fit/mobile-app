import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableHighlight, Dimensions, Image } from 'react-native'
import { Fonts } from '../global/Fonts'
import { Color } from '../global/Colors'
import axios from 'axios'
import moment from "moment"
import { Heading, NativeBaseProvider } from "native-base";

import laundry from "../assets/img/icons/laundry.png"
import tailoring from "../assets/img/icons/tailoring.png"

const { width } = Dimensions.get("screen")

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            orders: [],
            items: ["All", "Completed", "Requested", "Canceled"],
            Filter: {
                isAll: true,
                isCompleted: false,
                isRequested: false,
                isCanceled: false,
                bgColor: ""
            },
            filterTitle: "requested"
        }
    }

    fetAppointments = async () => {
        await axios.get("http://localhost:3000/appointments").then((res) => {
            this.setState({
                appointments: res.data.data
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    fetOders = async () => {
        await axios.get("http://localhost:3000/orders").then((res) => {
            this.setState({
                orders: res.data.data
            })
        }).catch((err) => {
            console.log(err)
        });
    }

    handleOnPress = (id) => {
        this.props.navigation.navigate("OrderDetail", {
            itemId: 86,
            otherParam: 'anything you want here',
        })
    }

    handleOnPressEmpty = () => {
        this.props.navigation.navigate("Tailor", {
            id: 0
        })
    }

    componentDidMount() {
        this.fetAppointments()
        this.fetOders()
        this.props.navigation.addListener('focus', () => {
            this.fetOders()
        })
    }



    render() {
        const { appointments, orders } = this.state
        const sortByDate = appointments.concat(orders).sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        console.log(sortByDate, "sort")
        return (
            <NativeBaseProvider>
                <View style={styles.Appointments}>
                    {sortByDate.length > 0 ?
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.Scroll}>
                            {sortByDate.map((appointment, key) => (
                                <TouchableHighlight underlayColor="white" key={key} style={styles.Orders} onPress={(e) => this.handleOnPress(appointment.id)}>
                                    <View style={styles.DetailsBox}>
                                        <View style={styles.Top}>
                                            <Heading size={"md"} style={{ textTransform: "capitalize" }}>{appointment.user.fullName}</Heading>
                                            <Heading size={"xs"} style={{ paddingRight: 10, color: "rgba(112,112,112,1)" }}>{`#${"423543654725"}`}</Heading>
                                        </View>
                                        <View style={styles.Bottom}>
                                            <View style={styles.BottomLeft}>
                                                <Image source={appointment.isAOrder ? laundry : tailoring} style={{ width: 30, height: 30 }} />
                                            </View>
                                            <View style={styles.BottomRight}>
                                                <Heading size={"xs"} style={{ color: "rgba(112,112,112,1)"}}>Schedule</Heading>
                                                <Heading size={"xs"} style={{ fontSize: 15, color: "rgba(112,112,112,1)", paddingTop: 5 }}>{`${moment(appointment.date).format('LLL')}`}</Heading>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            ))}
                        </ScrollView> :
                        <View style={styles.Empty}>
                            <Text style={{ fontSize: 18, color: "rgba(000,000,000,0.8)", fontFamily: Fonts.interRegular, paddingTop: 5 }}>You do not have order yet</Text>
                            <Text onPress={() => this.handleOnPressEmpty()} style={{ fontSize: 18, color: "rgba(000,000,000,0.8)", fontFamily: Fonts.interRegular, paddingTop: 5, color: Color.mainBlue, textDecorationLine: "underline" }}>Would you like to play a new order?</Text>
                            <TouchableHighlight style={styles.TouchableTailor} underlayColor="#f6f6f6" onPress={() => this.handleOnPressEmpty()}>
                                <Text style={[styles.IconsOptionText, { color: "rgb(112,112,112)", fontSize: 20, textTransform: "uppercase" }]}>{"Get a Tailors"}</Text>
                            </TouchableHighlight>
                        </View>
                    }
                </View>
            </NativeBaseProvider>
        )
    }
}

const styles = StyleSheet.create({
    Appointments: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    Scroll: {
        width,
        paddingBottom: 15,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    Orders: {
        width: width - 30,
        height: 125,
        paddingLeft: 15,
        marginTop: 20,
        paddingTop: 15,
        borderRadius: 15,
        backgroundColor: "white",
        borderWidth: 0.5,
        borderColor: "rgba(112,112,112,0.3)",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    DetailsBox: {
        width: "100%",
        height: 80,
    },
    Top: {
        paddingRight: 15,
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    Bottom: {
        width: "100%",
        marginTop: 25,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    BottomLeft: {
        padding: 0,
        margin: 0,
        paddingRight: 20,
        borderRightWidth: 2,
        borderColor: "rgba(112,112,112,0.3)",
        display: "flex",
        justifyContent: "center",
    },
    BottomRight: {
        height: 40,
        paddingLeft: 20,
    },
    Status: {
        width: "100%",
        height: 50,
    },
    Touchable: {
        width: 100,
        height: 40,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "rgba(112,112,112,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    Empty: {
        width: "100%",
        height: "60%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    TouchableTailor: {
        width: 300,
        height: 60,
        borderRadius: 10,
        marginBottom: 30,
        marginTop: 30,
        backgroundColor: "white",
        borderWidth: Platform.OS == "android" ? 0.6 : 0.2,
        borderColor: "rgba(000,000,000,0.2)",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
})

export default Orders