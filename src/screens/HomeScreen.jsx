import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableHighlight, Image, Platform } from 'react-native'
import { Fonts } from "../global/Fonts"
import { Color } from "../global/Colors"
import { Customize } from "../global/Image"
import { Heading, NativeBaseProvider } from "native-base"
// import AsyncStorage from "@react-native-community/async-storage"

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }
    render() {
        return (
            <NativeBaseProvider>
                <View style={styles.Appointments}>
                    <View style={styles.ItemsOption}>
                        <Heading style={[styles.IconsOptionText, { fontSize: 26, fontWeight: "600" }]}>{"Get a Tailor. "}</Heading>
                        <Heading style={[styles.IconsOptionText, { fontSize: 26, color: Color.mainBlue, fontWeight: "600" }]}>{"From Home"}</Heading>
                    </View>
                    <View>
                        <Text style={[styles.IconsOptionText, { color: "rgb(112,112,112)", position: "relative", bottom: 15 }]}>{"By. Miracle Fit"}</Text>
                    </View>
                    <View style={styles.TouchableComponent}>
                        <Image source={Customize} style={styles.ItemsImage} />
                    </View>
                    <TouchableHighlight style={styles.Touchable} underlayColor="#f6f6f6" onPress={() => this.props.navigation.navigate("Tailor")}>
                        <Heading size={"sm"} style={[styles.IconsOptionText, { color: "rgb(112,112,112)", textTransform: "uppercase" }]}>{"Get a Tailor"}</Heading>
                    </TouchableHighlight>
                </View>
            </NativeBaseProvider>
        )
    }
}

export default Home

const styles = StyleSheet.create({
    Appointments: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 10,

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    TouchableComponent: {
        width: "100%",
        height: "40%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"


    },
    Touchable: {
        width: 300,
        height: 60,
        borderRadius: 10,
        marginBottom: 30,
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
    ItemsImage: {
        width: 200,
        height: 200,
        marginBottom: 10,


        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,

    },
    ItemsOption: {
        width: "100%",
        height: 70,

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    IconsOptionText: {
        paddingBottom: 5,
        // fontFamily: Fonts.interRegular

    },
})