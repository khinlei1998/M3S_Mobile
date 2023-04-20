import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';

export default function TextInputFile(props) {
  const [passwordIcon, setPasswordIcon] = useState('eye');
  const [isPassword, setIsPassword] = useState(true);


  const {password, title, input, meta, ...inputProps} = props;

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
    <View style={{marginTop: 20}}>
      <TextInput
        {...inputProps}
        label={title}
        onChangeText={input.onChange}
        style={{backgroundColor: 'white'}}
        secureTextEntry={isPassword ? true : false} //for android
        right={
          password ? (
            <TextInput.Icon icon={passwordIcon} onPress={togglePasswordIcon} />
          ) : null
        }
      />
    </View>
  );
}
