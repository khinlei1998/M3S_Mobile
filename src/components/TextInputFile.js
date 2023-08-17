import {View, Text} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {DefaultTheme, TextInput} from 'react-native-paper';

export default function TextInputFile(props) {
  const [passwordIcon, setPasswordIcon] = useState('eye');
  const [isPassword, setIsPassword] = useState(true);
  const [wordCount, setWordCount] = React.useState(0);
  const [totalSum, setTotalSum] = useState(0);
  const {
    require,
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
    disabled,
    inputmax,
    keyboardType,
    words_count,
    editable,
    showRightIcon,
    nrc_cusstyle,
    meta: {touched, error},
    input,
    ...rest
  } = props;
  const [total, setTotal] = useState(0);
  const [inputValue, setInputValue] = useState(input.value); // Initialize with the input's value

  const togglePasswordIcon = () => {
    if (passwordIcon == 'eye') {
      setPasswordIcon('eye-off-outline');
      setIsPassword(false);
    } else {
      setPasswordIcon('eye');
      setIsPassword(true);
    }
  };
  // const handleTextChange = text => {
  //   // setWordCount(text.length);

  //   input.onChange(text);

  //   let sum = 0;

  //   for (let i = 0; i < text.length; i++) {
  //     const digit = parseInt(text[i]);
  //     if (!isNaN(digit)) {
  //       sum += digit;
  //     }
  //   }
  //   setTotalSum(sum);
  // };
  const handleTextChange = () => {};
  useEffect(() => {
    setInputValue(input.value); // Update the local state when the Redux Form value changes
  }, [input.value]);

  const handleInputChangeCustom = text => {
    setInputValue(text); // Update the local state
    input.onChange(text); // Update the Redux Form field value
    // handleTextChange(text); // Custom text change handler
  };
  return (
    <View>
      <TextInput
        {...rest}
        editable={editable ? false : true}
        maxLength={inputmax}
        // value={input.value}
        value={inputValue}
        theme={{
          colors: {
            ...DefaultTheme.colors,
            primary: '#878787',
          },
        }}
        onFocus={focusTextInput && handleTextInputFocus}
        mode={input_mode ? 'flat' : ''}
        label={
          <Text style={{color: '#636Dc6'}}>
            {title} {require && <Text style={{color: 'red'}}>*</Text>}
          </Text>
        }
        onChangeText={handleInputChangeCustom} // Use the new function name
        onBlur={input.onBlur}
        style={{
          backgroundColor: editable ? '#f8f8f8' : '#fff',
          marginTop: 10,
          width: input_cusstyle ? '100%' : 301,
          borderColor: '#d6d6d6',
          borderWidth: 0.8,
        }}
        keyboardType={keyboardType ? keyboardType : 'default'}
        underlineColor="#FFF"
        secureTextEntry={isPassword && password ? true : false} //for android
        placeholder={showValue ? defaultData : ''}
        right={
          icon == 'eye' ? (
            <TextInput.Icon icon={passwordIcon} onPress={togglePasswordIcon} />
          ) : icon == 'magnify' ? (
            <TextInput.Icon
              icon={icon}
              onPress={handleTextInputFocus}
              iconColor="#636Dc6"
            />
          ) : icon == 'calendar' ? (
            <TextInput.Icon
              icon={icon}
              onPress={handleTextInputFocus}
              iconColor="#636Dc6"
            />
          ) : null
        }
      />
      {touched && error && <Text style={{color: 'red'}}>{error}</Text>}
    </View>
  );
}
