import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {languages} from '../common';
export default function DropDownPicker() {
  const [selectedLanguage, setSelectedLanguage] = useState();

  console.log('languages',languages);

  return (
    <Picker
      style={{backgroundColor: '#fff', marginTop: 20}}
      mode="dropdown"
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}>

      {languages.length>0 && languages.map(val => (
        <Picker.Item
          label={val.label}
          value={val.value}
          key={val.id}
          
        />
      ))}
    </Picker>
  );
}
