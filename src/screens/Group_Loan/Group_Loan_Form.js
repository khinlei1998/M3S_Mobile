import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import DividerLine from '../../components/DividerLine';
import { operations, emp_filter_item } from '../../common';
import { style } from '../../style/Group_Loan_style';
import Group_Leader_Info from './Group_Leader_Info';
import { connect, useDispatch } from 'react-redux';
import { filterCustomer } from '../../query/Customer_query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllLoan } from '../../query/AllLoan_query';
import {
  RadioButton,
  Button,
  List,
  Modal,
  Provider,
  Portal,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';
import { cus_filter_item } from '../../common';
import Group_Borrower_Map from './Group_Borrower_Map';
import { reduxForm, Field, change, reset } from 'redux-form';
import moment from 'moment';
import Group_Loan_List from './Group_Loan_List';
import { getAllGroupLoan } from '../../query/GropuLon_query';
import { storeGroupData } from '../../query/GropuLon_query';
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
    dispatch(change('Individual_Loan_Form', 'borrower_name', item.customer_nm));
    dispatch(
      change('Individual_Loan_Form', 'resident_rgst_id', item.resident_rgst_id),
    );
    dispatch(change('Individual_Loan_Form', 'customer_no', item.customer_no));
  };

  const item = ({ item, index }) => {
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

          <View style={{ width: '50%' }}>
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

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
function Group_Loan_Form(props) {
  const { handleSubmit, navigation } = props;
  const [show_operation, setOperation] = useState('1');
  const [modalVisible, setModalVisible] = useState(false);
  const [all_cus, setAllCus] = useState([]);
  const [selectedItemValue, setSelectedItemValue] = useState('employee_name');
  const [all_loandata, setAllGroupLoanData] = useState([]);
  const dispatch = useDispatch();

  const handleItemValueChange = itemValue => {
    setSelectedItemValue(itemValue);
  };
  const hideModal = () => setModalVisible(false);

  const showCustomerSearch = () => {
    setModalVisible(true);
  };
  const loadData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    await getAllGroupLoan().then(loan_data => {
      setAllGroupLoanData(loan_data);
      dispatch(
        change(
          'Group_Form',
          'group_aplc_no',
          `30${user_id}${moment().format('YYYYMMDD')}${loan_data.length + 1}`,
        ),
      );
      dispatch(change('Group_Form', 'product_type', `Group Loan`));
    });
  };
  useEffect(() => {
    loadData();
  }, []);
  const onSubmit = async (values) => {
    await storeGroupData(values).then(result => {
      console.log('result', result);
      if (result == 'success') {

      }
    });
  }
  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                marginTop: 20,
                color: '#273050',
                fontWeight: 'bold',
              }}>
              Group Loan Application
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
                    onValueChange={newValue => setOperation(newValue)}
                    value={show_operation}>
                    <View
                      key={option.value}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <RadioButton.Item
                        disabled={option.value !== show_operation}
                        label={option.label}
                        value={option.value}
                        color="#000"
                        labelStyle={{ marginLeft: 5 }}
                      />
                    </View>
                  </RadioButton.Group>
                ))}
              </View>
              <Button
                onPress={handleSubmit(onSubmit)}
                mode="contained"
                buttonColor={'#6870C3'}
                style={style.btnStyle}>
                OK
              </Button>
            </View>
            <DividerLine />
            <Group_Leader_Info showCustomerSearch={showCustomerSearch} />
            <Group_Borrower_Map
              navigation={navigation}
              all_loandata={all_loandata}
              p_type={'30'}
            />
            <Group_Loan_List />
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
  return {};
}

export default reduxForm({
  form: 'Group_Form',
})(connect(mapStateToProps, {})(Group_Loan_Form));
