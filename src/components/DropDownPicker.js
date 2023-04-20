import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {languages} from '../common';
export default function DropDownPicker(props) {
  const {data} = props;
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <Picker
      style={{backgroundColor: '#fff', marginTop: 20}}
      mode="dropdown"
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}>
      {data.length > 0 &&
        data.map(val => (
          <Picker.Item label={val.label} value={val.value} key={val.id} />
        ))}
    </Picker>
  );
}
