import { View, Text, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';
import TextInputFile from '../components/TextInputFile';
import ButtonFile from '../components/ButtonFile';
import CheckBoxFile from '../components/CheckBoxFile';
export default function LoginScreen() {
    return (
        <View style={{ backgroundColor: '#232D57', flex: 1,}}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, marginRight: 10 }}>
                <Icon
                    name="download"
                    size={25}
                    color="#fff"
                    style={{ marginLeft: 20 }}
                />

                <Icon
                    name="settings"
                    size={25}
                    color="#fff"
                    style={{ marginLeft: 20 }}
                />

            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Image source={require('../../assets/images/logo_shin_02.png')} style={{ width: 90, height: 90 }} />
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>BC NeO </Text>
                    <Text style={{ color: '#fff', fontSize: 20 }}>Sales System</Text>
                </View>

                <Image source={require('../../assets/images/default-user.png')} style={{ width: 50, height: 50 }} />

            </View>
            <View style={{
                alignItems: 'center', justifyContent: 'center', marginTop: 20,

            }}>
                <View style={{
                    borderWidth: 3, // Width of the border
                    borderColor: '#4C577F', // Color of the border
                    borderRadius: 10,
                    width: 400,
                    height: 400,
                    padding: 20

                }}>

                    <TextInputFile />

                    <TextInputFile />
                    <ButtonFile />

                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10}}>
                        <CheckBoxFile/>
                        <Text style={{color:"#fff"}}>Save login Information</Text>
                    </View>
                </View>
            </View>

            <Text style={{color:'#fff',textAlign:'center',marginTop:25}}>v 0.1.19</Text>

            <Image  source={require('../../assets/images/logo_bct_02.png')}
             style={{width:50,height:90,alignSelf: 'center',marginTop:40}}/>


        </View>
    )
}