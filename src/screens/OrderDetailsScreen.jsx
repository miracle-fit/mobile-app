import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView } from 'react-native'
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';
import { Color } from "../global/Colors"
import { Fonts } from "../global/Fonts"

class OrderDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tailor: 'Brayhan De Aza',
            date: 'Jul 10, 2021',
            details: 'I want to fix a jacket that I have long time ago.',
            time: '4 pm',
            orderId: "fgnfdkjgn"
        }
    }

    componentDidMount() {
        console.log(this.props.route.state)
    }

    handleDeleteCancelOrder = () => {
        // const { orderId } = this.props.route.params
        console.log(this.props)
        this.setState({ dialogVisible: false })
    }

    render() {
        const { tailor, date, details, time, orderId } = this.state
        return (
            <View style={styles.Summery}>
                <ScrollView contentContainerStyle={styles.Scroll}>
                    <View style={styles.Main}>
                        <View style={styles.StatusContainer}>
                            <View style={styles.Status}>
                                <View style={styles.CircleShadow}>
                                    <View style={styles.Circle} />
                                </View>
                                <View style={styles.StatusTitleContainer}>
                                    <Text style={[styles.StatusTitle, {}]}>Order Placed on July 27</Text>
                                </View>
                            </View>
                            <View style={styles.Dash}>
                                <Text style={[styles.DashText, {}]}>-</Text>
                                <Text style={[styles.DashText, {}]}>-</Text>
                                <Text style={[styles.DashText, {}]}>-</Text>
                                <Text style={[styles.DashText, {}]}>-</Text>
                            </View>
                            <View style={styles.Status}>
                                <View style={[styles.CircleShadow, { backgroundColor: "rgba(000, 000, 000, 0.04)" }]}>
                                    <View style={[styles.Circle, { backgroundColor: "rgba(000, 000, 000, 0.07)", }]} />
                                </View>
                                <View style={styles.StatusTitleContainer}>
                                    <Text style={[styles.StatusTitle, { color: "rgba(000, 000, 000, 0.2)", }]}>Getting Tailored</Text>
                                </View>
                            </View>
                            <View style={styles.Dash}>
                                <Text style={[styles.DashText, {}]}>-</Text>
                                <Text style={[styles.DashText, {}]}>-</Text>
                                <Text style={[styles.DashText, {}]}>-</Text>
                                <Text style={[styles.DashText, {}]}>-</Text>
                            </View>
                            <View style={styles.Status}>
                                <View style={[styles.CircleShadow, { backgroundColor: "rgba(000, 000, 000, 0.04)" }]}>
                                    <View style={[styles.Circle, { backgroundColor: "rgba(000, 000, 000, 0.07)", }]} />
                                </View>
                                <View style={styles.StatusTitleContainer}>
                                    <Text style={[styles.StatusTitle, { color: "rgba(000, 000, 000, 0.2)", }]}>Order Completed</Text>
                                </View>
                            </View>
                            <View style={styles.OrderDetailsContainer}>
                                <View style={styles.OrderDetails}>
                                    <View style={styles.OrderDetailsTalorAndId} >
                                        <Text style={[styles.OrderDetailsTitle, {}]}>Tailor</Text>
                                        <Text style={[styles.OrderDetailsTitle, {}]}>#A:16003503</Text>
                                    </View>
                                    <TouchableHighlight style={styles.Tailor} underlayColor="white" onPress={() => alert()}>
                                        <Text style={[styles.OrderDetailsText, {}]}>{tailor}</Text>
                                    </TouchableHighlight>
                                    <View style={styles.OrderDetailsDescription}>
                                        <Text style={[styles.OrderDetailsTitle, { marginBottom: 5, color: Color.mainBlue }]}>Schedele</Text>
                                        <Text style={[styles.OrderDetailsTitle, { marginBottom: 5, color: "rgba(000, 000, 000, 0.6)", }]}>{`${date}, ${time}`}</Text>
                                    </View>
                                    <View style={[styles.OrderDetailsDescription, { borderColor: "white", marginTop: 0 }]}>
                                        <Text style={[styles.OrderDetailsTitle, { marginBottom: 5, fontWeight: "bold", color: Color.mainBlue, }]}>Details</Text>
                                        <Text style={[styles.OrderDetailsTitle, { marginBottom: 5, color: "rgba(000, 000, 000, 0.6)", }]}>{details}</Text>
                                    </View>
                                    <TouchableHighlight style={styles.OrderDetailsContacts} underlayColor="white" onPress={() => alert()}>
                                        <Text style={[styles.OrderDetailsTitle, { color: Color.mainBlue, }]}>Contact Us</Text>
                                    </TouchableHighlight>
                                </View>
                                <TouchableHighlight style={styles.OrderDetailsContacts} underlayColor="white" onPress={() => this.setState({ dialogVisible: true })}>
                                    <Text style={[styles.OrderDetailsTitle, { color: "red", }]}>Cancel Order</Text>
                                </TouchableHighlight>
                                <ConfirmDialog title="Are you sure you want o cancel this order?" visible={this.state.dialogVisible} onTouchOutside={() => this.setState({ dialogVisible: false })}
                                    positiveButton={{ title: "Yes", onPress: () => this.handleDeleteCancelOrder() }} negativeButton={{ title: "No", onPress: () => this.setState({ dialogVisible: false }) }} >
                                </ConfirmDialog>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    Summery: {
        flex: 1,
        backgroundColor: "white",
    },
    Arrow: {
        width: 25,
        height: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
    },
    TitleConatiner: {
        width: "100%",
        height: 100,
        paddingLeft: 20,

        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    Title: {
        fontSize: 30,
        fontWeight: "bold"
    },
    Scroll: {
        paddingTop: 30,
        paddingBottom: 50,

    },
    Main: {
        width: "100%",
        height: "100%",


        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    StatusContainer: {
        width: "100%",
        height: "100%",

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    Status: {
        width: "100%",
        height: 50,
        paddingLeft: 20,

        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    StatusTitleContainer: {
        width: "100%",
        // height: "100%",
        paddingLeft: 20,

        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    StatusTitle: {
        fontSize: 16,
        color: "rgba(000,000,000,0.6)",
        fontFamily: Fonts.interRegular
    },
    CircleShadow: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: Color.clearBlue,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    Circle: {
        width: 15,
        height: 15,
        borderRadius: 100,
        backgroundColor: Color.mainBlue
    },
    Dash: {
        width: "100%",
        height: 75,
        paddingTop: 10,

        display: "flex",
        justifyContent: "flex-start",
    },
    DashText: {
        width: 75,
        height: 13,
        color: "rgba(000,000,000,0.6)",
        textAlign: "center",
        fontSize: 12,
    },
    OrderDetailsContainer: {
        width: "100%",
        paddingTop: 40,

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    OrderDetails: {
        width: "90%",
        // height: 200,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        borderWidth: 0.5,
        borderColor: "rgba(000,000,000,0.2)",
        borderRadius: 10
    },
    OrderDetailsTalorAndId: {
        width: "100%",
        marginBottom: 10,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    OrderDetailsTitle: {
        fontSize: 15,
        color: "rgba(000,000,000,0.5)",
        fontWeight: "600",
        fontFamily: Fonts.interRegular
    },
    Tailor: {
        // paddingTop: 5,
        paddingBottom: 5,
        // borderBottomWidth: 0.5,
        // borderColor: "rgba(43, 169, 123, 0.7)"
    },
    OrderDetailsText: {
        fontSize: 18,
        color: Color.mainBlue,
        fontWeight: "600",
        textTransform: "capitalize",
        textDecorationLine: "underline"
    },
    OrderDetailsDescription: {
        width: "90%",
        marginTop: 50,
        // backgroundColor: "red",
        paddingTop: 20,
        paddingBottom: 20,
        borderTopWidth: 0.5,
        borderColor: "rgba(000,000,000,0.2)",
    },
    OrderDetailsContacts: {
        width: "100%",
        // marginTop: 20,
        // backgroundColor: "red",
        paddingTop: 20,
        paddingBottom: 30,

        display: "flex",
        alignItems: "center"
    }
})


export default OrderDetail
