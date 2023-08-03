import {View} from 'react-native';
import React, {useState} from 'react';
import {style} from '../style/Customer_Mang_style';
import {operations} from '../common';
import {RadioButton, Button} from 'react-native-paper';
export default function Create_Operation(props) {
  const {handleSubmit} = props;
  const [show_operation, setOperation] = useState('1');

  return (
    <View style={style.continer}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {operations.map((option, index) => (
          <RadioButton.Group
            key={index}
            onValueChange={newValue => setOperation(newValue)}
            value={show_operation}>
            <View
              key={option.value}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <RadioButton.Item
                uncheckedColor="#636Dc6"
                disabled={option.value !== show_operation}
                label={option.label}
                value={option.value}
                color="#636Dc6"
                labelStyle={{marginLeft: 5}}
              />
            </View>
          </RadioButton.Group>
        ))}
      </View>
      <Button
        onPress={handleSubmit}
        mode="contained"
        buttonColor={'#21316C'}
        style={style.btnStyle}>
        OK
      </Button>
    </View>
  );
}
