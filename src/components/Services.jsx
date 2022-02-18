import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"


export class Services extends Component {
    render() {
        return (
            <View style={styles.Services}>
                <View style={styles.Category}>
                    <Icon style={{ color: "#3488e4"}} size={40} name="american-football-outline" />
                </View>
                <View style={styles.Category}>
                    <Icon style={{ color: "#3488e4"}} size={40} name="american-football-outline" />
                </View>
                <View style={styles.Category}>
                    <Icon style={{ color: "#3488e4"}} size={40} name="american-football-outline" />
                </View>
                <View style={styles.Category}>
                    <Icon style={{ color: "#3488e4"}} size={40} name="american-football-outline" />
                </View>
               
            </View>
        )
    }
}

export default Services


const styles = StyleSheet.create({
    Services: {
        width: "100%",
        height: 150,
        backgroundColor: "pink",
        marginTop: 10,
        

        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    Category: {
        width: 180,
        height: "100%",
        borderRadius: 20,
        backgroundColor: "lightgray",

        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
})