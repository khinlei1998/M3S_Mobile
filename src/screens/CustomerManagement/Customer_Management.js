import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {
  Field,
  reduxForm,
  setInitialValues,
  initialize,
  reset,
} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import {
  RadioButton,
  Button,
  TextInput,
  Modal,
  Provider,
  Portal,
} from 'react-native-paper';
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
function Customer_Management(props) {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    emp_filter_data,
    setCusFormInitialValues,
    initialValues,
  } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [nrc_visible, setNRC_Visible] = useState(false);
  const [open_empinfo, setEmpInfo] = useState(false);
  const [show_nrc, setNRC] = useState('old');
  const [show_operation, setOperation] = useState('1');
  const [nrc_statecode, setNRCStateCode] = useState([]);
  const [nrc_prefix_code, setNRCPrefixCode] = useState([]);
  const [empname, setEmpName] = useState('');
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
    await storeCustomerData(data).then(result => {
      if (result == 'success') {
        props.navigation.navigate('Home');
      }
      console.log('result', result);
    });

    console.log('all Customer data>>>>>', values);
    dispatch(reset('Customer_ManagementForm'));
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
    // props.initialize(initialValues)
    renderCountRef.current++;
    console.log('Component render count:', renderCountRef.current);
    loadData();
  }, []);

  useEffect(() => {
    props.initialize(emp_filter_data);

    return () => {
      emp_filter_data;
    };
  }, [emp_filter_data]);

  const Show_NRC = newValue => {
    setNRC(newValue);
    if (newValue == 'new') {
      setNRC_Visible(true);
    }
  };

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
              {/* <DividerLine /> */}

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
              </View> */}
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
                style={{borderRadius: 0,
                  width: '90%',
                  marginTop: 10,
                  color: 'black',
                  marginBottom:20,alignSelf:'center'}}>
                Submit
              </Button>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      )}

      <ShowNRC_Modal
        nrc_visible={nrc_visible}
        hideNRCModal={hideNRCModal}
        nrc_statecode={nrc_statecode}
        nrc_prefix_code={nrc_prefix_code}
      />
      {/* <Employee_Search visible={modalVisible} hideModal={hideModal} /> */}
    </>
  );
}

function mapStateToProps(state) {
  return {
    emp_filter_data: state.employees.employee_filter_data,
    initialValues: state.customers.cus_initialValues,
  };
}

export default reduxForm({
  form: 'Customer_ManagementForm',
  // validate,
})(connect(mapStateToProps, {setCusFormInitialValues})(Customer_Management));
