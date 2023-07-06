import { View, Text } from 'react-native';
import React from 'react';
import { RadioButton } from 'react-native-paper';

export default function RadioButtonFile(props) {
  const { customstyle, get_value, disabled, data, input, ShowRadioBtnChange } = props;
  return (
    <View
      style={{
        flexDirection: customstyle ? 'column' : 'row',
      }}>
      {data.map((val, index) => {
        return (
          <RadioButton.Group
            onValueChange={
              ShowRadioBtnChange
                ? () => ShowRadioBtnChange(val, input)
                : input.onChange
            }
            value={input.value ? input.value : get_value}
            key={index}>
            <View style={{ flexDirection: 'row' }}>
              <RadioButton.Item
                label={val.name}
                key={val.id}

                value={val.id}
                status={input.checked ? 'checked' : 'unchecked'}
                style={{ flexDirection: customstyle ? 'row-reverse' : 'row' }}
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

