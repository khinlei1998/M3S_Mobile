import {
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

const CustomTextInput = props => {
  const {keyboardType, input,} = props;

  return (
    <>
      <TextInput
        placeholder={'oo'}
        placeholderTextColor="#8D8B8B"
        style={{
          shadowOpacity: 0.25,
          elevation: 3,
          color: '#8D8B8B',
          padding: 10,
          marginLeft: 15,
          marginBottom: 15,
          marginTop: 7,
          width:300
        }}
        onChangeText={input.onChange}
        keyboardType={keyboardType && 'phone-pad'}
      />
    </>
  );
};
export default CustomTextInput;
