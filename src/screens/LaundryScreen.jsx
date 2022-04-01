import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import { Fonts } from "../global/Fonts"
import { Color } from "../global/Colors"
import { Suit, Trouser, All, Shirt, Tie } from "../global/Image"
import { MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { suits } from "../../mocks/shop"
import { HStack, NativeBaseProvider, VStack, ZStack, Heading } from "native-base"
import SelectDropdown from 'react-native-select-dropdown'
import axios from 'axios'

import ironer from "../assets/img/icons/ironer.png"
import laundry from "../assets/img/icons/laundry.png"
import tailoring from "../assets/img/icons/tailoring.png"
import all from "../assets/img/icons/all.png"

const imageOption = [laundry, ironer, all]
const options = ["Wash Only", "Iron Only", "Wash & Iron"]
export class ShopScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cleaner: [],
            params: "men",
            cartQuantity: 0,
            quiantity: {
                tShirt: 0,
                jacket: 0,
                jean: 0,
                shirt: 0,
                trouser: 0
            },

            selectedValue: "Wash Only",
            value: "",
            items: [
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' }
            ],
            likeIt: false,
            categories: [
                {
                    title: "Men",
                    icon: All.path.d
                },
                {
                    title: "Women",
                    icon: Suit.path.d
                },
                {
                    title: "Kids",
                    icon: Trouser.path.d
                },
                {
                    title: "Other",
                    icon: Shirt.path.d
                },
                {
                    title: "Ties",
                    icon: Tie.path.d
                },
            ],
            category: {
                Men: true,
                Women: false,
                Pants: false,
                Other: false,
            },
            toDo: {
                men: {},
                women: {},
                kids: {},
                other: {}
            },
            prices: {
                men: {},
                women: {},
                kids: {},
                other: {}
            }
        }
    }

    onValueChange(value) {
        this.setState({
            selected: value,
        });
    }

    handleDrawer = ({ navigation }) => {
        navigation.toggleDrawer()
    }

    handleFilterd = (param, e) => {
        e.stopPropagation()
        this.setState({
            category: {
                Men: param === "Men" ? true : false,
                Women: param === "Women" ? true : false,
                Kids: param === "Kids" ? true : false,
                Others: param === "Other" ? true : false,
            },
            params: param.toLowerCase()
        })
    }

    handleQuantityPlus = (key) => {
        // const { tShirt, jacket, jean, shirt, trouser } = this.state
        const { tShirt, jacket, jean, shirt, trouser } = this.state.quiantity
        const quiantity = { tShirt, jacket, jean, shirt, trouser }

        switch (key) {
            case 0:
                quiantity.tShirt = quiantity.tShirt + 1
                break;
            case 1:
                quiantity.jacket = quiantity.jacket + 1
                break;
            case 2:
                quiantity.jean = quiantity.jean + 1
                break;
            case 3:
                quiantity.shirt = quiantity.shirt + 1
                break;
            case 4:
                quiantity.trouser = quiantity.trouser + 1
                break;
        }
        this.setState({
            quiantity
        })
    }

    handleQuantityMinus = (key) => {
        // const { tShirt, jacket, jean, shirt, trouser } = this.state
        const { tShirt, jacket, jean, shirt, trouser } = this.state.quiantity
        const quiantity = { tShirt, jacket, jean, shirt, trouser }

        switch (key) {
            case 0:
                quiantity.tShirt = quiantity.tShirt > 0 ? quiantity.tShirt - 1 : 0
                break;
            case 1:
                quiantity.jacket = quiantity.jacket > 0 ? quiantity.jacket - 1 : 0
                break;
            case 2:
                quiantity.jean = quiantity.jean > 0 ? quiantity.jean - 1 : 0
                break;
            case 3:
                quiantity.shirt = quiantity.shirt > 0 ? quiantity.shirt - 1 : 0
                break;
            case 4:
                quiantity.trouser = quiantity.trouser > 0 ? quiantity.trouser - 1 : 0
                break;
        }
        this.setState({
            quiantity
        })
    }

    handleQuantityValue = (key) => {
        const { quiantity } = this.state
        switch (key) {
            case 0:
                return quiantity.tShirt
            case 1:
                return quiantity.jacket
            case 2:
                return quiantity.jean
            case 3:
                return quiantity.shirt
            case 4:
                return quiantity.trouser
        }
    }

    handleAddToCart = async (item) => {
        const { name, price, category } = item
        const toDo = this.state.toDo[item.category][item.name] ? this.state.toDo[item.category][item.name] : "Wash Only"
        const tempPrice = toDo === "Wash & Iron" ? price * 2 : price

        await axios.post(`http://localhost:3000/carts`, { name, toDo, basePrice: price, price: tempPrice, category, userId: 1 }).then((res) => {
            this.fetCart()
        })
    }

    groupByKey = (array, key) => {
        return array
            .reduce((hash, obj) => {
                if (obj[key] === undefined) return hash;
                return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) })
            }, {})
    }

    fetCart = async () => {
        let tempCart = []
        await axios.get(`http://localhost:3000/carts/user/1`).then((res) => {
            const group = this.groupByKey(res.data.data, "name")
            for (const key in group) {
                tempCart.push({
                    quatity: group[key].length,
                    cart: group[key],
                    total: group[key][0].price * group[key].length
                })
            }
            this.setState({ cartQuantity: tempCart.length })
        })
    }

    fetCleaner = async () => {
        await axios.get(`http://localhost:3000/cleaner`).then((res) => {
            this.setState({ cleaner: res.data.data })
        })
    }

    handleOnSelect = (selectedValue, index, item) => {
        this.setState({
            toDo: {
                ...this.state.toDo,
                [item.category]: {
                    ...this.state.toDo[item.category],
                    [item.name]: selectedValue
                }
            },
            prices: {
                ...this.state.prices,
                [item.category]: {
                    ...this.state.prices[item.category],
                    [item.name]: index < 2 ? item.price : item.price * 2
                }
            }
        })
    }

    handlePrice = (key, price) => {
        switch (key) {
            case 0:
            case 1:
                return price
            case 2:
                return price * 2
        }
    }

    componentDidMount() {
        this.fetCart()
        this.fetCleaner()
        this.props.navigation.addListener('focus', () => {
            this.fetCart()
        })
    }

    render() {
        const { categories, category } = this.state
        const filterdCleaner = this.state.cleaner.filter((cleaner) => { return cleaner.category === this.state.params })
        return (
            <View style={{ height: "100%", backgroundColor: "white" }}>
                <SafeAreaView style={{ backgroundColor: "white" }} />
                <SafeAreaView style={{ height: "100%" }}>
                    <NativeBaseProvider>
                        <View style={{ backgroundColor: "white" }}>
                            <HStack justifyContent={"flex-end"} style={{ paddingRight: 10 }}>
                                <TouchableOpacity underlayColor="white" style={{ width: 35, height: 35, marginRight: 10, marginTop: 20 }} onPress={() => this.props.navigation.navigate("Cart")}>
                                    <ZStack justifyContent="center" alignItems={"center"}  >
                                        <MaterialCommunityIcons name="cart-minus" size={30} color={Color.mainGray} />
                                        <Text style={{ position: "absolute", top: -12, fontSize: 15, color: Color.mainBlue, fontFamily: Fonts.interBold }}>{this.state.cartQuantity}</Text>
                                    </ZStack>
                                </TouchableOpacity >
                            </HStack>
                            <View style={{ width: "100%", paddingLeft: 20, marginBottom: 30 }}>
                                <Heading size={"xl"}>Select Clothes</Heading>
                            </View>
                            <HStack justifyContent="space-evenly" style={[styles.Category]}>
                                {suits.slice(0, 4).map((item, key) => (
                                    <TouchableOpacity key={key} style={{ borderRadius: 25, backgroundColor: category[categories[key].title] ? Color.mainBlue : Color.clearGray, width: (100 / 5) + "%", justifyContent: "center" }} underlayColor={category[categories[key].title] ? "white" : Color.lightGray} onPress={category[categories[key].title] ? () => { } : (e) => this.handleFilterd(categories[key].title, e)}>
                                        <Text style={[styles.CategoryTitle, { color: category[categories[key].title] ? "white" : Color.warmGray }]}>{categories[key].title === "Other" ? "Others" : categories[key].title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </HStack>
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.ShopScreen]}>
                                {filterdCleaner.map((item, key) => (
                                    <VStack key={key} underlayColor="white" style={styles.Items}>
                                        <VStack flexDirection={"row"}>
                                            <View style={{ width: 50, paddingLeft: 30, alignItems: "center" }}>
                                                <Image source={{ uri: `http://localhost:3000/laundry/${item.image}` }} resizeMode="contain" style={{ width: 50, height: "100%" }} />
                                            </View>
                                            <VStack style={{ height: "100%", padding: 20, marginLeft: 20 }}>
                                                <HStack>
                                                    <Text style={{ fontWeight: "bold", fontSize: 20, fontFamily: Fonts.interBold, textTransform: "capitalize" }}>{item.name}</Text>
                                                </HStack>
                                                <HStack>
                                                    <SelectDropdown
                                                        buttonStyle={{ height: 50, width: 160, backgroundColor: "white", justifyContent: "flex-start", position: "relative", right: 15 }}
                                                        dropdownStyle={{ width: 200, borderRadius: 10 }}
                                                        data={options}
                                                        onSelect={(selectedValue, index) => this.handleOnSelect(selectedValue, index, item)}
                                                        defaultValueByIndex={0}
                                                        buttonTextAfterSelection={(selectedItem, index) => {
                                                            return (
                                                                <VStack style={{ height: 100 }}>
                                                                    <HStack alignItems={"center"} marginTop={"5px"}>
                                                                        <Text style={{ color: Color.warmGray }}>{selectedItem}</Text>
                                                                        <MaterialIcons name="arrow-drop-down" size={24} color={Color.warmGray} />
                                                                    </HStack>
                                                                    <HStack>
                                                                        <Text style={{ fontSize: 18, fontFamily: Fonts.interBlack, color: Color.mainBlue, fontWeight: "bold", paddingTop: 5 }}>${this.state.prices[item.category][item.name] || item.price}</Text>
                                                                    </HStack>
                                                                </VStack>
                                                            )
                                                        }}
                                                        rowTextForSelection={(item, index) => {
                                                            return (
                                                                <HStack height={"100%"} alignItems="center" paddingTop={"10px"}>
                                                                    <Image style={{ width: 20, height: 20, margin: 10 }} resizeMode="contain" source={imageOption[index]} />
                                                                    <Text>{item}</Text>
                                                                </HStack>
                                                            )
                                                        }}
                                                    />
                                                </HStack>
                                            </VStack>
                                        </VStack>
                                        <VStack height={"100%"} width={"100px"} justifyContent="center" alignItems="center" marginRight={"10px"}>
                                            <TouchableOpacity onPress={() => this.handleAddToCart(item)} style={[styles.Shadow, { width: 45, height: 45, backgroundColor: "white", marginLeft: 25, marginBottom: 10, borderRadius: 100, alignItems: "center", justifyContent: "center" }]}>
                                                <AntDesign name="shoppingcart" size={20} color={Color.mainBlue} />
                                            </TouchableOpacity>
                                        </VStack>
                                    </VStack>
                                ))}
                            </ScrollView>
                        </View>
                    </NativeBaseProvider>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.15,
        shadowRadius: 2.64,
    },
    CategoryTitle: {
        textTransform: "capitalize",
        fontFamily: Fonts.interRegular,
        textAlign: "center",
        color: "white"
    },
    Category: {
        width: "100%",
        height: 30,
        marginBottom: 25,
        paddingLeft: 5,
        paddingRight: 5,

        // display: "flex",
        // flexDirection: "row",
        // justifyContent: "space-evenly",
        // alignItems: "center"
    },
    ShopScreen: {
        width: "100%",
        // height: "100%",
        backgroundColor: "white",
        paddingBottom: 120,
        paddingTop: 10,


        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    },
    Items: {
        width: "95%",
        height: 100,
        borderRadius: 5,
        backgroundColor: "white",
        marginBottom: 10,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

        // borderWidth: 0.2,
        // borderColor: Color.clearGray,

        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 5,
        //     height: 1
        // },
        // shadowOpacity: 0.05,
        // shadowRadius: 10,
    }
})
export default ShopScreen
