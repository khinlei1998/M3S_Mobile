import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Checkbox } from 'react-native-paper';
export default function SingleCheckBox(props) {
  const {
    label,
    defaultValue,
    checkedValue,
    uncheckedValue,
    input: { value, onChange },
    ...rest
  } = props;
  const [checked, setChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setChecked(!checked);
    console.log('checked', checked);

    if (!checked) {
      input.onChange('Y');
    } else {
      input.onChange('N');
    }
    console.log('input', input);
  };
  const handleToggle = () => {
    onChange(!value);
  };
  console.log('value', value);

  // const formatCheckboxValue = value => {
  //   // Format the checkbox value to the desired format
  //   return value == '' ? 'F' : value;
  // };

  const booleanToValue = (value) => {
    if (value == true) {
      return 'Y';
    } else if (value == false) {
      return 'N';
    }
    return 'N'; // default value if the value is not recognized
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Checkbox
        status={value ? 'checked' : 'unchecked'}
        // status={booleanToValue(value) == 'Y' ? 'checked' : 'unchecked'}

        onPress={handleToggle}

      // format={formatCheckboxValue}
      // defaultValue={false}
      />
      <Text style={{ color: 'black' }}>{label}</Text>
    </View>
  );
}