import { View, Text,Image } from 'react-native'
import React from 'react'

export default function SplashScreen() {
    return (
        <View style={{ backgroundColor: '#232D57', flex: 1,justifyContent:'center',alignItems:'center' }}>
           <Image source={require('../../assets/images/splash_002.png')} style={{width:400,height:300}}/>
        </View>
    )
}