import {View, Text, TouchableOpacity, Button} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Collapsible from 'react-native-collapsible';
import {Field, reduxForm, setInitialValues, initialize} from 'redux-form';
import TextInputFile from '../../components/TextInputFile';
import {business_type} from '../../common';
import DropDownPicker from '../../components/DropDownPicker';
import {RadioButton, TextInput} from 'react-native-paper';
import RadioButtonFile from '../../components/RadioButtonFile';
import DatePicker from '../../components/DatePicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DividerLine from '../../components/DividerLine';
import {Picker} from '@react-native-picker/picker';
import {business_situation, owner_shipratio} from '../../common';
export default function Busines_Info() {
  const [open_business_info, setBusinessInfo] = useState(false);
  const [show_businessdate, setBusiness] = useState('estimated');
  const [show_business_date, setBusinessStartDate] = useState('estimated');

  const MonthlyIncomeFun = () => {
    setBusinessInfo(!open_business_info);
  };
  const numbers = Array.from({length: 60}, (_, i) => i + 1);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
          marginLeft: 30,
          marginRight: 20,
          marginTop: 15,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Business Info</Text>
        <TouchableOpacity onPress={MonthlyIncomeFun}>
          <Icon name="arrow-up" size={30} style={{marginTop: 10}} />
        </TouchableOpacity>
      </View>
      <Collapsible collapsed={open_business_info}>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            backgroundColor: '#FAF8F8',
            margin: 10,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Field
              name={'employeeNo'}
              title={'Business Name '}
              component={TextInputFile}
              input_mode
              inputmax={100}
            />
            <Field
              data={business_type}
              name={'employeeNo'}
              title={'Type of business'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
            />
          </View>
          <View
            style={{
              padding: 5,
              marginTop: 10,
            }}>
            <Text style={{marginLeft: 10, fontSize: 15, fontWeight: 'bold'}}>
              Business Period
            </Text>

            <RadioButton.Group
              onValueChange={newValue => setBusiness(newValue)}
              value={show_businessdate}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  marginLeft: 10,
                }}>
                <Text style={{marginTop: 5}}>Estimated </Text>
                <RadioButton value="estimated" />

                <Text style={{marginTop: 5}}>Exact Date</Text>
                <RadioButton value="exact" />
              </View>
            </RadioButton.Group>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                // backgroundColor:'red'
              }}>
              {show_businessdate == 'estimated' ? (
                <Field
                  num_data={numbers}
                  name={'employeeNo'}
                  title={'Select a Value'}
                  component={DropDownPicker}
                  pickerStyle={{
                    width: 280,
                  }}
                />
              ) : (
                <Field name={'employeeNo'} component={DatePicker} />
              )}

              <Field
                name={'employeeNo'}
                title={'Numbers of workers '}
                component={TextInputFile}
                input_mode
                inputmax={100}
              />
            </View>

            <View style={{marginRight: 10, marginLeft: 10}}>
              <Field
                name={'employeeNo'}
                title={'Address'}
                component={TextInputFile}
                input_mode
                input_cusstyle
                inputmax={200}
              />
            </View>

            <View style={{marginTop: 15}}>
              <Text style={{marginLeft: 10, fontSize: 15, fontWeight: 'bold'}}>
                Current Businesss Start Date
              </Text>

              <RadioButton.Group
                onValueChange={newValue => setBusinessStartDate(newValue)}
                value={show_business_date}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginLeft: 10,
                  }}>
                  <Text style={{marginTop: 5}}>Estimated </Text>
                  <RadioButton value="estimated" />

                  <Text style={{marginTop: 5}}>Exact Date</Text>
                  <RadioButton value="exact" />
                </View>
              </RadioButton.Group>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                {show_business_date == 'estimated' ? (
                  <Field
                    num_data={numbers}
                    name={'employeeNo'}
                    title={'Select a Value'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 280,
                     
                    }}
                  />
                ) : (
                  <Field name={'ModifiedOn'} component={DatePicker} />
                )}
                <View>
                  <Text
                    style={{fontSize: 15, fontWeight: 'bold', marginLeft: 10}}>
                    Business Situation
                  </Text>
                  <Field
                    data={business_situation}
                    name={'employeeNo'}
                    title={'New NRC'}
                    component={RadioButtonFile}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  margin: 10,
                }}>
                <Field
                  name={'password'}
                  title={'Agriculture Land'}
                  component={TextInputFile}
                  input_mode
                  words_count
                  inputmax={50}
                />

                <Field
                  data={owner_shipratio}
                  name={'employeeNo'}
                  title={'OwnerShip Ratio'}
                  component={DropDownPicker}
                  pickerStyle={{
                    
                    width: 280,
                   
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Collapsible>
      <DividerLine />
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
          marginLeft: 30,
          marginRight: 20,
          marginTop: 15,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>
          Customer Base Information
        </Text>
        <TouchableOpacity onPress={MonthlyIncomeFun}>
          <Icon name="arrow-up" size={30} style={{marginTop: 10}} />
        </TouchableOpacity>
      </View>

      <Collapsible collapsed={open_business_info}>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            backgroundColor: '#FAFBFA',
          }}>
          <View
            style={{
              padding: 5,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Field
                name={'employeeNo'}
                title={'Business Name '}
                component={TextInputFile}
                input_mode
                inputmax={100}
              />
              <Field
                data={business_type}
                name={'employeeNo'}
                title={'Type of Business'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 300,
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginLeft: 20,
                }}>
                Business Period
              </Text>
              <RadioButton.Group
                onValueChange={newValue => setBusiness(newValue)}
                value={show_businessdate}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginLeft: 10,
                  }}>
                  <Text style={{marginTop: 5}}>Estimated </Text>
                  <RadioButton value="estimated" />

                  <Text style={{marginTop: 5}}>Exact Date</Text>
                  <RadioButton value="exact" />
                </View>
              </RadioButton.Group>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {show_businessdate == 'estimated' ? (
                  <Field
                    num_data={numbers}
                    name={'employeeNo'}
                    title={'Select a Value'}
                    component={DropDownPicker}
                    pickerStyle={{
                      backgroundColor: 'red',
                      width: 280,
                      marginLeft: 10,
                      padding: 0,
                      height: 0,
                    }}
                  />
                ) : (
                  <Field name={'employeeNo'} component={DatePicker} />
                )}

                <Field
                  data={business_type}
                  name={'employeeNo'}
                  title={'Type Of Busines'}
                  component={DropDownPicker}
                  pickerStyle={{
                    backgroundColor: '#FFF',
                    width: 280,
                    marginRight: 10,
                    padding: 0,
                    height: 0,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Collapsible> */}
    </>
  );
}
