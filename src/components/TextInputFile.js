import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { AuthContext } from './context';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TextInputFile(props) {
  const [passwordIcon, setPasswordIcon] = useState('eye');
  const [isPassword, setIsPassword] = useState(true);

  
  // const {login_info}=useContext(AuthContext)
  // console.warn('login_info',login_info)

  const {defaultData, showValue, password, title, input, meta: { touched, error }, ...inputProps } = props;

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
    <View style={{ marginTop: 20 }}>
      <TextInput
        {...inputProps}
        // defaultValue='kk'
        label={title}
        onChangeText={(text) => input.onChange(text)}
        // onChangeText={input.onChange}
        style={{ backgroundColor: 'white' }}
        secureTextEntry={isPassword && password ? true : false} //for android
        placeholder={showValue ? defaultData : ''}
        // defaultValue={input.value}
        // value={input.value}
        right={
          password ? (
            <TextInput.Icon icon={passwordIcon} onPress={togglePasswordIcon} />
          ) : null
        }
      />
          {touched && error && <Text style={{color:"red"}}>{error}</Text>}

    </View>
  );
}
