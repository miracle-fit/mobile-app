import React, { Component } from 'react'
import { StyleSheet, SafeAreaView, TextInput, View, TouchableHighlight, Linking } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker'
import moment from "moment"
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper'
import { Color } from "../global/Colors"
import { Fonts } from "../global/Fonts"
import { Ionicons } from '@expo/vector-icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export class GetTailor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            fullName: "",
            details: "",
            phone: "",
            address: "",
            date: new Date(),
            dateToShow: "MM-DD-YYYY",
            time: "",
            placedOn: "",
            daySelected: moment().format("YYYY-MM-DD"),
            openDate: false,
            showModal: false
        }
    }

    onChangeText = (text, state) => {
        this.setState({
            [state]: text
        })
    }

    onSocialMedia = (e, key) => {
        // console.log(e, key)
        switch (key) {
            case 0:
                Linking.openURL('https://www.instagram.com/brayhandeaza/')
                break
            case 2:
                Linking.openURL('facebook://SoyBrayhanDeAza')
                break
            case 2:
                Linking.openURL('https://www.twitter.com/brayhandeaza/')
                break
            default:
                break
        }
    }

    handleOnPress = async () => {
        // await axios.post("http://localhost:3000/appointments/1", {
        //     fullName: "Hilda De Aza",
        //     details: "Hola yo quiero un suits y una camisas ",
        //     phone: "646-982-7293",
        //     address: "1623 popham ave bronx, NY 10453",
        //     date: "10-13-2020",
        //     time: "04:00 pm",
        //     placedOn: "2020-11-26"
        // }).then((res) => {
        //     console.log(res.data)
        // }).catch((err) => {
        //     console.log(err)
        // })
        console.log(this.state)
        this.props.navigation.navigate('Home')
    }

    onDayPress = (day) => {
        this.setState({
            daySelected: day.dateString
        })
        console.log(day.dateString)
    }

    setDate = () => {

    }

    onConfirmDate = (date) => {
        this.setState({
            date,
            openDate: false
        })
    }

    onDateChange(date) {
        console.log(date)
    }

    calendar = () => {
        return (
            <Provider>
                <View style={{ padding: 20, flex: 1 }}>
                    <Portal>
                        <Modal visible={this.state.showModal} onDismiss={() => this.setState({ showModal: false })} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 10, borderRadius: 5 }}>
                            <CalendarPicker
                                previousTitleStyle={{ paddingLeft: 5, fontWeight: "bold" }}
                                monthTitleStyle={{fontWeight: "bold"}}
                                todayBackgroundColor="white"
                                selectedDayColor={Color.clearBlue}
                                // selectedDayTextColor="red"
                                onDateChange={this.onDateChange}

                            />
                        </Modal>
                    </Portal>
                    <Button style={{ marginTop: 30 }} onPress={this.state.showModal}>
                        Show
                    </Button>
                </View>
            </Provider>

        )
    }

    render() {
        const { navigation } = this.props
        const { fullName, phone, date, details } = this.state
        return (
            <SafeAreaView style={{ backgroundColor: "white", padding: 20 }}>
                <KeyboardAwareScrollView style={{ height: "100%" }}>
                    <Text style={styles.Title}>Book a Tailor</Text>
                    <View style={styles.Tailor}>
                        <Text style={styles.Label}>Full Name</Text>
                        <View style={styles.TextInputCointainer}>
                            <Ionicons name="lock-closed-outline" size={18} color="gray" />
                            <TextInput value={fullName} style={styles.TextInput} placeholder="Name" onChangeText={(text) => this.onChangeText(text, "fullName")} />
                        </View>
                    </View>
                    <View style={styles.Tailor}>
                        <Text style={styles.Label}>Phone</Text>
                        <View style={styles.TextInputCointainer}>
                            <Ionicons name="call-outline" size={18} color="gray" />
                            <TextInput value={phone} style={styles.TextInput} placeholder="Phone" onChangeText={(text) => this.onChangeText(text, "phone")} />
                        </View>
                    </View>
                    <TouchableHighlight underlayColor={"white"} onPress={() => this.setState({ showModal: true })}>
                        <View style={styles.Tailor}>
                            <Text style={styles.Label}>Date</Text>
                            <View style={[styles.TextInputCointainer, { height: 50 }]}>
                                <Ionicons name="calendar-outline" size={18} color="gray" />
                                <Text style={{ paddingLeft: 10, color: "rgba(000,000,000,0.2)" }}>{this.state.dateToShow}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.Tailor}>
                        <Text style={styles.Label}>Quantity</Text>
                        <View style={styles.TextInputCointainer}>
                            <Ionicons name="add-circle-outline" size={18} color="gray" />
                            <TextInput value={phone} keyboardType="number-pad" style={styles.TextInput} placeholder="0" onChangeText={(text) => this.onChangeText(text, "phone")} />
                        </View>
                    </View>
                    <View style={styles.Tailor}>
                        <Text style={styles.Label}>Details</Text>
                        <View style={[{ padding: 10, paddingRight: 10, borderWidth: 0.5.toFixed, borderRadius: 10, borderColor: "rgba(000,000,000,0.15)" }]}>
                            <TextInput value={details} multiline style={{ height: 100 }} numberOfLines={4} placeholder="Details..." onChangeText={(text) => this.onChangeText(text, "details")} />
                        </View>
                        <TouchableHighlight onPress={this.handleOnPress} underlayColor="rgba(000,000,256,0.09)" style={styles.Submit}>
                            <Text onPress={() => navigation} style={{ color: "white", fontWeight: "bold", fontFamily: Fonts.interRegular }}>Submit</Text>
                        </TouchableHighlight>
                    </View>
                </KeyboardAwareScrollView>
                {this.calendar()}
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    date: {
        paddingLeft: 10,
        color: "rgba(000,000,000,0.6)",
    },
    Submit: {
        width: "100%",

        height: 60,
        backgroundColor: Color.mainBlue,
        marginTop: 20,
        borderRadius: 15,

        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    Footer: {
        width: "100%",
        // height: 100,
        position: "absolute",
        bottom: 50
    },
    Label: {
        fontWeight: "bold",
        fontSize: 18,
        color: "rgba(000,000,000,0.6)",
        fontFamily: Fonts.interRegular,
        paddingBottom: 7

    },
    Title: {
        fontSize: 26,
        padding: 20,
        paddingTop: 40,
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: Fonts.interBlack

    },
    TextInput: {
        width: "100%",
        height: 50,
        borderWidth: 1.2,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 0,
    },
    TextInputCointainer: {
        paddingLeft: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "rgba(000,000,000,0.2)",
    },
    Tailor: {
        width: "100%",
        backgroundColor: "white",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20
    },
    SocialMediaContainer: {
        width: "100%",
        marginTop: 10,
        paddingTop: 20,
        height: 100,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    SocialMediaBox: {
        width: 50,
        height: 50,
        borderRadius: 15,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

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
    }
})

export default GetTailor
