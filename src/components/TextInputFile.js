import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';

export default function TextInputFile(props) {
  const [passwordIcon, setPasswordIcon] = useState('eye');
  const [isPassword, setIsPassword] = useState(true);
  const [wordCount, setWordCount] = React.useState(0);

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
    input_cusstyle,
    inputmax,
    words_count,
    input,
    meta: { touched, error },
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
  const handleTextChange = (text) => {
    input.onChange(text);
    setWordCount(text.length);
  };
  return (
    <View>
      <TextInput

        maxLength={inputmax}
        theme={{
          colors: {
            onSurfaceVariant: input_mode ? '#818be3' : '',
            text: 'pink',
            underlineColor: 'pink',
            background: 'red',
            border: 'red',
          },
        }}
        onFocus={focusTextInput && handleTextInputFocus}
        mode={input_mode ? 'outlined' : ''}
        // {...inputProps}
        label={title}
        // onChangeText={text => input.onChange(text)}
        onChangeText={handleTextChange}
        // onChangeText={input.onChange}
        style={{
          backgroundColor: '#fff',
          marginTop: 20,
          width: input_cusstyle ? '100%' : 300, marginRight: 10
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
      {inputmax && <Text style={{ alignSelf: "flex-end", color: '#818be3' }}>{wordCount}/{inputmax}</Text>}
      {touched && error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
}



