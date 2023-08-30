import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { languages } from '../common';
import { StyleSheet, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function DropDownPicker(props) {
  const {
    input: { onChange, value },
    meta,
    data,
    title,
    selectedValue,
    num_data,
    pickerStyle,
    showDropChange,
    enabled,
    prefix,
    require,
    ...pickerProps
  } = props;
  const { t } = useTranslation();

  const Rendererror = ({ touched, error }) => {
    if (touched && error) {
      return <Text style={{ color: 'red' }}>{error}</Text>;
    }
  };

  return num_data ? (
    <View
      style={{
        borderColor: '#d6d6d6',
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
        style={[
          pickerStyle,
          enabled && {
            color: '#000',
          },
        ]}
        mode="dropdown">
        <Picker.Item label={title} value="" style={{ color: '#636Dc6' }} />
        {num_data.length > 0 &&
          num_data.map(val => (
            <Picker.Item key={val.id} label={val.label} value={val.value} />
          ))}
      </Picker>
    </View>
  ) : (
    <View style={{ flexDirection: 'column' }}>
      <View
        style={{
          borderColor: '#d6d6d6',
          backgroundColor: enabled ? '#FAFAFA' : '#FFF',
          borderWidth: 0.8,
          marginTop: 10,
          width: pickerStyle.width,
          borderRadius: 2,
        }}>
        <Picker
          {...pickerProps}
          enabled={enabled ? false : true}
          selectedValue={prefix ? prefix : value}
          // onValueChange={onChange}
          onValueChange={itemValue =>
            showDropChange ? showDropChange(itemValue) : onChange(itemValue)
          }
          style={[
            pickerStyle,
            enabled && {
              color: '#000',
            },
          ]}
          mode="dropdown">

          <Picker.Item label={title} value="" style={{ color: '#636Dc6' }} />
          {data.length > 0 &&
            data.map(val => (
              <Picker.Item label={t(val.label)} value={val.value} key={val.id} />
            ))}
        </Picker>
      </View>

      {Rendererror(meta)}
    </View>
  );
}

const styles = StyleSheet.create({
  // picker: {
  //   color: '#000',
  // },
});
