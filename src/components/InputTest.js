import {Text, View, TextInput} from 'react-native';
import React from 'react';
export default function InputTest(props) {
  const {
    input: {onChange, value, ...restInput},
  } = props;
  return (
    <View>
      <TextInput
        {...restInput}
        style={{borderWidth: 1,width:300}}
        defaultValue={value}
        onChangeText={text => onChange(text)}
      />
    </View>
  );
}
