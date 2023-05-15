import {
  SafeAreaView,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
export default function DatePicker(props) {
  const { onAgeChange, meta, input } = props;

  const [showdate, setShowDate] = useState(false);
  const [date, setDate] = useState('');

  function showcalendar() {
    setShowDate(true);
  }

  function hidedate() {
    setShowDate(false);
  }

  function onConfirm(date) {
    const chose_date = moment(date).format('YYYY-MM-DD');
    setDate(date);
    input.onChange(chose_date);
    hidedate();
    onAgeChange ? getAge(date, chose_date) : '';
  }

  return (
    <>
      <View style={{  flexDirection: 'row',height:66,marginLeft:10 }}>
        <TextInput
          {...input}
          mode={'outlined'}
          value={date ? moment(date).format('YYYY-MM-DD') : ''}
          style={{
            backgroundColor: '#FFF',
            marginTop: 10,
            width:  300, 
            marginRight: 10,
          }}

          onFocus={() => showcalendar()}
          activeUnderlineColor="red"
          right={

            <TextInput.Icon icon={'calendar'} onPress={() => showcalendar()} />

          }
        />
         

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
