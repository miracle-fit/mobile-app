import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableHighlight, Linking } from 'react-native'
import { Color } from '../global/Colors'
import { Fonts } from '../global/Fonts'
import { Switch } from "react-native-paper"
import { Instagram, Facebook, Twitter } from "../global/Image"


// redux

const { height } = Dimensions.get("screen")

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ["Notifications", "Privacy Policy"],
            isNotificationOn: true,
            socialMedia: [Instagram, Facebook, Twitter]
        }
    }

    handleNotificationState = (e) => {
        this.setState({
            isNotificationOn: !this.state.isNotificationOn,
        })
    }

    handdleOnPressArrow = (view) => {
        const { pView } = this.props.state.Footer
        switch (pView) {
            case "isHome":
                Actions.Home()
                break;
            case "isOrders":
                Actions.Orders()
                break;
            case "isPrices":
                Actions.Prices()
                break;
            case "isProfile":
                Actions.Profile()
                break;
        }
        this.props.dispatch({ type: pView })
    }

    onSocialMedia = (e, key) => {
        // console.log(e, key)
        switch (key) {
            case 0:
                Linking.openURL('https://www.instagram.com/brayhandeaza/')
                break
            case 2:
                Linking.openURL('instagram://brayhandeaza')
                break
            case 2:
                Linking.openURL('twitter://timeline')
                break
            default:
                break
        }
    }


    render() {
        const { isNotificationOn, title } = this.state
        return (
            <View style={styles.Profile}>
                <View style={styles.ProfilePictureContainer}>
                    <View style={[styles.ProfilePictureImgBox, { borderColor: Color.clearGray }]}>
                        {/* <Image style={styles.ProfilePicture} source={Avatar} /> */}
                        <Text style={{ fontSize: 35, color: Color.lightGray, fontFamily: Fonts.interRegular }}>BD</Text>
                    </View>
                    <View>
                        <Text style={styles.ProfileTitle}>Brayhan De Aza</Text>
                    </View>
                </View>
                <View style={styles.ProfileTitlesContainer}>
                    {title.map((title, i) => (
                        <View key={i} style={styles.ProfileTitlesBox}>
                            <TouchableHighlight underlayColor="white" onPress={title != "Notifications" ? (e) => { } : null}>
                                <Text style={[styles.ProfileHeaderText, {}]}>{title}</Text>
                            </TouchableHighlight>
                            {title == "Notifications" ?
                                <Switch value={isNotificationOn} color={Color.mainBlue} onValueChange={this.handleNotificationState} />
                                : null}
                        </View>
                    ))}
                    <View style={styles.SocialMediaContainer}>
                        {[Instagram, Facebook, Twitter].map((icon, key) => (
                            <TouchableHighlight underlayColor="rgba(000,000,000,0.09)" key={key} style={styles.SocialMediaBox} onPress={(e) => this.onSocialMedia(e, key)}>
                                <Image style={{ width: 25, height: 25 }} source={icon} />
                            </TouchableHighlight>
                        ))}
                    </View>
                    <TouchableHighlight style={styles.Logout} underlayColor="white">
                        <Text style={[styles.ProfileHeaderText, { color: Color.mainBlue }]}>{"Log Out"}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    SocialMediaContainer: {
        width: "100%",
        marginTop: 50,
        paddingTop: 20,
        // height: 120,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    SocialMediaBox: {
        width: 50,
        height: 50,
        // backgroundColor: "red",
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
    },
    Profile: {
        width: "100%",
        height: "100%",
        paddingTop: 50,
        backgroundColor: "white"
    },
    PushBotsContainer: {
        width: 60,
        height: 35,
        borderRadius: 20,
        paddingLeft: 3,
        paddingRight: 3,
        backgroundColor: "#e4d9d5",

        display: "flex",
        justifyContent: "center",

    },
    Header: {
        width: "100%",
        height: 100,
        backgroundColor: "rgba(255, 255, 255, 0.3)",

    },
    Touchable: {
        width: "100%",
        height: 100,
        paddingLeft: 25,
        paddingBottom: 10,

        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start"
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
    PushBotsButton: {
        width: 30,
        height: 30,
        borderRadius: 100

    },
    ProfileHeaderContainer: {
        width: "100%",
        height: 110,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    ProfileHeaderContainerImgBox: {
        width: 40,
        height: 40,
        borderRadius: 50,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    },
    ProfileHeaderContainerGift: {
        width: 20,
        height: 20,
    },
    ProfileHeaderText: {
        fontSize: 24,
        fontWeight: "600",
        fontFamily: Fonts.interRegular
    },
    SloganContainer: {
        width: "100%",
        height: 85,
        // backgroundColor: "red",

        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    },
    ProfilePictureContainer: {
        width: "100%",
        height: 170,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    ProfilePicture: {
        width: 135,
        height: 135,
        borderRadius: 100,


    },
    ProfilePictureImgBox: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderWidth: 1.5,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    ProfileTitle: {
        fontSize: 24,
        fontWeight: "bold",
        paddingTop: 20,
        color: "rgba(000,000,000, 1)",
        fontFamily: Fonts.interRegular
    },
    ProfileTitlesContainer: {
        width: "100%",
        height: height - (160 + 110),
        paddingTop: 50,
        paddingLeft: 30,
        paddingRight: 35,

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    ProfileHeaderText: {
        fontSize: 18,
        color: "rgba(000,000,000, 0.6)",
        fontWeight: "600",
        fontFamily: Fonts.interRegular
    },
    ProfileTitlesBox: {
        width: "100%",
        height: 75,

        // borderBottomWidth: 0.6,
        // borderColor: "rgba(000,000,000, 0.2)",

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        // backgroundColor: "red"
    },
    Logout: {
        width: "100%",
        height: 75,
        paddingTop: 10,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
})

export default Profile