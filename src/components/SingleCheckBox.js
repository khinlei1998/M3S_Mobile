import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Checkbox } from 'react-native-paper';
export default function SingleCheckBox(props) {
  const [checkedIds, setCheckedIds] = useState([]);

  const {
    label,
    disabled,
    defaultValue,
    checkedValue,
    uncheckedValue,
    input: { value, onChange },
    meta: { touched, error },
    name,
    ...rest
  } = props;

  const handleToggle = () => {
    onChange(!value,name);

  };


  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Checkbox
          status={value == 1 ? 'checked' : 'unchecked'}
          onPress={() => handleToggle(value === checkedValue)}
          disabled={disabled}
        />
        <Text style={{ color: 'black' }}>{label}</Text>
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
