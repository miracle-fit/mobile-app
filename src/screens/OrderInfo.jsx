import React, { Component } from 'react'
import { NativeBaseProvider, Box, Input, Heading, HStack, VStack, FormControl, ScrollView, Text, TextArea, TextField } from "native-base"
import { Color } from '../global/Colors'
import { TouchableOpacity } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { Fonts } from "../global/Fonts"
import moment from 'moment'
import axios from 'axios'

class OrderInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showingCalendar: false,
            date: ""
        }
    }

    handlePlaceOrder = async () => {
        const { carts, total, cartUnGrouped } = this.props.route.params
        let products = []
        carts.forEach(product => {
            products.push({
                [product.cart[0].name + "(" + product.cart[0].category + ")"]: {
                    quatity: product.cart.length,
                    basePrice: product.cart[0].basePrice,
                    total: product.cart.length * product.cart[0].price
                }
            })
        })
        await axios.post(`http://localhost:3000/orders`, { total, status: "placed", userId: 1, products }).then(async (res) => {
            cartUnGrouped.forEach(item => {
                this.handleQuantityMinus(item.id)
            })
        })
        this.props.navigation.navigate("Orders")
    }

    handleOnDatePress = (date) => {
        console.log(date)
        this.setState({ showingCalendar: false, date: moment(date.dateString).format("LL") })
    }

    handleQuantityMinus = async (id) => {
        await axios.delete(`http://localhost:3000/carts/${id}`).then((res) => {
            if (res.data.status === 200) {
                fetCart()
            }
        })
    }

    componentDidMount() {
        console.log(this.props.route.params)
    }


    render() {
        return (
            <NativeBaseProvider>
                <VStack background="white" h={"100%"}>
                    <ScrollView contentContainerStyle={{ backgroundColor: "white" }}>
                        <HStack p={"20px"}>
                            <Heading style={{ fontSize: 26 }}>Order Details</Heading>
                        </HStack>
                        <VStack space={"15px"} paddingX={"20px"} h="100%" w="100%" background={"white"}>
                            <VStack>
                                <FormControl.Label>Full Name</FormControl.Label>
                                <Input _focus={{ borderColor: Color.mainBlue }} paddingLeft={"5px"} paddingX={"15px"} h="50px" placeholder="Name" />
                            </VStack>
                            <VStack>
                                <FormControl.Label>Address</FormControl.Label>
                                <Input _focus={{ borderColor: Color.mainBlue }} paddingLeft={"5px"} paddingX={"20px"} h="50px" placeholder="Address" />
                            </VStack>
                            <VStack>
                                <FormControl.Label>Date</FormControl.Label>
                                {this.state.showingCalendar ?
                                    <VStack>
                                        <Calendar style={{ borderColor: "rgba(000,000,000,0.13)", borderWidth: 0.5, padding: 20, borderRadius: 7 }}
                                            markedDates={{
                                                '2022-04-16': { selected: true, marked: true, selectedColor: 'blue' },
                                                '2012-05-17': { marked: true },
                                                '2012-05-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
                                                '2012-05-19': { disabled: true, disableTouchEvent: true }
                                            }}
                                            onDayPress={(date) => this.handleOnDatePress(date)}
                                        />
                                    </VStack>
                                    :
                                    <Input value={this.state.date} onFocus={() => this.setState({ showingCalendar: true })} _focus={{ borderColor: Color.mainBlue }} paddingLeft={"5px"} paddingX={"20px"} h="50px" placeholder="MM-DD-YYYY" />
                                }
                            </VStack>
                            <VStack>
                                <FormControl.Label>Comment</FormControl.Label>
                                <TextArea _focus={{ borderColor: Color.mainBlue }} paddingLeft={"5px"} pt={"15px"} paddingX={"20px"} h="125px" placeholder="Comment" />
                            </VStack>
                            <HStack justifyContent={"center"} >
                                <TouchableOpacity onPress={this.handlePlaceOrder} style={{ marginTop: 10, justifyContent: "center", alignItems: "center", width: "100%", height: 60, backgroundColor: Color.mainBlue, borderRadius: 10 }}>
                                    <Text style={{ fontSize: 16, fontFamily: Fonts.interBold, color: "white" }}>Place Order</Text>
                                </TouchableOpacity>
                            </HStack>
                            <VStack justifyContent={"center"}>
                                <Text style={{ color: "red" }} textAlign={"center"}>You will pay this order after the tailor visited you.</Text>
                            </VStack>
                        </VStack>
                    </ScrollView>
                </VStack>
            </NativeBaseProvider>
        )
    }
}

export default OrderInfo