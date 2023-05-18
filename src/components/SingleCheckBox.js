import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Checkbox} from 'react-native-paper';
export default function SingleCheckBox(props) {
  const {
    label,
    defaultValue,
    checkedValue,
    uncheckedValue,
    input: {value, onChange},
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
    const newValue = value ? uncheckedValue : checkedValue;
    onChange(newValue);
  };

  const formatCheckboxValue = value => {
    // Format the checkbox value to the desired format
    return value == '' ? 'F' : value;
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {/* <Checkbox
        {...rest}
        status={checked ? 'checked' : 'unchecked'}
        onPress={handleCheckboxToggle}
      /> */}

      <Checkbox
        status={value ? 'checked' : 'unchecked'}
        // onPress={() => onChange(!value)}
        onPress={handleToggle}
        format={formatCheckboxValue}
        defaultValue={false}
      />
      <Text style={{color: 'black'}}>{label}</Text>
    </View>
  );
}
