import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import { setInquiryStatus } from '../../redux/CustomerReducer';
import { getInquiryCusData } from '../../redux/CustomerReducer';
import {connect} from 'react-redux';
import {Field, reduxForm, reset, change} from 'redux-form';
 function ViewCustomer(props) {
  const {customer_data, navigation,getInquiryCusData} = props;
  const btn_inquiry=(item)=>{
    navigation.navigate('Edit_Emp_Info', item)
    getInquiryCusData(item)
  }
  const item = ({item, index}) => {
    console.log('item',item);
    return (
      <TouchableOpacity
        onPress={() =>btn_inquiry(item) }>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            padding: 10,
          }}>
          <Text
            style={{
              padding: 10,
              flex: 1,
            }}>
            {index + 1}
          </Text>
          <Text
            style={{
              padding: 10,
              flex: 1,
            }}>
            {item.customer_no}
          </Text>
          <Text
            style={{
              padding: 10,
              flex: 1,
            }}>
            {item.customer_nm}
          </Text>

          <Text
            style={{
              padding: 10,
              flex: 1,
            }}>
            {item.nrc_no == null ? 'No Data' : item.nrc_no}
          </Text>

          <Text
            style={{
              padding: 10,
              flex: 1,
            }}>
            {item.tel_no == null ? 'No Data' : item.tel_no}
          </Text>

          <Text
            style={{
              padding: 10,
              flex: 1,
            }}>
            {item.mobile_tel_no == null ? 'NO Data' : item.mobile_tel_no}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          borderRadius: 5,
          padding: 5,
          margin: 20,
        }}>
        <Text
          style={{
            padding: 10,
            flex: 1,
            fontWeight: 'bold',
          }}>
          #
        </Text>
        <Text
          style={{
            flex: 1,

            padding: 10,
            fontWeight: 'bold',
          }}>
          Customer No
        </Text>
        <Text
          style={{
            flex: 1,

            padding: 10,
            fontWeight: 'bold',
          }}>
          Customer Name
        </Text>
        <Text
          style={{
            flex: 1,

            padding: 10,
            fontWeight: 'bold',
          }}>
          NRC
        </Text>

        <Text
          style={{
            flex: 1,

            padding: 10,
            fontWeight: 'bold',
          }}>
          Phone Number
        </Text>

        <Text
          style={{
            flex: 1,

            padding: 10,
            fontWeight: 'bold',
          }}>
          Mobile Phone Number
        </Text>
      </View>

      <FlatList
        data={customer_data}
        renderItem={item}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
}

export default reduxForm({
  form: 'Customer_ManagementForm',
  enableReinitialize: true,
})(
  connect(null, {
    getInquiryCusData,
  })(ViewCustomer),
);
