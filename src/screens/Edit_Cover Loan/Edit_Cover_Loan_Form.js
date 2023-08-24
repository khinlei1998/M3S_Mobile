import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DividerLine from '../../components/DividerLine';
import {operations} from '../../common';
import Icon from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';
import {TextInput} from 'react-native-paper';
import {reduxForm, Field, change, reset} from 'redux-form';
import {style} from '../../style/Cover_Loan_style';
import {RadioButton, Button, Modal} from 'react-native-paper';
import {connect, useDispatch} from 'react-redux';
import Edit_Cover_Loan_Info from './Edit_Cover_Loan_Info';
import Edit_Cover_Loan_list from './Edit_Cover_Loan_List';
import {cus_filter_item} from '../../common';
import {filterCustomer} from '../../query/Customer_query';
import {setCover_UpdateStatus} from '../../redux/LoanReducer';
import {
  getLoan_By_GroupID,
  deleteGroup_LoanID,
  updateGroupData,
} from '../../query/GropuLon_query';
import validate from '../Group_Loan/Validate';
const Borrower_modal = props => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(null);
  const [emp_data, setEmpData] = React.useState('');

  const {
    all_cus,
    modalVisible,
    hideModal,
    selectedItemValue,
    handleItemValueChange,
    setAllCus,
  } = props;

  const onChangeEmpText = inputText => {
    setEmpData(inputText);
  };

  const btnCusSearch = async () => {
    await filterCustomer(selectedItemValue, emp_data)
      .then(data => (data.length > 0 ? setAllCus(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const btnSelectEmployee = item => {
    setSelectedValue(item.id);
    dispatch(change('Cover_Form', 'leader_name', item.customer_nm));
    dispatch(change('Cover_Form', 'resident_rgst_id', item.resident_rgst_id));
    dispatch(change('Cover_Form', 'customer_no', item.customer_no));
  };

  const item = ({item, index}) => {
    return (
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
          {item.customer_nm}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.resident_rgst_id}
        </Text>

        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.tel_no == null ? 'No Data' : item.tel_no}
        </Text>

        <View>
          <RadioButton
            value={item.id}
            status={selectedValue === item.id ? 'checked' : 'unchecked'}
            onPress={() => btnSelectEmployee(item)}
          />
        </View>
      </View>
    );
  };
  return (
    <Modal
      useNativeDriver
      hideModalContentWhileAnimating
      dismissable={false}
      visible={modalVisible}
      onDismiss={hideModal}
      contentContainerStyle={style.modal_container}>
      <View
        style={style.modal_header}
        onStartShouldSetResponder={() => hideModal()}>
        <Icon
          name="x-circle"
          size={25}
          color="#fff"
          style={style.cancel_icon_style}
        />
      </View>
      <View style={style.modal_body_container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginRight: 10}}>Search Item:</Text>

            <Picker
              selectedValue={selectedItemValue}
              onValueChange={handleItemValueChange}
              style={{
                width: 200,
                backgroundColor: 'white',
                marginTop: 7,
              }}
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

          <View style={{width: '50%'}}>
            <TextInput
              style={{
                backgroundColor: '#fff',
                marginTop: 10,
                width: 250,
                borderColor: '#303030',
                borderWidth: 0.5,
              }}
              value={emp_data}
              onChangeText={onChangeEmpText}
              right={
                <TextInput.Icon
                  icon={'magnify'}
                  onPress={() => btnCusSearch()}
                />
              }
            />
          </View>
        </View>
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
            Name
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
        </View>

        <FlatList
          data={all_cus}
          renderItem={item}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Button
            onPress={() => hideModal()}
            mode="contained"
            buttonColor={'#6870C3'}
            style={{
              borderRadius: 0,
              width: 100,
              marginTop: 10,
              color: 'black',
              marginLeft: 5,
            }}>
            OK
          </Button>
        </View>
      </View>
    </Modal>
  );
};
function Edit_Cover_Loan_Form(props) {
  const {handleSubmit, navigation, setCover_UpdateStatus, cover_update_status} =
    props;
  const inquiry_cover_loan = props.route.params;

  const [show_operation, setOperation] = useState('2');
  const [modalVisible, setModalVisible] = useState(false);
  const [all_cus, setAllCus] = useState([]);
  const [selectedItemValue, setSelectedItemValue] = useState('employee_name');
  const [all_loan, setAllLoanData] = useState([]);

  const dispatch = useDispatch();

  const onSubmit = async values => {
    if (show_operation == '4') {
      await deleteGroup_LoanID(values).then(response => {
        if (response == 'success') {
          ToastAndroid.show('Delete Success!', ToastAndroid.SHORT);
          navigation.goBack();
        }
      });
    } else {
      let data = Object.assign(values, {
        product_type: '40',
        tablet_sync_sts: values.tablet_sync_sts == '01' ? '02' : values.tablet_sync_sts

      });
      await updateGroupData(data).then(response => {
        if (response == 'success') {
          ToastAndroid.show('Update Success!', ToastAndroid.SHORT);
          navigation.goBack();
        }
      });
    }
  };
  const btnChangeOperation = newValue => {
    setOperation(newValue);
    if (newValue == 2 || newValue == 4) {
      setCover_UpdateStatus(false);
    } else {
      setCover_UpdateStatus(true);
    }
  };

  const handleItemValueChange = itemValue => {
    setSelectedItemValue(itemValue);
  };
  const hideModal = () => setModalVisible(false);

  const showCustomerSearch = () => {
    setModalVisible(true);
  };
  const loadData = async () => {
    props.initialize(inquiry_cover_loan);
    if (inquiry_cover_loan.p_type == '40') {
      dispatch(change('Edit_Cover_Form', 'product_type', `Cover Loan`));
    } else if (inquiry_cover_loan.p_type == '30') {
      dispatch(change('Edit_Cover_Form', 'product_type', `Group Loan`));
    } else {
      dispatch(change('Edit_Cover_Form', 'product_type', `ReLoan`));
    }
    await getLoan_By_GroupID(inquiry_cover_loan.group_aplc_no).then(
      loan_data => {
        setAllLoanData(loan_data);
      },
    );
  };
  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    if (cover_update_status == true) {
      setOperation('3');
    }
  }, [cover_update_status]);
  const filtered_operations = operations.filter(item => item.value != 1);

  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                marginTop: 20,
                color: '#273050',
                fontWeight: 'bold',
              }}>
              Cover Loan Application
            </Text>

            <DividerLine />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {operations.map((option, index) => (
                  <RadioButton.Group
                    key={index}
                    onValueChange={newValue => btnChangeOperation(newValue)}
                    value={show_operation}>
                    <View
                      key={option.value}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <RadioButton.Item
                        disabled={option.value == '1'}
                        label={option.label}
                        value={option.value}
                        color="#000"
                        labelStyle={{marginLeft: 5}}
                      />
                    </View>
                  </RadioButton.Group>
                ))}
              </View>
              <Button
                disabled={
                  cover_update_status == true && show_operation == '3'
                    ? false
                    : cover_update_status == false && show_operation == '4'
                    ? false
                    : true
                }
                onPress={handleSubmit(onSubmit)}
                mode="contained"
                buttonColor={'#6870C3'}
                style={style.btnStyle}>
                OK
              </Button>
            </View>
            <DividerLine />
            <Edit_Cover_Loan_Info showCustomerSearch={showCustomerSearch} />
            <Edit_Cover_Loan_list
              inquiry_cover_loan={inquiry_cover_loan}
              navigation={navigation}
              all_loan={all_loan}
            />
            <DividerLine />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <Borrower_modal
        handleSubmit={handleSubmit}
        setAllCus={setAllCus}
        modalVisible={modalVisible}
        hideModal={hideModal}
        handleItemValueChange={handleItemValueChange}
        selectedItemValue={selectedItemValue}
        all_cus={all_cus}
      />
    </>
  );
}
function mapStateToProps(state) {
  return {
    cover_update_status: state.loan.cover_update_status,
  };
}

export default reduxForm({
  form: 'Edit_Cover_Form',
  validate,
})(connect(mapStateToProps, {setCover_UpdateStatus})(Edit_Cover_Loan_Form));
