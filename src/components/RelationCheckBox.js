import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Checkbox} from 'react-native-paper';
export default function SingleCheckBox(props) {
  const {
    label,
    disabled,
    defaultValue,
    checkedValue,
    uncheckedValue,
    input: {value, onChange},
    ...rest
  } = props;

  const handleToggle = () => {
    onChange(!value);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Checkbox
        status={value == 1 ? 'checked' : 'unchecked'}
        onPress={handleToggle}
        disabled={disabled}
      />
      <Text style={{color: 'black'}}>{label}</Text>
    </View>
  );
}
