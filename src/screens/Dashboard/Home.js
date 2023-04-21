import { View, Text, Image } from 'react-native'
import React from 'react'
export default function Home() {
  return (
    <View style={{ flex: 1,}}>
      <View style={{ backgroundColor: '#232D57', flexDirection: 'row', justifyContent: 'space-around', height: 300 }}>
        <View style={{ flexDirection: 'row', padding: 30, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../../../assets/images/default-user.png')} style={{ width: 30, height: 30 }}
          />
          <View style={{marginLeft:20}}>
            <Text style={{ color: '#c7c7c7' }}>Team leader</Text>
            <Text style={{ color: '#fff' }}>San San Tint</Text>

          </View>
        </View>

        <View style={{

          width: 250,
          height: 200,
          borderRadius: 10,
          backgroundColor: '#46578D',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          padding: 10,
          justifyContent: 'center',
          alignSelf: 'center'
        }}>
          <Text style={{
            fontSize: 18,
            color: '#fff',
            padding: 5
          }}>Number of new loans</Text>
          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
            <Text style={{
              fontSize: 25,
              textAlign: 'right',
              color: 'red'
            }}>14 <Text style={{ color: '#c7c7c7',fontSize:15 }}>PCS</Text></Text>

          </View>
        </View>

        <View style={{

          width: 250,
          height: 200,
          borderRadius: 10,
          backgroundColor: '#46578D',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          padding: 10,
          justifyContent: 'center',
          alignSelf: 'center'
        }}>
          <Text style={{
            fontSize: 18,
            color: '#fff',
            padding: 5
          }}>Amount of new loan Applications</Text>
          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
            <Text style={{
              fontSize: 25,
              textAlign: 'right',
              color: '#73DEF7'
            }}>2,633,346 <Text style={{ color: '#c7c7c7',fontSize:15 }}>MMK</Text></Text>

          </View>
        </View>
      </View>
    </View>
  )
}