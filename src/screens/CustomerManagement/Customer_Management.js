import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {
  Field,
  reduxForm,
  setInitialValues,
  initialize,
  reset,
  change,
} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import {
  RadioButton,
  Button,
  Modal,
  Provider,
  Portal,
  TextInput,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import ViewEmployee from './ViewEmployee';
import DividerLine from '../../components/DividerLine';
import Icon from 'react-native-vector-icons/Feather';
import TextInputFile from '../../components/TextInputFile';
import Employee_Search from './Employee_Search';
import Collapsible from 'react-native-collapsible';
import DropDownPicker from '../../components/DropDownPicker';
import {fetchNRCinfo} from '../../query/NRCinfo_query';
import Customer_Base_Info from './Customer_Base_Info';
import Property_Info from './Property_Info';
import {salary_grade} from '../../common';
import Monthly_Income from './Monthly_Income';
import {gender} from '../../common';
import {
  address_type,
  business_situation,
  operations,
  owner_shipratio,
} from '../../common';
import RadioButtonFile from '../../components/RadioButtonFile';
import Busines_Info from './Busines_Info';
import {style} from '../../style/Customer_Mang_style';
import ShowNRC_Modal from './ShowNRC_Modal';
import validate from './Validate';
import ButtonFile from './ButtonFile';
import InputFile from '../../components/InputTest';
import {storeCustomerData} from '../../query/Customer_query';
import moment from 'moment';
import {fetchEmpName} from '../../query/Employee_query';
import {setCusFormInitialValues} from '../../redux/CustomerReducer';
import {fetchAllCustomerNum} from '../../query/Customer_query';
import {emp_filter_item} from '../../common';
import {Picker} from '@react-native-picker/picker';
import {filterEmp} from '../../query/Employee_query';
import DefaultTextInput from '../../components/DefaultTextInput';
import {addEmpFilter} from '../../redux/EmployeeReducer';
function Customer_Management(props) {
  const navigation = useNavigation();
  const [all_emp, setAllEmp] = useState([]);

  const dispatch = useDispatch();

  const {
    handleSubmit,
    total,
    emp_filter_data,
    setCusFormInitialValues,
    initialValues,
    addEmpFilter,
  } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemValue, setSelectedItemValue] = useState('employee_name');
  const [selectedValue, setSelectedValue] = useState(null);

  const [nrc_visible, setNRC_Visible] = useState(false);
  const [open_empinfo, setEmpInfo] = useState(false);
  const [show_nrc, setNRC] = useState('old');
  const [show_operation, setOperation] = useState('1');
  const [nrc_statecode, setNRCStateCode] = useState([]);
  const [nrc_prefix_code, setNRCPrefixCode] = useState([]);
  const [empname, setEmpName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleItemValueChange = itemValue => {
    setSelectedItemValue(itemValue);
  };
  var count = 0;
  const onSubmit = async values => {
    let data = Object.assign(values, emp_filter_data, {
      createUserId: empname,
      residentRgstId:
        values.nrc_stateCode && values.nrc_prefix
          ? values.nrc_stateCode + values.nrc_prefix + values.nrcNo
          : '',
    });
    alert(JSON.stringify(data));
    // await storeCustomerData(data).then(result => {
    //   if (result == 'success') {
    //     alert('Create Success');
    //     dispatch(reset('Customer_ManagementForm'));
    //     navigation.navigate('Home');
    //   }
    // });
  };
  const hideModal = () => setModalVisible(false);

  const EmpInfoFun = () => {
    setEmpInfo(!open_empinfo);
  };

  const showEmplyeeSearch = () => {
    setModalVisible(true);
  };

  const hideNRCModal = () => {
    setNRC_Visible(!nrc_visible), setNRC('old');
  };
  const loadData = async () => {
    await fetchAllCustomerNum().then(cust_data => {
      dispatch(
        change(
          'Customer_ManagementForm',
          'CustomerNo',
          `TB${moment().format('YYYYMMDD')}${cust_data.length}`,
        ),
      );
      console.log('cust_data', cust_data.length);
    });
    await fetchNRCinfo()
      .then(result => {
        {
          const [nrc_state_code, nrc_prefixdata] = result;
          setNRCStateCode(nrc_state_code);
          setNRCPrefixCode(nrc_prefixdata);
        }
      })
      .catch(error => console.log(error));
    await fetchEmpName().then(emp_name => {
      setEmpName(emp_name[0].employee_name);
    });
  };

  const renderCountRef = useRef(0);

  useEffect(() => {
    // props.initialize({ CustomerNo: '0999', })
    // props.initialize(initialValues)
    // renderCountRef.current++;
    // console.log('Component render count:', renderCountRef.current);
    loadData();
  }, []);

  const btnSelectEmployee = item => {
    setSelectedValue(item.employee_no);
    dispatch(change('Customer_ManagementForm', 'branchCode', item.branch_code));
    dispatch(change('Customer_ManagementForm', 'employeeNo', item.employee_no));
    dispatch(change('Customer_ManagementForm', 'entryDate', item.entry_date));
    dispatch(
      change(
        'Customer_ManagementForm',
        'positionTitleNm',
        item.position_title_nm,
      ),
    );

    // let emp_data = {
    //   branchCode: item.branch_code,
    //   employeeNo: item.employee_no,
    //   entryDate: item.entry_date,
    //   positionTitleNm: item.position_title_nm,
    // };
    // addEmpFilter(emp_data);
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
          {item.employee_no}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.employee_name}
        </Text>

        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.position_title_nm == null ? 'No Data' : item.position_title_nm}
        </Text>

        <View>
          <RadioButton
            value={item.employee_no}
            status={
              selectedValue === item.employee_no ? 'checked' : 'unchecked'
            }
            onPress={() => btnSelectEmployee(item)}
          />
        </View>

        {/* <Field component={RadioButton}/> */}
      </View>
    );
  };

  const containerStyle = {
    backgroundColor: '#e8e8e8',
    width: '85%',
    alignSelf: 'center',
  };

  // useEffect(() => {
  //   const test = Object.assign({}, emp_filter_data, {
  //     // totSaleIncome: total.toString()
  //   });
  //   props.initialize(test);
  // }, [emp_filter_data]);

  const Show_NRC = newValue => {
    setNRC(newValue);
    if (newValue == 'new') {
      setNRC_Visible(true);
    }
  };

  const handleSearch = async () => {
    await filterEmp(selectedItemValue, searchTerm)
      .then(data => (data.length > 0 ? setAllEmp(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  return (
    <>
      {/* {modalVisible ? (
        <Employee_Search visible={modalVisible} hideModal={hideModal} />
      ) : ( */}
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Text style={style.title_style}>
              Customer Information Management
            </Text>
            <DividerLine />

            {/* <View style={style.continer}>
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
                  buttonColor={'#6870C3'}
                  style={style.btnStyle}>
                  OK
                </Button>
              </View>
              <DividerLine /> */}
            {/* EMployee Information */}
            <View style={style.title_emp_style}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                Employee Information
              </Text>
              <TouchableOpacity onPress={EmpInfoFun}>
                <Icon name="arrow-up" size={30} style={{marginTop: 10}} />
              </TouchableOpacity>
            </View>

            <Collapsible collapsed={open_empinfo}>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  backgroundColor: '#FAFAFA',
                }}>
                <View
                  style={{
                    padding: 5,
                    // margin: 10,
                  }}>
                  <Field
                    name={'employeeNo'}
                    title={'Employee No'}
                    component={TextInputFile}
                    cus_width
                    icon={'magnify'}
                    input_mode
                    handleTextInputFocus={showEmplyeeSearch}
                    focusTextInput
                    editable
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Field
                      name={'entryDate'}
                      title={'Start Working Date at SHM'}
                      component={TextInputFile}
                      editable
                    />
                    <View style={{marginRight: 10}}>
                      <Field
                        name={'positionTitleNm'}
                        title={'Current Position'}
                        component={DefaultTextInput}
                        editable
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Field
                      name={'branchCode'}
                      title={'Branch'}
                      component={DefaultTextInput}
                      cus_width
                      input_mode
                      editable
                    />
                    <View style={{marginRight: 10}}>
                      <Field
                        data={salary_grade}
                        name={'salaryRatingCode'}
                        title={'Salary Grade'}
                        component={DropDownPicker}
                        pickerStyle={{
                          width: 300,
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </Collapsible>
            <DividerLine />
            <Customer_Base_Info
              showNrcFun={Show_NRC}
              show_nrc={show_nrc}
              nrc_statecode={nrc_statecode}
            />
            <Property_Info />
            <Busines_Info />
            <Monthly_Income />

            <Button
              onPress={handleSubmit(onSubmit)}
              mode="contained"
              buttonColor={'#6870C3'}
              style={{
                borderRadius: 0,
                width: '90%',
                marginTop: 10,
                color: 'black',
                marginBottom: 20,
                alignSelf: 'center',
              }}>
              Submit
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      {/* )} */}

      <ShowNRC_Modal
        nrc_visible={nrc_visible}
        hideNRCModal={hideNRCModal}
        nrc_statecode={nrc_statecode}
        nrc_prefix_code={nrc_prefix_code}
      />
      {/* <Employee_Search visible={modalVisible} hideModal={hideModal} /> */}
      <Provider>
        <Portal>
          <Modal
            dismissable={false}
            visible={modalVisible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <View
              style={{backgroundColor: '#232D57', padding: 25}}
              onStartShouldSetResponder={() => hideModal()}>
              <Icon
                name="x-circle"
                size={25}
                color="#fff"
                style={{
                  marginLeft: 20,
                  position: 'absolute',
                  top: 0,
                  right: 10,
                  top: 10,
                }}
              />
            </View>
            <View style={{padding: 10, height: 550}}>
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
                    style={{width: 200, backgroundColor: 'white', marginTop: 7}}
                    mode="dropdown">
                    {emp_filter_item.length > 0 &&
                      emp_filter_item.map(val => (
                        <Picker.Item
                          label={val.label}
                          value={val.value}
                          key={val.id}
                        />
                      ))}
                  </Picker>
                </View>

                <View style={{width: '50%'}}>
                  {/* <Field
                    name={'searchtext'}
                    component={TextInputFile}
                    input_mode
                    inputmax={20}
                    icon={'magnify'}
                    handleTextInputFocus={handleSubmit(onSubmit)}
                  /> */}
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
              {/* <ViewEmployee emp_data={all_emp} hideModal={hideModal} /> */}
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
                  Employee No
                </Text>
                <Text
                  style={{
                    flex: 1,

                    padding: 10,
                    fontWeight: 'bold',
                  }}>
                  Employee Name
                </Text>
                <Text
                  style={{
                    flex: 1,

                    padding: 10,
                    fontWeight: 'bold',
                  }}>
                  Positon Name
                </Text>
              </View>

              <FlatList
                data={all_emp}
                renderItem={item}
                keyExtractor={(item, index) => index.toString()}
              />

              {/* <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
              </View> */}
            </View>
          </Modal>
        </Portal>
      </Provider>
    </>
  );
}

function mapStateToProps(state) {
  return {
    total: state.monthly.totalSum,
  };
}

export default reduxForm({
  form: 'Customer_ManagementForm',
  // validate,
})(
  connect(mapStateToProps, {setCusFormInitialValues, addEmpFilter})(
    Customer_Management,
  ),
);
