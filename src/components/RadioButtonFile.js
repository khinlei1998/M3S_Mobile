import { View, Text } from 'react-native';
import React from 'react';
import { RadioButton } from 'react-native-paper';
import {useTranslation} from 'react-i18next';

export default function RadioButtonFile(props) {
  const { customstyle, get_value, disabled, data, input, ShowRadioBtnChange } = props;
  const {t} = useTranslation();
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
              color="#636Dc6"
              uncheckedColor="#636Dc6"
                label={t(val.name)}
                key={val.id}

                value={val.id}
                status={input.checked ? 'checked' : 'unchecked'}
                style={{ flexDirection: customstyle ? 'row-reverse' : 'row',}}
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

