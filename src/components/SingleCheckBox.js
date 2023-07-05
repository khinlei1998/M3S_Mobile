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
    meta: {touched, error},
    ...rest
  } = props;

  const handleToggle = () => {
    onChange(!value,label);
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Checkbox
          //  onValueChange={
          //   ShowRadioBtnChange
          //     ? () => ShowRadioBtnChange(val, input)
          //     : input.onChange
          // }
          status={value == 1 ? 'checked' : 'unchecked'}
          onPress={handleToggle}
          disabled={disabled}
        />
        <Text style={{color: 'black'}}>{label}</Text>
      </View>
      {touched && error && (
        <Text
          style={{
            color: 'red',
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
          }}>
          {error}
        </Text>
      )}
    </>
  );
}
