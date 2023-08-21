import { View, Text, FlatList, TouchableOpacity, LogBox } from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset, change } from 'redux-form';
import { addInquiryLoanData } from '../../redux/LoanReducer';
import { loan_application_type } from '../../common';

function Viewloan(props) {
  const { loan_data, navigation, addInquiryLoanData } = props;
  const btn_inquiry_loan = item => {
    if (item.product_type == 20) {
      navigation.navigate('Edit_Individual_Staff_loan_Info', item);
      addInquiryLoanData(item);
    } else if (item.product_type == 10) {
      addInquiryLoanData(item);
      navigation.navigate('Edit_Individual_Loan', item);
    } else if (item.product_type == 30) {
      navigation.navigate('Edit Group Loan', item);
    } else if (item.product_type == 40) {
      navigation.navigate('Edit_Cover_Loan', item);
    } else if (item.product_type == 50) {
      navigation.navigate('Edit_Reloan', item);
    }
  };
  const item = ({ item, index }) => {
    const foundItem = loan_application_type.filter(
      data => data.value == item.product_type,
    );
    return (
      <TouchableOpacity onPress={() => btn_inquiry_loan(item)}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            padding: 5,
            margin: 15,

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
            {foundItem[0].label}
          </Text>
          <Text
            style={{
              padding: 10,
              flex: 1,
            }}>
            {item.application_no ?? item.group_aplc_no}
          </Text>

          <Text
            style={{
              padding: 10,
              flex: 1,
            }}>
            {item.borrower_name ?? item.leader_name}
          </Text>

          <Text
            style={{
              padding: 10,
              flex: 1,
            }}>
            {item.application_amt}
          </Text>

          <Text
            style={{
              padding: 10,
              flex: 1,
            }}>
            {item.tablet_sync_sts}
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
          backgroundColor: '#D7D8DC',
          borderRadius: 10,
          padding: 5,
          margin: 15,
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
          Loan Type
        </Text>
        <Text
          style={{
            flex: 1,

            padding: 10,
            fontWeight: 'bold',
          }}>
          Application No
        </Text>
        <Text
          style={{
            flex: 1,

            padding: 10,
            fontWeight: 'bold',
          }}>
          Borrower Name
        </Text>

        <Text
          style={{
            flex: 1,

            padding: 10,
            fontWeight: 'bold',
          }}>
          Application amount
        </Text>

        <Text
          style={{
            flex: 1,

            padding: 10,
            fontWeight: 'bold',
          }}>
          Sync
        </Text>
      </View>

      <FlatList
        data={loan_data}
        renderItem={item}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
}

export default reduxForm({
  form: 'ViewloanForm',
})(
  connect(null, {
    addInquiryLoanData,
  })(Viewloan),
);
