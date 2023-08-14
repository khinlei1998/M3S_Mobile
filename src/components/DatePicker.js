import {
  SafeAreaView,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {TextInput} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
export default function DatePicker(props) {
  const {
    editable,
    label,
    onAgeChange,
    icon,
    meta: {touched, error},
    // input: {value, onChange, ...restInput},
    // ...rest
    onWorkingDateChange,
    input,
    require,
  } = props;
  const [showdate, setShowDate] = useState(false);
  const [date, setDate] = useState('');

  function showcalendar() {
    // alert('oo')
    setShowDate(true);
  }

  function hidedate() {
    setShowDate(false);
  }

  function onConfirm(date) {
    setShowDate(false);
    const chose_date = moment(date).format('YYYY-MM-DD');
    setDate(date);
    input.onChange(chose_date);
    onWorkingDateChange ? getWorkingMonth(date, chose_date) : '';
  }
  const getWorkingMonth = (date, chose_date) => {
    const today = moment();
    const monthDiff = today.diff(chose_date, 'months'); // Calculate month difference
    onWorkingDateChange(monthDiff);
  };
  return (
    <>
      {/* <View style={{flexDirection: 'row', height: 66}}> */}
      <View style={{flexDirection: 'column', height: 66}}>
        <TextInput
          {...input}
          // label={label}
          label={
            <Text style={{color: '#636Dc6'}}>
              {label} {require && <Text style={{color: 'red'}}>*</Text>}
            </Text>
          }
          mode={'outlined'}
          value={date ? moment(date).format('YYYY-MM-DD') : input.value}
          // editable={editable ? false : true}
          editable={false}
          style={{
            // backgroundColor: '#FFF',
            backgroundColor: '#FAFAFA',
            marginTop: 10,
            width: 300,
            // marginRight: 10,
          }}
          // onFocus={() => showcalendar()}
          activeUnderlineColor="red"
          right={
            <TextInput.Icon
              icon={icon}
              onPress={() => showcalendar()}
              iconColor="#636Dc6"
            />
          }
        />
        {touched && error && <Text style={{color: 'red'}}>{error}</Text>}

        <DateTimePickerModal
          onCancel={hidedate}
          isVisible={showdate}
          mode="date"
          onConfirm={onConfirm}
          maximumDate={new Date()}
        />
      </View>
    </>
  );
}
