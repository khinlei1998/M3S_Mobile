import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  // Button,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Field, reduxForm, reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import {TestAction} from '../../redux/EmployeeReducer';
import InputTest from '../../components/InputTest';
import ButtonFile from './ButtonFile';
import {style} from '../../style/Customer_Mang_style';
import DividerLine from '../../components/DividerLine';
import {operations, salary_grade} from '../../common';
import {RadioButton, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import Collapsible from 'react-native-collapsible';
import TextInputFile from '../../components/TextInputFile';
import Employee_Search from './Employee_Search';
import DropDownPicker from '../../components/DropDownPicker';
import Customer_Base_Info from './Customer_Base_Info';
import {fetchAllCustomerNum} from '../../query/Customer_query';
import {setCusFormInitialValues} from '../../redux/CustomerReducer';
import {fetchNRCinfo} from '../../query/NRCinfo_query';
import {fetchEmpName} from '../../query/Employee_query';
import moment from 'moment';
const TestScreen = props => {
  const {
    handleSubmit,
    createData,
    TestAction,
    initialValues,
    test,
    setCusFormInitialValues,
  } = props;
  const [show_operation, setOperation] = useState('1');
  const [modalVisible, setModalVisible] = useState(false);
  const [open_empinfo, setEmpInfo] = useState(false);
  const [show_nrc, setNRC] = useState('old');

  const [nrc_statecode, setNRCStateCode] = useState([]);
  const [nrc_prefix_code, setNRCPrefixCode] = useState([]);
  const [empname, setEmpName] = useState('');
  const dispatch = useDispatch();

  const loadData = async () => {
    await fetchAllCustomerNum().then(cust_data => {
      let total_cus = cust_data.length + 1;
      let emp_data = {
        branchCode: '',
        employeeNo: '',
        entryDate: '',
        positionTitleNm: '',
        salaryRatingCode: '',
        nrcNo: '',
        CustomerNo: total_cus.toString(),
        employeeName: '',
        savingAcctNum: '',
        gender: '',
        birthDate: '',
        address_type: '',
        addr: '',
        city_code: '',
        city_name: '',
        villageCode: '',
        VillageName: '',
        village_code: '',
        village_name: '',
        Wardcode: '',
        WardName: '',
        postal_code: '',
        currResidentPerd: '',
        currResidentPerd: '',
        telNo: '',
        mobileTelNo: '',
        familyNum: '',
        hghschlNum: '',
        universityNum: '',
        condition_house: '',
        businessOwnType: '',
        occupation: '',
        maritalStatus: '',
      };
      setCusFormInitialValues(emp_data);
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

  useEffect(() => {
    loadData();
  }, []);

  // useEffect(() => {
  //   props.initialize({
  //     CustomerNo: `TB${moment().format(
  //       'YYYYMMDD',
  //     )}${cus_data_count.toString()}`,
  //   });
  // }, [cus_data_count]);

  useEffect(() => {
    // const update_initialvalue = Object.assign({}, initialValues, {
    //   CustomerNo: `TB${moment().format('YYYYMMDD')}5}`,
    // });
    // // console.log('update_initialvalue', update_initialvalue);
    // props.initialize(update_initialvalue);
    // props.initialize(initialValues);
    props.initialize(test);

    alert('oo');
    // TestAction({branchName: 'ds', branchCode: 'pp'});
  }, []);

  const btntlee = values => {
    alert(JSON.stringify(values));
    TestAction({
      branchName: 'uggg',
      branchCode: 'test',
      entryDate: '2020-09-08',
    });
  };

  const onSubmit = values => {
    alert(JSON.stringify(values));
    // dispatch(reset('yourFormName'));
  };

  const showEmplyeeSearch = () => {
    setModalVisible(true);
  };

  const EmpInfoFun = () => {
    setEmpInfo(!open_empinfo);
  };

  const Show_NRC = newValue => {
    setNRC(newValue);
    if (newValue == 'new') {
      setNRC_Visible(true);
    }
  };

  const hideModal = () => setModalVisible(false);

  return (
    <>
      {modalVisible ? (
        <Employee_Search visible={modalVisible} hideModal={hideModal} />
      ) : (
        <ScrollView>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <View style={{flex: 1, backgroundColor: '#fff'}}>
              <Text style={style.title_style}>
                Customer Information Management
              </Text>

              <DividerLine />

              <View style={style.continer}>
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

              <DividerLine />

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
                          component={TextInputFile}
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
                        component={TextInputFile}
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

              <Field
                name={'CustomerNo'}
                title={'Customer No'}
                component={TextInputFile}
                input_mode
                inputmax={100}
                // editable
              />

              <Field
                name={'employeeName'}
                title={'Customer Name'}
                component={TextInputFile}
                input_mode
                inputmax={100}
              />

              {/* <Field name="branchName" component={InputTest} />

              <Field
                name="branchCode"
                label="Full Name"
                component={InputTest}
              />

              <Field
                name={'lee'}
                title={'lee'}
                component={TextInputFile}
                cus_width
                input_mode
              />

              <Button
                onPress={handleSubmit(onSubmit)}
                mode="submit"
                buttonColor={'#6870C3'}
                style={style.btnStyle}>
                submit
              </Button>



              <View style={{marginTop: 20}}>
                <Button
                  onPress={() => btntlee()}
                  mode="reload"
                  buttonColor={'#6870C3'}
                  style={style.btnStyle}>
                  reload
                </Button>
              </View> */}
              {/* <Customer_Base_Info
                showNrcFun={Show_NRC}
                show_nrc={show_nrc}
                nrc_statecode={nrc_statecode}
              /> */}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      )}
    </>
  );
};

function mapStateToProps(state, ownprops) {
  return {
    test:state.customers.cus_initialValues,
  };
}

export default connect(mapStateToProps, {setCusFormInitialValues, TestAction})(
  reduxForm({form: 'yourFormName', enableReinitialize: true})(TestScreen),
);
