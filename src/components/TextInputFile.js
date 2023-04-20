import {View, Text} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';

export default function TextInputFile(props) {
  const {title, input, meta, ...inputProps} = props;
  return (
    <View style={{marginTop: 20}}>
      <TextInput {...inputProps} label={title} onChangeText={input.onChange} style={{backgroundColor:'white'}} />
    </View>
  );
}
