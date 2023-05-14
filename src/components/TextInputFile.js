import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';

export default function TextInputFile(props) {
  const [passwordIcon, setPasswordIcon] = useState('eye');
  const [isPassword, setIsPassword] = useState(true);
  const {
    focusTextInput,
    handleTextInputFocus,
    input_mode,
    icon,
    cus_width,
    defaultData,
    showValue,
    password,
    title,
    input,
    meta: {touched, error},
    // ...inputProps
  } = props;

  const togglePasswordIcon = () => {
    if (passwordIcon == 'eye') {
      setPasswordIcon('eye-off-outline');
      setIsPassword(false);
    } else {
      setPasswordIcon('eye');
      setIsPassword(true);
    }
  };
  return (
    <>
      <TextInput
        theme={{
          colors: {
            onSurfaceVariant: input_mode ? '#818be3' : '',
            // placeholder: 'white',
            text: 'pink',
            // primary: 'white',
            underlineColor: 'pink',
            background: 'red',
            border: 'red',
          },
        }}
        onFocus={focusTextInput && handleTextInputFocus}
        mode={input_mode ? 'outlined' : ''}
        // {...inputProps}
        label={title}
        onChangeText={text => input.onChange(text)}
        // onChangeText={input.onChange}
        style={{
          backgroundColor: 'white',
          width: cus_width ? 300 : '100%',
          marginTop: 20,
          // borderWidth: 0,
        }}
        secureTextEntry={isPassword && password ? true : false} //for android
        placeholder={showValue ? defaultData : ''}
        // defaultValue={input.value}
        // value={input.value}
        right={
          icon == 'eye' ? (
            <TextInput.Icon icon={icon} onPress={togglePasswordIcon} />
          ) : (
            <TextInput.Icon icon={icon} />
          )
        }
      />
      {touched && error && <Text style={{color: 'red'}}>{error}</Text>}
    </>
  );
}
