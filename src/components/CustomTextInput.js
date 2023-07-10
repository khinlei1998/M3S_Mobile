import {
  Text,
  View,
  // TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import React from 'react';

const CustomTextInput = props => {
  console.log('props', props);
  // const { meta: { touched, error },  input: {onChange, ...restInput},initialValue,focusTextInput,icon,handleTextInputFocus,
  //   // input, ...inputProps,
  //   ...rest } = props;

  return (
    <>
    <Text>kk</Text>
      {/* <TextInput
        {...rest}
        error={touched && error}
        onChangeText={input.onChange}
        style={{
          backgroundColor: '#fff',
          marginTop: 10,
          width: 301,
          // marginRight: 10,
          borderColor: '#303030',
          borderWidth: 0.5,
        }}
        onFocus={focusTextInput && handleTextInputFocus}
        right={
          icon == 'eye' ? (
            <TextInput.Icon icon={icon} onPress={togglePasswordIcon} />
          ) : icon == 'magnify' ? (
            <TextInput.Icon icon={icon} onPress={handleTextInputFocus} />
          ) : icon == 'calendar' ? (
            <TextInput.Icon icon={icon} />
          ) : null
        }
      />
      {touched && error && <Text style={{ color: 'red' }}>{error}</Text>} */}
    </>
  );
};
export default CustomTextInput;
