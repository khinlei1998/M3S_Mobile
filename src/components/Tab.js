import {View, Text,TouchableOpacity} from 'react-native';
import React from 'react';

export default function Tab({label, isActive, onPress, children}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {flex: 1, alignItems: 'center', paddingVertical: 16, marginLeft: 10},
        isActive ? {backgroundColor: '#fff'} : {backgroundColor: 'lightgray'},
      ]}>
      <Text style={{color: isActive ? '#000' : 'black'}}>{label}</Text>
      {/* {isActive && children} */}
    </TouchableOpacity>
  );
}
