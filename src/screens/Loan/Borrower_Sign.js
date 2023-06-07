import {View, Text} from 'react-native';
import React from 'react';

export default function Borrower_Sign() {
  return (
    <View style={{flex: 1, padding: 5, margin: 20,}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',padding:5,margin:10}}>
        <View>
          <Text style={{fontWeight:'bold',fontSize:15}}>Borrower Name</Text>
          <Text> Date 17/05/2023</Text>
        </View>

        <View>
          <Text style={{fontWeight:'bold',fontSize:15}}>Sign</Text>
        </View>
      </View>

      <View style={{flexDirection:'row',justifyContent:'space-between',padding:5,margin:10}}>
        <View>
          <Text style={{fontWeight:'bold',fontSize:15}}>Co Borrower Name</Text>
          <Text> Date 17/05/2023</Text>
        </View>

        <View>
          <Text style={{fontWeight:'bold',fontSize:15}}>Sign</Text>
        </View>
      </View>
    </View>
  );
}
