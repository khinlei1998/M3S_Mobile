import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Field, reduxForm, setInitialValues, initialize } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import { RadioButton, Button, TextInput, Modal, Provider, Portal } from 'react-native-paper';
import DividerLine from '../../components/DividerLine';
import Icon from 'react-native-vector-icons/Feather';
import TextInputFile from '../../components/TextInputFile';
import Employee_Search from './Employee_Search';
import Collapsible from 'react-native-collapsible';
import DropDownPicker from '../../components/DropDownPicker';
import { fetchNRCinfo } from '../../query/NRCinfo_query';
import Customer_Base_Info from './Customer_Base_Info';
import Property_Info from './Property_Info';
import { salary_grade } from '../../common';
import Monthly_Income from './Monthly_Income'
import { gender } from '../../common';
import {
  address_type,
  business_situation,
  operations,
  owner_shipratio,
} from '../../common';
import RadioButtonFile from '../../components/RadioButtonFile';
import Busines_Info from './Busines_Info';
import { style } from '../../style/Customer_Mang_style';
import ShowNRC_Modal from './ShowNRC_Modal';
import validate from './Validate';
function Customer_Management(props) {
  const { handleSubmit, emp_filter_data } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [nrc_visible, setNRC_Visible] = useState(false);
  const [open_empinfo, setEmpInfo] = useState(false);
  const [show_nrc, setNRC] = useState('old');
  const [show_operation, setOperation] = useState('1');

  const onSubmit = values => {
    alert('ll',JSON.stringify(values));
    console.log(JSON.stringify(values));
  };
  const hideModal = () => setModalVisible(false);

  const EmpInfoFun = () => {
    setEmpInfo(!open_empinfo);
  };

  const showEmplyeeSearch = () => {
    setModalVisible(true);
  };

  const hideNRCModal = () => {
    setNRC_Visible(!nrc_visible),
      setNRC('old');
  };
  const loadData = async () => {
    // await fetchNRCinfo()
    //   .then(data => console.log('data', data))
    //   .catch(error => console.log(error));
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    console.log('emp_filter_data',emp_filter_data);
    props.initialize(emp_filter_data);
  }, [emp_filter_data]);

  // useLayoutEffect(() => {
  //   alert('Touch')
  //   props.initialize(emp_filter_data);
  // }, [emp_filter_data]);


  const Show_NRC = newValue => {
    setNRC(newValue);
    if (newValue == 'new') {
      setNRC_Visible(true);
    }
  };

  return (
    <>
     
        <ScrollView>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
              <Text
                style={style.title_style}>
                Customer Information Management
              </Text>
              <DividerLine />

              <View
                style={style.continer}>
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
              {/* EMployee Information */}
              <View
                style={style.title_emp_style}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  Employee Information
                </Text>
                <TouchableOpacity onPress={EmpInfoFun}>
                  <Icon name="arrow-up" size={30} style={{ marginTop: 10 }} />
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
                      <View style={{ marginRight: 10 }}>
                     
                        <Field
                          data={salary_grade}
                          name={'positionTitleNm'}
                          title={'Current Position'}
                          component={DropDownPicker}
                          pickerStyle={{
                            width: 300,
                          }}
                          enabled
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
                      <View style={{ marginRight: 10 }}>
                        <Field
                          data={salary_grade}
                          name={'employeeNo'}
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
              <Customer_Base_Info showNrcFun={Show_NRC} show_nrc={show_nrc} />
              <Property_Info />
              <Busines_Info />
              <Monthly_Income />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      {/* )} */}

      <ShowNRC_Modal nrc_visible={nrc_visible} hideNRCModal={hideNRCModal} />
      <Employee_Search visible={modalVisible} hideModal={hideModal} />

    </>
  );
}

function mapStateToProps(state) {
  return {
    emp_filter_data: state.employees.employee_filter_data,
  };
}

export default reduxForm({
  form: 'Customer_ManagementForm',
  validate
})(connect(mapStateToProps, {})(Customer_Management));
