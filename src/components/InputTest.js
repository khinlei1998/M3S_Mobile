import {Text, View,TextInput} from 'react-native';
import React from 'react';
import { DefaultTheme} from 'react-native-paper';

export default function InputFile(props) {
  const {
    editable,
    input: {onChange, value, ...restInput},
    ...rest
  } = props;
  return (
    <View>
      <TextInput
        {...restInput}
        {...rest}
        editable={editable ? false : true}
        style={{borderWidth: 1}}
        defaultValue={value}
        onChangeText={text => onChange(text)}
        theme={{
          colors: {
            ...DefaultTheme.colors,
            // onSurfaceVariant: input_mode ? '#818be3' : '',
            placeholder: 'red',
            primary: '#878787',
          },
        }}
      />
    </View>
  );
}
