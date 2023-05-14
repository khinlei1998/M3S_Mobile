import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Field, reduxForm, setInitialValues, initialize} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import {RadioButton, Button, TextInput} from 'react-native-paper';
import {operations} from '../../common';
import DividerLine from '../../components/DividerLine';
import Icon from 'react-native-vector-icons/Feather';
import TextInputFile from '../../components/TextInputFile';
import Employee_Search from './Employee_Search';
import Collapsible from 'react-native-collapsible';

function Customer_Management(props) {
  const {handleSubmit} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [opencollapse, setOpen] = useState(false);
  const [open_empinfo, setEmpInfo] = useState(false);
  const [activeSections, setactiveSections] = useState([]);

  const [listdata, setlist_data] = useState([
    {
      isExpanded: true,
      category_name: 'Employee Information',
      subcategory: [{}],
    },
    {
      isExpanded: true,
      category_name: 'Customer Base Information',
      subcategory: [
        {
          id: 2,
          val: 'sub 2',
        },
      ],
    },
    {
      isExpanded: true,
      category_name: 'Property Information',
      subcategory: [
        {
          id: 2,
          val: 'sub 2',
        },
      ],
    },
    {
      isExpanded: true,
      category_name: 'Business Info',
      subcategory: [
        {
          id: 2,
          val: 'sub 2',
        },
      ],
    },
    {
      isExpanded: true,
      category_name: 'Monthly Income/ Expense Statement',
      subcategory: [
        {
          id: 2,
          val: 'sub 2',
        },
      ],
    },
  ]);

  const ExpandableComponent = ({item, onCLicfun}) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 20,
            marginRight: 40,
          }}>
          <TouchableOpacity style={{padding: 20}}>
            <Text style={{fontSize: 16, fontWeight: '100', color: '#000'}}>
              {item.category_name}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onCLicfun()}>
            <Icon name="arrow-up" size={30} style={{marginTop: 10}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const updatelayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listdata];

    array[index]['isExpanded'] = !array[index]['isExpanded'];

    setlist_data(array);
  };

  const onSubmit = values => {
    alert(JSON.stringify(values));
  };
  const hideModal = () => setModalVisible(false);

  const EmpInfoFun = () => {
    setEmpInfo(!open_empinfo);
  };

  const showEmplyeeSearch = () => {
    setModalVisible(true);
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
            <View style={{flex: 1}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  marginTop: 20,
                  color: '#273050',
                }}>
                Customer Information Management
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
                    <RadioButton.Group key={index}>
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
                  style={{
                    borderRadius: 0,
                    width: 100,
                    marginTop: 10,
                    color: 'black',
                  }}>
                  OK
                </Button>
              </View>
              <DividerLine />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 5,
                  marginLeft: 30,
                  marginRight: 20,
                  marginTop: 15,
                }}>
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
                      margin: 10,
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
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Field
                        name={'password'}
                        title={'Start Working Date at SHM'}
                        component={TextInputFile}
                        cus_width
                        input_mode
                      />

                      <Field
                        name={'password'}
                        title={'Current Position'}
                        component={TextInputFile}
                        cus_width
                        input_mode
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Field
                        name={'password'}
                        title={'Branch'}
                        component={TextInputFile}
                        cus_width
                        input_mode
                      />

                      <Field
                        name={'password'}
                        title={'Salary Grade'}
                        component={TextInputFile}
                        cus_width
                        input_mode
                      />
                    </View>
                  </View>

                  {/* {item.subcategory.map(item => {
            return (
              <TouchableOpacity
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                }}>
                <Text style={{fontSize: 16, padding: 10, color: 'red'}}>
                  {item.val}
                </Text>

                <View
                  style={{
                    height: 0.5,
                    backgroundColor: 'pink',
                    width: '100%',
                  }}></View>
              </TouchableOpacity>
            );
          })} */}
                </View>
              </Collapsible>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      )}
    </>
  );
}

export default reduxForm({
  form: 'Customer_ManagementForm',
})(connect(null)(Customer_Management));
