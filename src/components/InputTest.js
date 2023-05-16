import {Text, View, } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';

export default function InputFile(props) {
  const {
    input: {onChange, value, ...restInput},
    ...rest
  } = props;

  return (
    <View>
      <>
        <TextInput
        theme={{
          colors: {
            text: 'pink',
            underlineColor: 'pink',
            border: 'red',
          },
        }}
          style={{width: 300, }}
          mode={'flat'}
          onChangeText={onChange}
          defaultValue={value}
          label={'title'}
          {...restInput}
          {...rest}
        />
      </>
    </View>
  );
}
