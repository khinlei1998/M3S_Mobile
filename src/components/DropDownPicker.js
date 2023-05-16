import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {languages} from '../common';
import {StyleSheet, View} from 'react-native';

export default function DropDownPicker(props) {
  const {
    input: {onChange, value},
    data,
    title,
    selectedValue,
    onValueChange,
    num_data,
    pickerStyle,
    enabled,
    ...pickerProps
  } = props;
  return num_data ? (
    // <View
    //   style={{
    //     borderWidth: 0.5,
    //     width: 140,
    //     height: 60,
    //     borderColor: 'black',
    //     justifyContent: 'space-between',
    //     //
    //     backgroundColor: '#fff',
    //     marginTop: 20,
    //     borderColor: 'black',
    //   }}>
    //   <Picker
    //     {...pickerProps}
    //     selectedValue={value}
    //     onValueChange={onChange}
    //     style={[pickerStyle, styles.picker]}
    //     mode="dropdown">
    //     <Picker.Item label={title} value="" />
    //     {num_data.length > 0 &&
    //       num_data.map(val => (
    //         <Picker.Item key={val} label={val.toString()} value={val} />
    //       ))}
    //   </Picker>
    // </View>
    <View
      style={{
        borderColor: 'black',
        backgroundColor: '#FFF',
        borderWidth: 0.5,
        marginTop: 10,
        // marginLeft: 10,
        width: pickerStyle.width ,
      }}>
      <Picker
        {...pickerProps}
        selectedValue={value}
        onValueChange={onChange}
        style={[pickerStyle, styles.picker]}
        // style={{
        //   height: 50,
        //   width: pickerStyle.width,
        //   color: 'black',
        // }}
      >
        <Picker.Item label={title} value="" />
        {num_data.length > 0 &&
          num_data.map(val => (
            <Picker.Item key={val} label={val.toString()} value={val} />
          ))}
      </Picker>
    </View>
  ) : (
    <View
      style={{
        borderColor: 'black',
        backgroundColor: '#FFF',
        borderWidth: 0.5,
        marginTop: 10,
        // marginLeft: 10,
        width: pickerStyle.width,
        borderRadius:2
      }}>
      <Picker
        {...pickerProps}
        enabled={enabled?false:true}
        selectedValue={value}
        onValueChange={onChange}
        style={[pickerStyle, styles.picker]}
        // style={{
        //   height: 50,
        //   width: 200,
        //   color: 'black',
        // }}
        mode="dropdown">
        <Picker.Item label={title} value="" />
        {data.length > 0 &&
          data.map(val => (
            <Picker.Item label={val.label} value={val.value} key={val.id} />
          ))}
      </Picker>
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
