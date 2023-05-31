import {View, Text} from 'react-native';
import React from 'react';
import {RadioButton} from 'react-native-paper';

export default function RadioButtonFile(props) {
  const {disabled, data, input,ShowRadioBtnChange} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      {data.map((val, index) => {
        return (
          <RadioButton.Group
            onValueChange={
              ShowRadioBtnChange
                ? () => ShowRadioBtnChange(val, input)
                : input.onChange
            }
            value={input.value}
            key={index}>
            <View style={{flexDirection: 'row'}}>
              <RadioButton.Item
                key={val.id}
                label={val.name}
                value={val.id}
                status={input.checked ? 'checked' : 'unchecked'}
                // disabled={disabled ? true : false}
                disabled={disabled}
              />
            </View>
          </RadioButton.Group>
        );
      })}
    </View>
  );
}
