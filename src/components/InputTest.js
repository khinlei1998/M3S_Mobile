import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TextInput, DefaultTheme} from 'react-native-paper';
import {updateTotalSum} from '../redux/MonthlyReducer';
import {connect, useDispatch} from 'react-redux';

function InputFile(props) {
  const [passwordIcon, setPasswordIcon] = useState('eye');
  const [isPassword, setIsPassword] = useState(true);
  const [wordCount, setWordCount] = React.useState(0);
  const [totalSum, setTotalSum] = useState(0);

  const {
    updateTotalSum,
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
    input: {onChange, value, ...restInput},
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
    updateTotalSum(sum);

    setTotalSum(sum);
  };

  return (
    <View>
      <TextInput
        {...restInput}
        {...rest}
        editable={editable ? false : true}
        defaultValue={value}
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
        onChangeText={(text) => handleTextChange(text)}
        // onChangeText={text => onChange(text)}
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
      <Text>Total: {total}</Text>
      <Text>{totalSum}</Text>
      {/* {inputmax ? (
        <Text style={{alignSelf: 'flex-end', color: '#818be3'}}>
          {wordCount}/{inputmax}
        </Text>
      ):
      <></>} */}
      {touched && error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
    // <TextInput
    //   {...restInput}
    //   {...rest}
    //   style={{borderWidth: 1}}
    //   defaultValue={value}
    //   onChangeText={text => handleTextChange(text)}
    // />
  );
}

export default connect(null, {updateTotalSum})(InputFile);

// import {Text, View, TextInput} from 'react-native';
// import React from 'react';
// export default function InputFile(props) {
//   const {
//     input: {onChange, value, ...restInput},
//     ...rest
//   } = props;
//   return (
//     <View>
//       <TextInput
//         {...restInput}
//         {...rest}
//         style={{borderWidth: 1}}
//         defaultValue={value}
//         onChangeText={text => onChange(text)}
//       />
//     </View>
//   );
// }

