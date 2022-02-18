import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Picker } from 'react-native'
import { Fonts } from "../global/Fonts"
import { Color } from "../global/Colors"
import { Suit, Trouser, All, Shirt, Tie } from "../global/Image"
import { MaterialIcons } from '@expo/vector-icons'
import Svg, { Path } from "react-native-svg"
import { suits } from "../../mocks/shop"
import { HStack, NativeBaseProvider, Button, VStack, Select} from "native-base"
import RNPickerSelect from 'react-native-picker-select';

import tShirt from "../assets/laundry/tshirt.png"


export class ShopScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            selectedValue: "wi",
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
                    title: "Others",
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
                Others: false,
            },
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

    handleFolterd = (param, e) => {
        e.stopPropagation()
        this.setState({
            category: {
                Men: param === "Men" ? true : false,
                Women: param === "Women" ? true : false,
                Kids: param === "Kids" ? true : false,
                Others: param === "Others" ? true : false,
            }
        })
    }

    componentDidMount() {
        console.log(this.state.category)
    }


    render() {

        const { likeIt, categories, category } = this.state
        const { navigation } = this.props
        return (
            <NativeBaseProvider>
                <View style={{ backgroundColor: "white" }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ShopScreen}>
                        <View style={{ width: "100%", paddingLeft: 20, paddingBottom: 20 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 30, fontFamily: Fonts.interBlack }}>Select Clothes</Text>
                        </View>
                        <HStack justifyContent="space-evenly" style={styles.Category}>
                            {suits.slice(0, 4).map((item, key) => (
                                <TouchableOpacity key={key} style={{ borderRadius: 25, backgroundColor: category[categories[key].title] ? Color.mainBlue : Color.warmGray, width: (100 / 5) + "%", justifyContent: "center" }} underlayColor={category[categories[key].title] ? "white" : Color.lightGray} onPress={category[categories[key].title] ? () => { } : (e) => this.handleFolterd(categories[key].title, e)}>
                                    <Text style={[styles.CategoryTitle]}>{categories[key].title}</Text>
                                </TouchableOpacity>
                            ))}
                        </HStack>
                        {[0, 1, 2, 3, 4].map((item, key) => (
                            <TouchableOpacity key={key} underlayColor="white" style={styles.Items}>
                                <VStack flexDirection={"row"}>
                                    <View style={{ width: 50, paddingLeft: 20 }}>
                                        <Image source={tShirt} resizeMode="contain" style={{ width: 50, height: "100%" }} />
                                    </View>
                                    <VStack style={{ height: "100%", padding: 20, marginLeft: 20 }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 20, fontFamily: Fonts.interBlack }}>T-Shirst</Text>
                                        {/* <HStack alignItems="center">
                                            <Text style={{ fontSize: 16, fontFamily: Fonts.interRegular, color: Color.warmGray }}>Wash Only</Text>
                                            <MaterialIcons name="arrow-drop-down" size={24} color={Color.warmGray} />
                                        </HStack> */}
                                        <Select selectedValue={this.state.selectedValue}
                                            minWidth="135"
                                            height={5}
                                            onOpen={(e) => console.log(e)}
                                            borderWidth={0}
                                            fontFamily={Fonts.interRegular}
                                            color={Color.warmGray}
                                            fontWeight="bold"
                                            fontSize={16}
                                            position="relative"
                                            top={-4}
                                            right={2}
                                            dropdownIcon={
                                                <View style={{ position: "relative", right: this.state.selectedValue === "wi" ? 15 : 25 }}>
                                                    <MaterialIcons name="arrow-drop-down" size={24} color={Color.warmGray} />
                                                </View>
                                            }

                                            mt={1} 
                                            onValueChange={selectedValue => this.setState({ selectedValue })}>
                                            <Select.Item fontWeight="bold" label="Wash Only" value="wo" />
                                            <Select.Item label="Wash & Iron" value="wi" />
                                        </Select>

                                        <Text style={{ fontSize: 18, fontFamily: Fonts.interBlack, color: Color.mainBlue, fontWeight: "bold", paddingTop: 5 }}>$10</Text>
                                    </VStack>
                                </VStack>
                                <View justifyContent="flex-end" alignItems="flex-end">
                                    <Text style={{ paddingRight: 30, marginBottom: 10, fontSize: 18, fontFamily: Fonts.interBlack, color: Color.lightGray }}>x 1</Text>
                                    <HStack alignItems="flex-end" paddingBottom={"15px"} width={100}>
                                        <Button background={Color.lightGray} size="30px" marginLeft={"5px"}>-</Button>
                                        <Button background={Color.mainBlue} size="30px" marginLeft={"5px"}>+</Button>
                                    </HStack>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </NativeBaseProvider>
        )
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});

const styles = StyleSheet.create({
    CategoryTitle: {
        textTransform: "capitalize",
        fontFamily: Fonts.interRegular,
        textAlign: "center",
        color: "white"
    },
    Category: {
        width: "100%",
        height: 30,
        marginBottom: 20,
        paddingLeft: 5,
        paddingRight: 5,

        // display: "flex",
        // flexDirection: "row",
        // justifyContent: "space-evenly",
        // alignItems: "center"
    },
    ShopScreen: {
        width: "100%",
        height: "100%",
        paddingTop: 15,
        backgroundColor: "white",

        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    },
    Items: {
        width: "95%",
        height: 120,
        borderRadius: 5,
        backgroundColor: "white",
        marginBottom: 10,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

        borderWidth: 0.5,
        borderColor: Color.clearGray,

        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 1
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    }
})
export default ShopScreen
