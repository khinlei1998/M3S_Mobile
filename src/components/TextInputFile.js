import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TextInput, DefaultTheme} from 'react-native-paper';

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
    disabled,
    inputmax,
    keyboardType,
    words_count,
    editable,
    meta: {touched, error},
    input: {onChange, ...restInput},
    ...rest
  } = props;

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
  const handleTextChange = (text, index) => {
    // setWordCount(text.length);
    
    onChange(text);

    const sumArr = text.split(",");
    const sum = sumArr.reduce(function(a, b){
      return parseInt(a) + parseInt(b);
    }, 0);
    if(sum) {
      setfirst(sum);
    }

  };

 
  return (
    <View>
      <TextInput
        {...restInput}
        {...rest}
        editable={editable ? false : true}
        theme={{
          colors: {
            ...DefaultTheme.colors,
            // onSurfaceVariant: input_mode ? '#818be3' : '',
            placeholder: 'red',
            primary: '#878787',
          },
        }}
        onFocus={focusTextInput && handleTextInputFocus}
        mode={input_mode ? 'flat' : ''}
        label={title}
        // onChangeText={(text)=>handleTextChange(text,index)}
        onChangeText={text => onChange(text)}
        style={{
          backgroundColor: '#fff',
          marginTop: 10,
          width: input_cusstyle ? '100%' : 301,
          // marginRight: 10,
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
            <TextInput.Icon icon={icon} onPress={handleTextInputFocus} />
          ) : (
            <TextInput.Icon icon={icon} />
          )
        }
      />
       {/* <Text>Total: {total}</Text> */}
      {/* {inputmax ? (
        <Text style={{alignSelf: 'flex-end', color: '#818be3'}}>
          {wordCount}/{inputmax}
        </Text>
      ):
      <></>} */}
      {touched && error && <Text style={{color: 'red'}}>{error}</Text>}
    </View>
  );
}
