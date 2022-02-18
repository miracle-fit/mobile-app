import React, { Component } from 'react'
import { StyleSheet, View, Button, TouchableHighlight, TextInput, Keyboard } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Divider, Text, Drawer } from 'react-native-paper'
import { Fonts } from "../global/Fonts"
import { Color } from "../global/Colors"
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'

export class DrawerScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "checked",
            filter: {
                category: ["Suits", "Pants", "Ties", "Shirts", "Jackets"],
                color: ["light blue", "lignt gray", "solid black", "Navy blue", "blazer"],
                material: ["Wool", "Cotton", "Polyester", "Chino", "Nylon", "Linen", "silk", "lycra", "bamboo fiber"],
            }
        }
    }

    handleToggleButton = (e) => {
        this.setState({
            status: this.state.status === 'checked' ? 'unchecked' : 'checked'
        })
    }

    hangleDrawer = () => {
        const { navigation } = this.props
        navigation.closeDrawer()
    }

    drawerSection = (title, data) => {
        return (
            <View>
                <Text style={{ fontFamily: Fonts.interRegular, fontSize: 16, width: "100%", marginTop: 15, paddingBottom: 10, color: Color.warmGray }}>{title}</Text>
                <Drawer.Section>
                    <View style={styles.Colors}>
                        {data.map((color, key) => (
                            <TouchableHighlight underlayColor="white" key={key} style={styles.ColorTouchable} onPress={() => { }}>
                                <Text style={{ textTransform: "capitalize" }}>{color}</Text>
                            </TouchableHighlight>
                        ))}
                    </View>
                </Drawer.Section>
            </View>
        )
    }

    render() {
       
        const { color, category, material } = this.state.filter
        return (
            <View style={{ flex: 1 }}>
                <DrawerContentScrollView onScroll={Keyboard.dismiss} showsVerticalScrollIndicator={false} style={{ padding: 18, paddingBottom: 0 }} keyboardShouldPersistTaps='handled' >
                        <Text style={{ fontFamily: Fonts.interBlack, fontSize: 28, paddingBottom: 10 }}>Filter</Text>
                        <Divider />
                        {this.drawerSection("Category", category)}
                    <Text style={{ fontFamily: Fonts.interRegular, fontSize: 16, paddingBottom: 10, width: "100%", marginTop: 15, color: Color.warmGray }}>Price</Text>
                    <Drawer.Section>
                        <View style={styles.Colors}>
                            <TextInput placeholder="Min." keyboardType="numeric" style={styles.TextInput} abel="Man." />
                            <Text>-</Text>
                            <TextInput placeholder="Max." keyboardType="number-pad" style={styles.TextInput} abel="Max." />
                        </View>
                    </Drawer.Section>
                        {this.drawerSection("Color", color)}
                        {this.drawerSection("Material", material)}
                </DrawerContentScrollView>
                <View style={{ paddingBottom: 15, display: "flex", flexDirection: "row", justifyContent: "space-around" }} >
                    <TouchableHighlight underlayColor={Color.clearBlue} style={[styles.ColorTouchable, { height: 45, backgroundColor: "white", borderWidth: 0.2, borderColor: "rgba(52, 137, 228, 1)" }]} onPress={() => this.hangleDrawer()}>
                        <Text style={{ textTransform: "capitalize", fontFamily: Fonts.interRegular, fontSize: 16, color: Color.mainBlue }}>Reset</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="white" style={[styles.ColorTouchable, { height: 45, backgroundColor: Color.mainBlue }]} onPress={() => { }}>
                        <Text style={{ textTransform: "capitalize", fontFamily: Fonts.interRegular, fontSize: 16, color: "white" }}>Apply</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    Colors: {
        paddingBottom: 15,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center"
    },
    ColorTouchable: {
        width: "45%",
        height: 35,
        backgroundColor: Color.clearGray,
        marginTop: 5,
        borderRadius: 5,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    TextInput: {
        width: "45%",
        height: 35,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: Color.clearGray
    }
})

export default DrawerScreen