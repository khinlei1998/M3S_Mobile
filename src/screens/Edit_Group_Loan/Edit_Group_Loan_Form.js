import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ToastAndroid
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DividerLine from '../../components/DividerLine';
import { operations, cus_filter_item } from '../../common';
import { style } from '../../style/Group_Loan_style';
import Edit_Group_Loan_Info from './Edit_Group_Loan_Info';
import { connect, useDispatch } from 'react-redux';
import { filterCustomer } from '../../query/Customer_query';
import { RadioButton, Button, Modal, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import Edit_Group_Borrower_Map from './Edit_Group_Borrower_Map';
import { reduxForm, change } from 'redux-form';
import Edit_Group_Loan_List from './Edit_Group_Loan_List';
import { setGroup_UpdateStatus } from '../../redux/LoanReducer';
import RNFS from 'react-native-fs';
import {
  getLoan_By_GroupID,
  deleteGroup_LoanID,
  updateGroupData,
} from '../../query/GropuLon_query';
import validate from '../Group_Loan/validate';
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
    dispatch(change('Group_Form', 'leader_name', item.customer_nm));
    dispatch(change('Group_Form', 'resident_rgst_id', item.resident_rgst_id));
    dispatch(change('Group_Form', 'customer_no', item.customer_no));
  };

  const item = ({item, index}) => {
    return (
      <View style={style.map_container}>
        <Text style={style.tbl_content_style}>{index + 1}</Text>
        <Text style={style.tbl_content_style}>{item.customer_nm}</Text>
        <Text style={style.tbl_content_style}>{item.resident_rgst_id}</Text>

        <Text style={style.tbl_content_style}>
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
        <View style={style.sub_modal_container}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10 }}>Search Item:</Text>

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

          <View style={{ width: '40%' }}>
            <TextInput
              style={style.input_style}
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
        <View style={style.tbl_header_container}>
          <Text style={style.tbl_title_style}>#</Text>
          <Text style={style.tbl_title_style}>Name</Text>
          <Text style={style.tbl_title_style}>NRC</Text>
          <Text style={style.tbl_title_style}>Phone Number</Text>
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
            style={style.btn_style}>
            OK
          </Button>
        </View>
      </View>
    </Modal>
  );
};

function Edit_Group_Loan_Form(props) {
  const { handleSubmit, navigation, setGroup_UpdateStatus, group_update_status } =
    props;
  const [show_operation, setOperation] = useState('2');
  const [modalVisible, setModalVisible] = useState(false);
  const [all_cus, setAllCus] = useState([]);
  const [selectedItemValue, setSelectedItemValue] = useState('employee_name');
  const [borrower_map, setBorrowerMap] = useState('');
  const [all_loan, setAllLoanData] = useState([]);

  const dispatch = useDispatch();
  const filtered_operations = operations.filter(item => item.value != 1);
  const inquiry_group_data = props.route.params;
  console.log('inquiry_group_data', inquiry_group_data);
  const btnChangeOperation = newValue => {
    setOperation(newValue);
    if (newValue == 2 || newValue == 4) {
      setGroup_UpdateStatus(false);
    } else {
      setGroup_UpdateStatus(true);
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
    props.initialize(inquiry_group_data);
    if (inquiry_group_data.p_type == '40') {
      dispatch(change('Edit_Group_Form', 'product_type', `Cover Loan`));
    } else if (inquiry_group_data.p_type == '30') {
      dispatch(change('Edit_Group_Form', 'product_type', `Group Loan`));
    } else {
      dispatch(change('Edit_Group_Form', 'product_type', `ReLoan`));
    }
    //show old map if exists
    const fileExists = await RNFS.exists(
      `/storage/emulated/0/Pictures/RNSketchCanvas/${inquiry_group_data.group_aplc_no}MP01.jpg`,
    );
    if (fileExists) {
      setBorrowerMap(
        `/storage/emulated/0/Pictures/RNSketchCanvas/${inquiry_group_data.group_aplc_no}MP01.jpg`,
      );
    }
    await getLoan_By_GroupID(inquiry_group_data.group_aplc_no).then(
      loan_data => {
        setAllLoanData(loan_data);
      },
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async values => {
    if (show_operation == '4') {
      await deleteGroup_LoanID(values).then(response => {
        if (response == 'success') {
          ToastAndroid.show(
            `Delete Success`,
            ToastAndroid.SHORT,
          )
          navigation.goBack();
          // setUpdateStatus(false);
          // props.navigation.navigate('Home');
        }
      });
    } else {
      let data = Object.assign(values, {
        product_type: '30',
      });
      await updateGroupData(data).then(response => {
        if (response == 'success') {
          ToastAndroid.show(
            `Update Success!`,
            ToastAndroid.SHORT,
          )
          navigation.goBack();
          // setUpdateStatus(false);
          // props.navigation.navigate('Home');
        }
      });
    }
  };
  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Text style={style.title_style}>Group Loan Application</Text>

            <DividerLine />
            <View style={style.continer}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {filtered_operations.map((option, index) => (
                  <RadioButton.Group
                    key={index}
                    onValueChange={newValue => btnChangeOperation(newValue)}
                    value={show_operation}>
                    <View key={option.value} style={style.operation_style}>
                      <RadioButton.Item
                        // disabled={option.value !== show_operation}
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
                  group_update_status == true && show_operation == '3'
                    ? false
                    : group_update_status == false && show_operation == '4'
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
            <Edit_Group_Loan_Info showCustomerSearch={showCustomerSearch} />
            <Edit_Group_Borrower_Map
              navigation={navigation}
              borrower_map={borrower_map}
              inquiry_group_data={inquiry_group_data}
            />
            <Edit_Group_Loan_List
              navigation={navigation}
              inquiry_group_data={inquiry_group_data}
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
    group_update_status: state.loan.group_update_status,
  };
}
export default reduxForm({
  form: 'Edit_Group_Form',
  validate
})(connect(mapStateToProps, {setGroup_UpdateStatus})(Edit_Group_Loan_Form));
