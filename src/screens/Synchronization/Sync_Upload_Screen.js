import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DividerLine from '../../components/DividerLine';
import {Button, Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import CheckBoxFile from '../../components/CheckBoxFile';
import {UploadCustomerData} from '../../query/Customer_query';
import {updateTableSyncStatus} from '../../query/Customer_query';
export default function Sync_Upload_Screen(props) {
  const {
    btnUploadCustomer,
    btnLoanUpload,
    customer_data,
    loan_data,
    btn_disabled,
    btn_cus_disabled,
  } = props;
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const isChecked = item => {
    return checkedItems.some(checkedItem => checkedItem.id === item.id);
  };

  const handleSelectAllToggle = () => {
    const updatedSelectAll = !selectAll;
    setSelectAll(updatedSelectAll);
    const updatedData = loan_data.map(item => ({
      ...item,
      checked: updatedSelectAll,
    }));
    // setData(updatedData);
    if (updatedSelectAll) {
      setCheckedItems(updatedData);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxToggle = item => {
    if (isChecked(item)) {
      setCheckedItems(
        checkedItems.filter(checkedItem => checkedItem.id !== item.id),
      );
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };

  const item = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 10,
        }}>
        {/* <CheckBoxFile/> */}

        <Checkbox
          key={item.id}
          status={
            checkedItems.some(checkedItem => checkedItem.id === item.id)
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
          {item.id}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.loan_type}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.application_no}
        </Text>

        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.borrower_name}
        </Text>

        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.past_loan_amount}
        </Text>
        <View
          style={{
            padding: 10,
            flex: 1,
            flexDirection: 'row',
          }}>
          <Text>{item.sync_sts}</Text>
          <TouchableOpacity onPress={() => alert('pp')}>
            <Icon
              name="chevron-right"
              size={30}
              color="#000"
              style={{marginLeft: 15}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  // const btnUploadCustomer = async () => {
  //   await customer_data.forEach(obj => {
  //     obj.tablet_sync_sts = '01';
  //     obj.customer_no=''
  //   });
  //   console.log('customer_data',customer_data);

  //   try {
  //     // Call the API here
  //     await UploadCustomerData(customer_data).then(result => {
  //       console.log('result', result);
  //       if (result == 'success') {
  //         alert('Customer Upload Success')
  //       } else {
  //         alert('Something Wrong')
  //       }
  //     });
  //     // updateTableSyncStatus('13')
  //   } catch (error) {
  //     // If API call fails, revert the value of 'tablet_sync_sts' back to the original value
  //     // customer_data.forEach(obj => {
  //     //   obj.tablet_sync_sts = obj.tablet_sync_sts == '01' ? '01' : obj.tablet_sync_sts;
  //     // });
  //     console.error('API call failed. Value not changed.');
  //   }
  // };

  return (
    <View style={{marginTop: 20, marginLeft: 10, marginRight: 10, flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 10}}>
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
            <Text style={{color: '#c7c7c7', fontSize: 15}}> PCS</Text>
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
      <View style={{flexDirection: 'row', marginLeft: 15}}>
        <Text style={{fontWeight: 'bold', fontSize: 17}}>New Customer : </Text>
        <Text style={{fontWeight: 'bold', fontSize: 17}}>
          {customer_data.length}
        </Text>
      </View>


      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          // position: 'absolute',
          // bottom: 0,
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
          onPress={() =>btnLoanUpload(checkedItems)}>
          Upload
        </Button>
      </View>
    </View>
  );
}
