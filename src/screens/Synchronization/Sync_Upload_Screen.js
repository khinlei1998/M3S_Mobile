import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DividerLine from '../../components/DividerLine';
import { Button, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { loan_application_type } from '../../common';
import {connect} from 'react-redux';
import {Field, reduxForm, reset, change} from 'redux-form';
import { addInquiryLoanData } from '../../redux/LoanReducer';
 function Sync_Upload_Screen(props) {
  const {
    btnUploadCustomer,
    btnLoanUpload,
    customer_data,
    loan_data,
    btn_disabled,
    btn_cus_disabled,
    all_survey,
    addInquiryLoanData,
    navigation
  } = props;
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  setCheckedItems
  const isChecked = item => {
    return checkedItems.some(checkedItem => checkedItem.application_no?checkedItem.application_no === item.application_no:checkedItem.group_aplc_no === item.group_aplc_no);
  };

  const handleSelectAllToggle = () => {
    const updatedSelectAll = !selectAll;
    setSelectAll(updatedSelectAll);
    const updatedData = loan_data.map(item => ({
      ...item,
      checked: updatedSelectAll,
    }));
    if (updatedSelectAll) {
      setCheckedItems(updatedData);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxToggle = item => {
    if (isChecked(item)) {
      setCheckedItems(
        checkedItems.filter(checkedItem => checkedItem.application_no?checkedItem.application_no !== item.application_no:checkedItem.group_aplc_no !== item.group_aplc_no),
      );
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };

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

  const item = ({ item,index }) => {
    const foundItem = loan_application_type.filter(
      data => data.value == item.product_type,
    );
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 10,
        }}>
        <Checkbox
          key={item.id}
          status={
            checkedItems.some(checkedItem => checkedItem.application_no?checkedItem.application_no === item.application_no:checkedItem.group_aplc_no === item.group_aplc_no)
              ? 'checked'
              : 'unchecked'
          }
          onPress={() => handleCheckboxToggle(item)}
        />
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {index+1}
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
        <View
          style={{
            padding: 10,
            flex: 1,
            flexDirection: 'row',
          }}>
          <Text>{item.tablet_sync_sts}</Text>
          <TouchableOpacity onPress={() => btn_inquiry_loan(item)}>
            <Icon
              name="chevron-right"
              size={30}
              color="#000"
              style={{ marginLeft: 15 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };


  return (
    <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10, flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 10 }}>
          Upload Application
        </Text>

        <View>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'right',
              color: 'red',
            }}>
            {loan_data.length}
            <Text style={{ color: '#c7c7c7', fontSize: 15 }}> PCS</Text>
          </Text>
        </View>
      </View>

      <DividerLine cuswidth />
      <View
        style={{
          flexDirection: 'row',
          borderRadius: 5,
          padding: 5,
          margin: 10,
        }}>
        <Checkbox
          status={selectAll ? 'checked' : 'unchecked'}
          onPress={handleSelectAllToggle}
        />

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
      <View style={{ flexDirection: 'row', marginLeft: 15 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>New Customer : </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
          {customer_data.length}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 15 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>New Survey : </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
          {all_survey.length}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
          alignSelf: 'center',
        }}>
        <Button
          disabled={btn_cus_disabled}
          onPress={() => btnUploadCustomer()}
          mode="contained"
          buttonColor={'#6870C3'}
          style={{
            borderRadius: 0,
            width: 120,
            marginTop: 10,
            color: 'black',
            marginLeft: 5,
            padding: 5,
          }}>
          Customer
        </Button>

        <Button
          disabled={btn_disabled}
          style={{
            borderRadius: 0,
            width: 120,
            marginTop: 10,
            color: 'black',
            marginLeft: 5,
            padding: 5,
          }}
          mode="outlined"
          onPress={() => btnLoanUpload(checkedItems)}>
          Upload
        </Button>
      </View>
    </View>
  );
}
export default reduxForm({
  form: 'SyncUploadForm',
})(
  connect(null, {
    addInquiryLoanData,
  })(Sync_Upload_Screen),
);
