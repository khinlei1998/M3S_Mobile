import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { cus_filter_item } from '../../common';
import ViewCustomer from './ViewCustomer';
import { TextInput } from 'react-native-paper';
import { filterCustomer } from '../../query/Customer_query';
import { Picker } from '@react-native-picker/picker';

export default function CustomerSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [all_customer, setAllCustomer] = useState([]);
  const [selectedItemValue, setSelectedItemValue] = useState('customer_nm');

  useEffect(() => {


    return () => {
      setAllCustomer([]);
    }
  }, [])


  const handleSearch = async () => {
    await filterCustomer(selectedItemValue, searchTerm)
      .then(data => (data.length > 0 ? setAllCustomer(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const handleItemValueChange = itemValue => {
    setSelectedItemValue(itemValue);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <Text
          style={{ fontSize: 20, color: '#273050', marginTop: 10, padding: 10 }}>
          Customer Information Management
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10 }}>Search Item:</Text>

            <Picker
              selectedValue={selectedItemValue}
              onValueChange={handleItemValueChange}
              style={{ width: 200, backgroundColor: 'white' }}
              mode="dropdown">
              {cus_filter_item.length > 0 &&
                cus_filter_item.map(val => (
                  <Picker.Item
                    label={val.label}
                    value={val.value}
                    key={val.id}
                  />
                ))}
            </Picker>
          </View>

          <View style={{ width: '50%' }}>
            <TextInput
              value={searchTerm}
              onChangeText={text => setSearchTerm(text)}
              right={
                <TextInput.Icon
                  icon={'magnify'}
                  onPress={() => handleSearch()}
                />
              }
              style={{
                backgroundColor: 'white',
              }}
            />
          </View>
        </View>
        <ViewCustomer customer_data={all_customer} />

       
      </View>
    </TouchableWithoutFeedback>
  );
}
