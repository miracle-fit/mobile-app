import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableHighlight, Dimensions } from 'react-native'
import { Fonts } from '../global/Fonts'
import { Color } from '../global/Colors'
import { orders } from '../../mocks/orders'
import axios from 'axios'
import moment from "moment"

const { width } = Dimensions.get("screen")

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
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
        await axios.get("http://192.168.0.146:3000/appointments").then((res) => {
            this.setState({
                appointments: res.data.appointments
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
    }



    render() {
        return (
            <View style={styles.Appointments}>
                {!this.state.appointments.length == 0 ?
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.Scroll}>
                        {this.state.appointments.map((appointment, key) => (
                            <TouchableHighlight underlayColor="white" key={key} style={styles.Orders} onPress={(e) => this.handleOnPress(appointment.id)}>
                                <View style={styles.DetailsBox}>
                                    <View style={styles.Top}>
                                        <Text style={{ fontSize: 20, color: "#000000", fontWeight: "bold", fontFamily: Fonts.interRegular, textTransform: "capitalize" }}>{appointment.fullName}</Text>
                                        <Text style={{ paddingRight: 10, fontFamily: Fonts.interRegular }}>{`#${appointment.appointmentId.slice(0, 10)}`}</Text>
                                    </View>
                                    <View style={styles.Bottom}>
                                        <View style={styles.BottomLeft}>
                                            <Text style={{ fontSize: 15, color: "rgba(112,112,112,1)", fontFamily: Fonts.interRegular }}>Tailor</Text>
                                            <Text style={{ fontSize: 15, color: "rgba(000,000,000,0.7)", paddingTop: 5, fontFamily: Fonts.interRegular, textTransform: "capitalize", fontWeight: "bold" }}>{appointment.tailor}</Text>
                                        </View>
                                        <View style={styles.BottomRight}>
                                            <Text style={{ fontSize: 15, color: "rgba(112,112,112,1)", fontFamily: Fonts.interRegular, }}>Schedule</Text>
                                            <Text style={{ fontSize: 15, color: "rgba(000,000,000,0.8)", fontFamily: Fonts.interRegular, paddingTop: 5 }}>{`${moment(appointment.date).format('LLL')}`}</Text>
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