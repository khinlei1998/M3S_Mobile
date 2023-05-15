import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { languages } from '../common';
import { StyleSheet, View } from 'react-native';

export default function DropDownPicker(props) {
  const {
    input: { onChange, value },
    data,
    title,
    selectedValue,
    onValueChange,
    num_data,
    pickerStyle,
    ...pickerProps
  } = props;

  return num_data ? (
    //   <View style={{ borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden',width:280,height:90
    // }}>

    <Picker
      {...pickerProps}
      selectedValue={value}
      onValueChange={onChange}
      style={[pickerStyle, styles.picker]}
      mode="dropdown">
      <Picker.Item label={title} value="" />
      {num_data.length > 0 &&
        num_data.map(val => (
          <Picker.Item key={val} label={val.toString()} value={val} />
        ))}
    </Picker>
    // </View>

  ) : (
    <Picker
      {...pickerProps}
      selectedValue={value}
      onValueChange={onChange}
      style={[pickerStyle, styles.picker]}
      mode="dropdown">
      <Picker.Item label={title} value="" />
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
    borderColor: 'black',
    borderWidth: 1,
    borderBottomColor: 'red'
  },
});
