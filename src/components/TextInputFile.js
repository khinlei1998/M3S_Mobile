import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {TextInput, DefaultTheme} from 'react-native-paper';

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
    input: {onChange, ...restInput},
    ...restProps
  } = props;
  const inputRef = useRef(null);

  const [values, setValues] = useState([]);
  const [total, setTotal] = useState(0);

  const togglePasswordIcon = () => {
    if (passwordIcon == 'eye') {
      setPasswordIcon('eye-off-outline');
      setIsPassword(false);
    } else {
      setPasswordIcon('eye');
      setIsPassword(true);
    }
  };
  const handleTextChange = text => {
    // setWordCount(text.length);

    onChange(text);

    let sum = 0;

    for (let i = 0; i < text.length; i++) {
      const digit = parseInt(text[i]);
      if (!isNaN(digit)) {
        sum += digit;
      }
    }
    setTotalSum(sum);
  };
  // useEffect(() => {
  //   // Set the cursor position after each text change
  //   if (inputRef.current) {
  //     inputRef.current.setNativeProps({
  //       selection: {start: restInput.value.length, end: restInput.value.length},
  //     });
  //   }
  // }, [restInput.value]);

  return (
    <View>
      <TextInput
        ref={inputRef}
        // {...restInput}
        {...restInput}
        {...restProps}
        // value={value}
        //  defaultValue={value}
        editable={editable ? false : true}
        maxLength={inputmax}
        theme={{
          colors: {
            ...DefaultTheme.colors,
            placeholder: 'red',
            primary: '#878787',
          },
        }}
        onFocus={focusTextInput && handleTextInputFocus}
        mode={input_mode ? 'flat' : ''}
        label={
          <Text style={{color:'#636Dc6'}}>
            {title} {require && <Text style={{color: 'red'}}>*</Text>}
          </Text>
        }
        onChangeText={text => handleTextChange(text)}
        style={{
          backgroundColor: '#fff',
          marginTop: 10,
          width: input_cusstyle ? '100%' : 301,
          borderColor: '#303030',
          borderWidth: 0.5,
        }}
        keyboardType={keyboardType ? keyboardType : 'default'}
        underlineColor="#FFF"
        secureTextEntry={isPassword && password ? true : false} //for android
        placeholder={showValue ? defaultData : ''}
        right={
          icon == 'eye' ? (
            <TextInput.Icon icon={icon} onPress={togglePasswordIcon} />
          ) : icon == 'magnify' ? (
            <TextInput.Icon icon={icon} onPress={handleTextInputFocus} color="red" />
          ) : icon == 'calendar' ? (
            <TextInput.Icon icon={icon} color="#636Dc6"/>
          ) : null
        }
      />
      {touched && error && <Text style={{color: 'red'}}>{error}</Text>}
    </View>
  );
}
