import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';

export default function ButtonFile() {
    return (
        <View style={{marginTop:10}}>
            <Button mode="contained" onPress={() => console.log('Pressed')} buttonColor={'#6870C3'} style={{borderRadius:0}}>
              Login
            </Button>
        </View>
    )
}