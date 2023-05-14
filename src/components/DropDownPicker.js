import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {languages} from '../common';
import {StyleSheet} from 'react-native';

export default function DropDownPicker(props) {
  const {
    input: {onChange, value},
    data,
    selectedValue,
    onValueChange,
    num_data,
    pickerStyle,
    ...pickerProps
  } = props;

  return num_data ? (
    <Picker
      {...pickerProps}
      selectedValue={value}
      onValueChange={onChange}
      style={[pickerStyle, styles.picker]}
      mode="dropdown">
      {/* <Picker.Item label={'oo'} value="" /> */}
      {num_data.length > 0 &&
        num_data.map(val => (
          <Picker.Item key={val} label={val.toString()} value={val} />
        ))}
    </Picker>
  ) : (
    <Picker
      {...pickerProps}
      selectedValue={value}
      onValueChange={onChange}
      style={[pickerStyle, styles.picker]}
      mode="dropdown">
      {/* <Picker.Item label={'oo'} value="" /> */}
      {data.length > 0 &&
        data.map(val => (
          <Picker.Item label={val.label} value={val.value} key={val.id} />
        ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  picker: {
    backgroundColor: '#fff',
    marginTop: 20,
  },
});
