import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Checkbox} from 'react-native-paper';
export default function SingleCheckBox(props) {
  const {
    label,
    disabled,
    defaultValue,
    checkedValue,
    uncheckedValue,
    input: {value, onChange},
    ...rest
  } = props;
  const [checked, setChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setChecked(!checked);

    if (!checked) {
      input.onChange('Y');
    } else {
      input.onChange('N');
    }
  };
  const handleToggle = () => {
    onChange(!value);
  };


  // const formatCheckboxValue = value => {
  //   // Format the checkbox value to the desired format
  //   return value == '' ? 'F' : value;
  // };

  const booleanToValue = value => {
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
        status={value == 1 ? 'checked' : 'unchecked'}
        // status={booleanToValue(value) == 'Y' ? 'checked' : 'unchecked'}

        onPress={handleToggle}
        disabled={disabled}

        // format={formatCheckboxValue}
        // defaultValue={false}
      />
      <Text style={{color: 'black'}}>{label}</Text>
    </View>
  );
}
