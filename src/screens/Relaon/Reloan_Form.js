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
import moment from 'moment';
import {style} from '../../style/Cover_Loan_style';
import {RadioButton, Button, Modal} from 'react-native-paper';
import {connect, useDispatch} from 'react-redux';
import {cus_filter_item} from '../../common';
import {getAllGroupLoan} from '../../query/GropuLon_query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {filterCustomer} from '../../query/Customer_query';
import {storeGroupData} from '../../query/GropuLon_query';
import Reloan_Info from './Reloan_Info';
import Reloan_list from './Reloan_list';
import validate from '../Group_Loan/Validate';
import {useTranslation} from 'react-i18next';
import {get_loged_branch_code} from '../../query/Employee_query';
const Borrower_modal = props => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(null);
  const [emp_data, setEmpData] = React.useState('');
  const {t} = useTranslation();
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
    dispatch(change('Reloan_Form', 'leader_name', item.customer_nm));
    dispatch(change('Reloan_Form', 'resident_rgst_id', item.resident_rgst_id));
    dispatch(change('Reloan_Form', 'customer_no', item.customer_no));
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

          <View style={{width: '40%'}}>
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
            {t('Name')}
          </Text>
          <Text
            style={{
              flex: 1,

              padding: 10,
              fontWeight: 'bold',
            }}>
            {t('NRC')}
          </Text>
          <Text
            style={{
              flex: 1,

              padding: 10,
              fontWeight: 'bold',
            }}>
            {t('Phone Number')}
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
            buttonColor={'#21316C'}
            style={{
              borderRadius: 0,
              width: 117,
              marginTop: 10,
              color: 'black',
              marginLeft: 5,
              height: 44,
            }}>
            {t('OK')}
          </Button>
        </View>
      </View>
    </Modal>
  );
};
function Reloan_Form(props) {
  const {handleSubmit, navigation} = props;
  const [branch_code, setBranchCode] = useState('');
  const [show_operation, setOperation] = useState('1');
  const [modalVisible, setModalVisible] = useState(false);
  const [all_cus, setAllCus] = useState([]);
  const [selectedItemValue, setSelectedItemValue] = useState('employee_name');
  const [all_loandata, setAllGroupLoanData] = useState([]);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const onSubmit = async values => {
    let data = Object.assign(values, {
      product_type: '50',
      branch_code,
    });
    await storeGroupData(data).then(result => {
      if (result == 'success') {
        ToastAndroid.show(
          `Reloan Application added successfully.`,
          ToastAndroid.SHORT,
        );
        props.navigation.navigate('Home');
      }
    });
  };

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
          'Reloan_Form',
          'group_aplc_no',
          `50${user_id}${moment().format('YYYYMMDD')}${loan_data.length + 1}`,
        ),
      );
      dispatch(change('Reloan_Form', 'product_type', `Reloan`));
    });
    await get_loged_branch_code()
      .then(data => setBranchCode(data[0].branch_code))
      .catch(error => console.log(error));
  };
  useEffect(() => {
    loadData();
  }, []);
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
              ReLoan Application
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
                        labelStyle={{marginLeft: 5}}
                      />
                    </View>
                  </RadioButton.Group>
                ))}
              </View>
              <Button
                onPress={handleSubmit(onSubmit)}
                mode="contained"
                buttonColor={'#21316C'}
                style={style.btnStyle}>
                {t('OK')}
              </Button>
            </View>
            <DividerLine />
            <Reloan_Info showCustomerSearch={showCustomerSearch} />
            <Reloan_list />
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
  form: 'Reloan_Form',
  validate,
})(connect(mapStateToProps, {})(Reloan_Form));
