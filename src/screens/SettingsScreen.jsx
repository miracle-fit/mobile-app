import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

class Settings extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
                <Button title="Go to Settings" onPress={() => this.props.navigation.navigate("Settings", {
                    title: "Brayhan"
                })} />
            </View>
        )
    }
}

export default Settings