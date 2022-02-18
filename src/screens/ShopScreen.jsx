import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, TextInput } from 'react-native'
import { Fonts } from "../global/Fonts"
import { Color } from "../global/Colors"
import { Suit, Trouser, All, Shirt, Tie } from "../global/Image"
import Icon from "react-native-vector-icons/Ionicons"
import Svg, { Path } from "react-native-svg"
import { suits } from "../../mocks/shop";


export class ShopScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likeIt: false,
            categories: [
                {
                    title: "All",
                    icon: All.path.d
                },
                {
                    title: "Suits",
                    icon: Suit.path.d
                },
                {
                    title: "Pants",
                    icon: Trouser.path.d
                },
                {
                    title: "Shirts",
                    icon: Shirt.path.d
                },
                {
                    title: "Ties",
                    icon: Tie.path.d
                },
            ],
            category: {
                All: true,
                Suits: false,
                Pants: false,
                Shirts: false,
                Ties: false,
            }
        }
    }
    handleDrawer = ({ navigation }) => {
        navigation.toggleDrawer()
    }

    handleFolterd = (param, e) => {
        e.stopPropagation()
        this.setState({
            category: {
                All: param === "All" ? true : false,
                Suits: param === "Suits" ? true : false,
                Pants: param === "Pants" ? true : false,
                Shirts: param === "Shirts" ? true : false,
                Ties: param === "Ties" ? true : false,
            }
        })
    }

    render() {
        
        const { likeIt, categories, category } = this.state
        const { navigation } = this.props
        
        return (
            <View style={{ backgroundColor: "white" }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ShopScreen}>
                    <View style={{ width: "100%", paddingLeft: 20, paddingBottom: 20 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 28, fontFamily: Fonts.interBlack }}>Category</Text>
                    </View>
                    <View style={styles.Category}>
                        {suits.slice(0, 5).map((item, key) => (
                            <View key={key} style={{ display: "flex", justifyContent: "center" }}>
                                <TouchableHighlight style={{ borderRadius: 15 }} underlayColor={category[categories[key].title] ? "white" : Color.lightGray} onPress={category[categories[key].title] ? () => { } : (e) => this.handleFolterd(categories[key].title, e)}>
                                    <View style={styles.CategoryItem}>
                                        <Svg width={35} height={39} viewBox={categories[key].title === "Suits" ? "0 0 37 48" : categories[key].title === "Ties" ? "0 0 64 64" : "0 0 511.998 511.998"}>
                                            <Path d={categories[key].icon} fill={category[categories[key].title] ? Color.mainBlue : Color.warmGray} />
                                        </Svg>
                                    </View>
                                </TouchableHighlight>
                                <View style={{ width: "100%", paddingTop: 5, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ textTransform: "capitalize", fontFamily: Fonts.interRegular, color: category[categories[key].title] ? Color.mainBlue : Color.warmGray }}>{categories[key].title}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.Filter}>
                        <Text style={{ fontFamily: Fonts.interBlack, fontSize: 16, paddingRight: 10 }}>Filter</Text>
                        <TouchableHighlight underlayColor="white" onPress={() => this.handleDrawer({ navigation })}>
                            <Icon name="filter" style={styles.FilterIcon} size={25} color={"black"} />
                        </TouchableHighlight>
                    </View>
                    {suits.map((item, key) => (
                        <TouchableHighlight key={key} underlayColor="white" style={styles.Items} onPress={() => navigation.navigate("Details")}>
                            <View>
                                <View style={styles.ImageContainer} >
                                    <TouchableHighlight underlayColor="white" style={styles.TouchableIcon} onPress={() => this.setState({ likeIt: !likeIt })}>
                                        <Icon name="heart" size={20} color={item.wished ? Color.mainBlue : Color.lightGray} />
                                    </TouchableHighlight>
                                    <Image style={styles.Image} resizeMode={"stretch"} source={item.image} />
                                </View>
                                <View style={{ paddingLeft: 10, paddingTop: 5 }}>
                                    <Text style={{ fontSize: 16, fontFamily: Fonts.interBlack }}>{item.title}</Text>
                                    <Text style={{ fontSize: 16, fontFamily: Fonts.interRegular, color: Color.lightGray }}>$299.99</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    ))}
                </ScrollView>
            </View>
        )
    }
}

export default ShopScreen
const styles = StyleSheet.create({
    ShopScreen: {
        width: "100%",
        paddingTop: 15,
        backgroundColor: "white",

        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    },
    Items: {
        width: "45%",
        height: 275,
        borderRadius: 10,
        backgroundColor: "white",
        marginBottom: "3.5%",

        borderWidth: 0.1,
        borderColor: Color.lightGray,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
    },
    ImageContainer: {
        width: "100%",
        height: 220,
        borderRadius: 10,
        display: "flex",
        alignItems: "flex-end",
    },
    Image: {
        height: "100%",
        width: "100%",
        borderRadius: 10,
        borderBottomRightRadius: 0.9,
        borderBottomLeftRadius: 0.9,

        position: "absolute",
        zIndex: 0,
    },
    TouchableIcon: {
        width: 30,
        height: 30,
        backgroundColor: "white",
        zIndex: 1,
        borderRadius: 100,
        paddingTop: 3,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,

        position: "relative",
        right: 10,
        top: 10,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    Category: {
        width: "100%",
        height: 100,
        marginBottom: 25,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    CategoryItem: {
        width: 65,
        height: 65,
        backgroundColor: "white",
        borderRadius: 15,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    TextInputContainer: {
        width: "100%",
        height: 50,
        backgroundColor: "pink",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    Filter: {
        width: "100%",
        height: 50,
        paddingLeft: 20,
        paddingBottom: 20,
        // backgroundColor: "pink",

        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    FilterIcon: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
    }
})
