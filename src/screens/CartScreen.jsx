import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

function CartScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Button title="Go to Shop" onPress={() => navigation.navigate('Shop')} />
        </View>
    )
}

export default CartScreen
