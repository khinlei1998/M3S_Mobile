import {
  View,
  Text,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {TextInput} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
export default function DatePicker(props) {
  const {
    label,
    icon,
    meta: {touched, error},
    onWorkingDateChange,
    input,
    require,
  } = props;
  const [showdate, setShowDate] = useState(false);
  const [date, setDate] = useState('');

  function showcalendar() {
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
      <View style={{flexDirection: 'column', height: 66}}>
        <TextInput
          {...input}
          label={
            <Text style={{color: '#636Dc6'}}>
              {label} {require && <Text style={{color: 'red'}}>*</Text>}
            </Text>
          }
          underlineColorAndroid={'rgba(0,0,0,0)'}
          underlineColor='transparent'
          value={date ? moment(date).format('YYYY-MM-DD') : input.value}
          editable={false}
          style={{
            borderColor: '#d6d6d6',
            borderWidth: 0.8,
            backgroundColor: '#FAFAFA',
            marginTop: 10,
            width: 300,
          }}
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
