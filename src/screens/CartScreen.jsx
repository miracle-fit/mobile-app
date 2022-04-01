import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TouchableHighlight, Animated, TextInput } from 'react-native'
import { Fonts } from "../global/Fonts"
import { Color } from "../global/Colors"
import { MaterialIcons, Octicons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { HStack, NativeBaseProvider, Button, VStack, ZStack, Divider, Heading } from "native-base"
import { SwipeListView } from 'react-native-swipe-list-view'
import SelectDropdown from 'react-native-select-dropdown'
import axios from 'axios'
// import Animated from 'react-native-reanimated'

import tShirt from "../assets/laundry/tshirt.png"
import jacket from "../assets/laundry/jacket.png"
import jean from "../assets/laundry/jean.png"

import ironer from "../assets/img/icons/ironer.png"
import laundry from "../assets/img/icons/laundry.png"
import tailoring from "../assets/img/icons/tailoring.png"
import all from "../assets/img/icons/all.png"
import { SafeAreaView } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get("screen")
const imageOption = [laundry, ironer, all]
const options = ["Wash Only", "Iron Only", "Wash & Iron"]

const ITEMS = [
    tShirt,
    jacket,
    jean,
    jacket
]

const ShopScreen = (props) => {
    const [total, setTotal] = useState(0)
    const [cart, setCart] = useState([])
    const [cartUnGrouped, setCartUnGrouped] = useState([])

    const fetCart = async () => {
        let tempCart = []
        await axios.get(`http://localhost:3000/carts/user/1`).then((res) => {
            const group = groupByKey(res.data.data, "name")
            for (const key in group) {
                tempCart.push({
                    quatity: group[key].length,
                    cart: group[key],
                    total: group[key][0].price * group[key].length
                })
            }
            setCart(tempCart)
            setCartUnGrouped(res.data.data)
            setTotal(sum("total", tempCart))
            console.log(sum("total", tempCart))
        })
    }

    const sum = (key, array) => {
        return array.reduce((a, b) => a + (b[key] || 0), 0);
    }

    const groupByKey = (array, key) => {
        return array
            .reduce((hash, obj) => {
                if (obj[key] === undefined) return hash;
                return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) })
            }, {})
    }

    useEffect(() => {
        fetCart()
    }, [])

    const handleQuantityPlus = async (key) => {
        const { name, toDo, price, category, id } = key[0]
        await axios.get(`http://localhost:3000/carts/${id}`).then(async (res) => {
            await axios.post(`http://localhost:3000/carts`, { name, toDo, basePrice: res.data.data.basePrice, price, category, userId: 1 }).then(() => {
                fetCart()
            })
        })
    }

    const handleQuantityMinus = async (id) => {
        await axios.delete(`http://localhost:3000/carts/${id}`).then((res) => {
            if (res.data.status === 200) {
                fetCart()
            }
        })
    }

    const handleOnSelect = (selectedValue, item, prevPrice) => {
        item.cart.forEach(async (cart) => {
            await axios.patch(`http://localhost:3000/carts/${cart.id}`, {
                toDo: selectedValue,
                price: selectedValue === "Wash & Iron" ? cart.basePrice * 2 : cart.basePrice
            }).then(() => {
                fetCart()
            })
        })
    }

    const VisibleItem = (item) => {
        const shoppingCart = item.item.item
        return (
            <HStack key={item.index} justifyContent={"center"} style={{ width: "100%" }}>
                <View underlayColor="white" style={styles.Items}>
                    <VStack flexDirection={"row"}>
                        <View style={{ width: 50, paddingLeft: 30, alignItems: "center" }}>
                            <Image source={ITEMS[item.item.index]} resizeMode="contain" style={{ width: item.key > 2 ? 70 : 50, height: "100%" }} />
                        </View>
                        <VStack style={{ height: "100%", padding: 20, marginLeft: 20 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16, fontFamily: Fonts.interBold, textTransform: "capitalize" }}>
                                {shoppingCart.cart[0].name} <Text style={{ fontSize: 16, color: Color.warmGray }}>({shoppingCart.cart[0].category})</Text>
                            </Text>
                            <SelectDropdown
                                buttonStyle={{ height: 20, width: 160, backgroundColor: "white", justifyContent: "flex-start", position: "relative", right: 15 }}
                                dropdownStyle={{ width: 200, borderRadius: 10 }}
                                data={options}
                                onSelect={(selectedValue, index) => handleOnSelect(selectedValue, shoppingCart, 0)}
                                defaultValue={shoppingCart.cart[0].toDo}

                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return (
                                        <VStack style={{ height: 100 }}>
                                            <HStack alignItems={"center"} marginTop={"5px"}>
                                                <Text style={{ color: Color.warmGray }}>{selectedItem}</Text>
                                                <MaterialIcons name="arrow-drop-down" size={24} color={Color.warmGray} />
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
                            <Text style={{ fontSize: 16, fontFamily: Fonts.interBlack, color: Color.mainBlue, fontWeight: "bold", paddingTop: 5 }}>${shoppingCart.total}</Text>
                        </VStack>
                    </VStack>
                    <VStack height={"100%"} width={"100px"} justifyContent="flex-end" alignItems="center" marginRight={"10px"}>
                        <HStack justifyContent="flex-end" alignItems={"center"} width={85} marginBottom={"20px"}>
                            <TouchableOpacity onPress={() => handleQuantityMinus(shoppingCart.cart[0].id)} style={{ width: 25, height: 25, backgroundColor: Color.mainGray, alignItems: "center", justifyContent: "center", borderRadius: 3 }}>
                                <Text style={{ color: "white" }}>-</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 16, fontFamily: Fonts.interBlack, color: Color.lightGray, marginHorizontal: 5 }}>{shoppingCart.quatity}</Text>
                            {/* <TextInput onChange={() => { }} keyboardType="number-pad" style={{ fontSize: 16, fontFamily: Fonts.interBlack, color: Color.lightGray, marginHorizontal: 5 }}>{shoppingCart.quatity}</TextInput> */}
                            <TouchableOpacity onPress={() => handleQuantityPlus(shoppingCart.cart)} style={{ width: 25, height: 25, backgroundColor: Color.mainBlue, alignItems: "center", justifyContent: "center", borderRadius: 3 }}>
                                <Text style={{ color: "white" }}>+</Text>
                            </TouchableOpacity>
                        </HStack>
                    </VStack>
                </View>
            </HStack>
        )
    }

    const renderItem = (data, rowMap) => {
        // console.log(data.item)
        let key = 0
        return (
            <VisibleItem key={key++} item={data} />
        )
    }

    const HiddenItemWithAction = (props) => {
        const { onClose, onDelete, data } = props
        return (
            <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", paddingRight: 20, width: "100%", height: 100 }}>
                <TouchableHighlight onPress={onClose} >
                    <View style={[{ alignItems: "flex-end", width: "100%", height: 100 }]}>
                        <View alignItems="center" justifyContent="center" style={{ width: 80, height: 100, backgroundColor: "blue", borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                            <MaterialCommunityIcons name="close-circle-outline" size={24} color="white" />
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableOpacity onPress={() => onDelete()}>
                    <View style={{ alignItems: "flex-end", width: "100%" }}>
                        <Animated.View alignItems="center" justifyContent="center" style={{ width: 80, height: 100, borderTopRightRadius: 5, borderBottomRightRadius: 5, backgroundColor: "red" }}>
                            <MaterialCommunityIcons name="trash-can-outline" size={25} color="white" />
                        </Animated.View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow()
        }
    }
    const deleteRow = (rowMap, rowKey, data) => {
        closeRow(rowMap, rowKey)
        // const newData = [...listData]
        // const prevIndex = listData.findIndex(item => item.key === rowKey)
        // newData.splice(prevIndex, 1)
        // setListData(newData)
        console.log(0)
    }

    const renderHiddenItem = (data, rowMap) => {
        return (
            <HiddenItemWithAction
                data={data}
                rowData={rowMap}
                onClose={() => closeRow(rowMap, data.item.key)}
                onDelete={() => deleteRow(rowMap, data.item.key)}
            />
        )
    }

    const handlePlaceOrder = async () => {
        let products = []
        cart.forEach(product => {
            products.push({
                [product.cart[0].name + "(" + product.cart[0].category + ")"]: {
                    quatity: product.cart.length,
                    basePrice: product.cart[0].basePrice,
                    total: product.cart.length * product.cart[0].price
                }
            })
        })


        await axios.post(`http://localhost:3000/orders`, { total, status: "placed", userId: 1, products }).then((res) => {
            cartUnGrouped.forEach(item => {
                handleQuantityMinus(item.id)
            })
            props.navigation.navigate("Orders")
        })
    }

    return (
        <NativeBaseProvider>
            <VStack height={"100%"} background="white">
                <SwipeListView
                    style={{ width: "100%", paddingTop: 10, backgroundColor: "white" }}
                    data={cart}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-180}
                    disableRightSwipe
                />
                <Divider />
                <VStack height={"180px"} background={"white"} paddingX={"20px"} paddingY={"10px"}>
                    <HStack justifyContent={"space-between"}>
                        <VStack>
                            <Heading size={"sm"}>Total</Heading>
                            <Text style={{ fontSize: 22, fontFamily: Fonts.interBold, marginTop: 5 }}>${total}</Text>
                        </VStack>
                        <VStack>
                            <Heading size={"sm"}>Quiantity</Heading>
                            <Text style={{ fontSize: 22, fontFamily: Fonts.interBold, marginTop: 5 }}>${total}</Text>
                        </VStack>
                    </HStack>
                    <TouchableOpacity onPress={() => handlePlaceOrder()} style={{ marginTop: 10, justifyContent: "center", alignItems: "center", width: "100%", height: 60, backgroundColor: Color.mainBlue, borderRadius: 10 }}>
                        <Text style={{ fontSize: 16, fontFamily: Fonts.interBold, color: "white" }}>Place Order</Text>
                    </TouchableOpacity>
                </VStack>
            </VStack>
        </NativeBaseProvider>
    )
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
        paddingRight: 5
    },
    ShopScreen: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",

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
        marginBottom: 5,

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

    }
})
export default ShopScreen


