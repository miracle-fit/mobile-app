import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

function WishListScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Wish List Screen</Text>
            <Button title="Go to Shop" onPress={() => navigation.navigate('Shop')} />
        </View>
    )
}

export default WishListScreen
