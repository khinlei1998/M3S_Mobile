import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { languages } from '../common';
import { StyleSheet, View, Text } from 'react-native';

export default function DropDownPicker(props) {
  const {
    input: { onChange, value },
    meta,
    data,
    title,
    selectedValue,
    onValueChange,
    num_data,
    pickerStyle,
    enabled,
    ...pickerProps
  } = props;

  const Rendererror = ({ touched, error }) => {
    if (touched && error) {
      return (

        <Text style={{ color: 'red' }}>{error}</Text>
      )
    }
  }

  return num_data ? (
    <View
      style={{
        borderColor: 'black',
        backgroundColor: '#FFF',
        borderWidth: 0.5,
        marginTop: 10,
        width: pickerStyle.width,
        borderRadius: 2,
      }}>
      <Picker
        {...pickerProps}
        enabled={enabled ? false : true}
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

    </View>

  ) : (
    <View style={{ flexDirection: 'column' }}
    >
      <View style={{
        borderColor: 'black',
        backgroundColor: '#FFF',
        borderWidth: 0.5,
        marginTop: 10,
        width: pickerStyle.width,
        borderRadius: 2,
      }}>

        <Picker
          {...pickerProps}
          enabled={enabled ? false : true}
          selectedValue={value}
          onValueChange={onChange}
          style={[pickerStyle, {

            color: 'black',
          }]}
          mode="dropdown">
          <Picker.Item label={title} value="" />
          {data.length > 0 &&
            data.map(val => (
              <Picker.Item label={val.label} value={val.value} key={val.id} />
            ))}
        </Picker>
      </View>

      {Rendererror(meta)}
    </View>


  );
}

const styles = StyleSheet.create({
  picker: {
    // backgroundColor: '#fff',
    // marginTop: 20,
    color: 'black',

  },
});
