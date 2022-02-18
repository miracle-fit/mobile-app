import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableHighlight, ScrollView, Dimensions, Image } from 'react-native'
import { connect } from "react-redux"
import io from "socket.io-client"
import Svg, { Path } from "react-native-svg"


// compoents
import Footer from "../components/Footer"
import { Icons } from '../constants/Image'

const { width } = Dimensions.get("screen")


class Prices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prices: [],
            searchValue: '',
            category: ''
        }
        this.socket = io("https://alteration-database.herokuapp.com/")
    }

    handleFilter = (e, filter) => {
        e.stopPropagation()
        this.props.dispatch({ type: filter })

        switch (filter) {
            case "isPants":
                this.setState({
                    category: "pants"
                })
                break;
            case "isJacket":
                this.setState({
                    category: "jacket"
                })
                break;
            default:
                this.setState({
                    category: ''
                })
                break;
        }
    }

    isFilter = (filter) => {
        const isTrue = {
            backgroundColor: "#2ba97a"
        }
        return filter ? isTrue : { borderWidth: 0.5, borderColor: "rgba(000,000,000,0.3)" }
    }

    isFilterText = (filter) => {
        const isTrue = {
            color: "white",

        }
        return filter ? isTrue : { color: "rgba(000,000,000,0.5)" }
    }

    fetchPrice = () => {
        this.socket.on("prices", (prices) => {
            this.setState({
                prices
            })
        })
    }

    handleOnChange = (text) => {
        this.setState({
            searchValue: text
        })
    }


    componentDidMount() {
        this.fetchPrice()
    }

    render() {
        let filteredCategory = this.state.prices.filter((price) => {
            return price.category.toLowerCase().includes(this.state.category.toLowerCase())
        })
        let filteredPrices = filteredCategory.filter((price) => {
            return price.title.toLowerCase().includes(this.state.searchValue.toLowerCase())
        })
        const { isJacket, isPants, isAll } = this.props.state.Filters
        return (
            <View style={styles.Appointments}>
                <View style={styles.PriceTitleContainer}>
                    <Text style={{ fontSize: 30, color: "#000000", fontWeight: "bold", fontFamily: "Inter-Regular" }}>Prices</Text>
                </View>
                <View style={styles.Filter}>
                    <TouchableHighlight underlayColor="white" style={[styles.FilterButtoms, this.isFilter(isAll)]} onPress={(e) => this.handleFilter(e, "isAll")}>
                        <Text style={[styles.FilterButtomsText, this.isFilterText(isAll), { fontFamily: "Inter-Regular" }]}>{"All"}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="white" style={[styles.FilterButtoms, this.isFilter(isJacket)]} onPress={(e) => this.handleFilter(e, "isJacket")}>
                        <Text style={[styles.FilterButtomsText, this.isFilterText(isJacket), { fontFamily: "Inter-Regular" }]}>{"Jacket"}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="white" style={[styles.FilterButtoms, this.isFilter(isPants)]} onPress={(e) => this.handleFilter(e, "isPants")}>
                        <Text style={[styles.FilterButtomsText, this.isFilterText(isPants), { fontFamily: "Inter-Regular" }]}>{"Pants"}</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.InputContainer}>
                    <TextInput style={styles.Input} placeholder="Search..." onChangeText={(text) => this.handleOnChange(text)} />
                </View>
                <ScrollView contentContainerStyle={styles.Scroll}>
                    {filteredPrices.map((price, i) => (
                        <View key={i} style={styles.Orders}>
                            <View style={styles.DetailsBox}>
                                <Text style={{ fontSize: 15, color: "rgba(000,000,000, 0.8)", fontWeight: "bold", fontFamily: "Inter-Regular", textTransform: "capitalize" }}>{price.title}</Text>
                                <View style={styles.IconPrice}>
                                    {price.category === "jacket" ?
                                        <Svg width={28} height={39} viewBox="0 0 37 48" fill="none">
                                            <Path d={Icons.Suit.path.d} fill="#2BA97A" />
                                        </Svg>
                                        : price.category === "pants" ?
                                            <Svg width={35} height={39} viewBox="0 0 512.001 512.001">
                                                <Path d={Icons.Trouser.path.d} fill="#2BA97A" xmlns="http://www.w3.org/2000/svg" />
                                            </Svg>
                                            : null
                                    }
                                    <Text style={{ marginTop: 15, fontSize: 15, fontWeight: "bold", fontFamily: "Inter-Regular", color: "rgba(000,000,000, 0.5)" }}>{`$${price.price}`}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <Footer />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Appointments: {
        flex: 1,
        backgroundColor: "white",
    },
    PriceTitleContainer: {
        width: "100%",
        height: 100,
        paddingLeft: 20,

        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start"
    },
    Filter: {
        width: "100%",
        height: 50,
        // padding: 20,
        marginTop: 20,
        marginBottom: 5,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"

    },
    FilterButtoms: {
        width: 120,
        height: 40,
        borderRadius: 18,
        // marginRight: 20,


        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    FilterButtomsText: {
        width: 125,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 13

    },
    Scroll: {
        width,
        paddingBottom: 125,
        marginTop: 10,

        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    Orders: {
        width: 180,
        height: 100,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 15,


        borderRadius: 15,
        backgroundColor: "white",
        borderWidth: 0.5,

        borderColor: "rgba(112,112,112,0.2)",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    DetailsBox: {
        width: "100%",
        height: "100%",
        paddingTop: 10,
        paddingBottom: 10,

        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start"

    },
    IconPrice: {
        width: "100%",
        height: 50,
        paddingRight: 10,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    InputContainer: {
        width: "100%",
        height: 45,
        marginTop: 5,

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    Input: {
        width: "90%",
        height: "100%",
        paddingLeft: 10,
        borderWidth: 0.5,

        borderRadius: 10,
        backgroundColor: "white",
        borderWidth: 0.5,
        borderColor: "rgba(112,112,112,0.2)",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,
    }
})

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(Prices)