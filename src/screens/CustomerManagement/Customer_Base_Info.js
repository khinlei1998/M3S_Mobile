import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Collapsible from 'react-native-collapsible';
import {RadioButton, Button, TextInput} from 'react-native-paper';
import {Field, reduxForm, setInitialValues, initialize} from 'redux-form';
import DropDownPicker from '../../components/DropDownPicker';
import TextInputFile from '../../components/TextInputFile';
import {
  business_situation,
  owner_shipratio,
  gender,
  maritail_status,
  address_type,
  condition_house,
} from '../../common';
import RadioButtonFile from '../../components/RadioButtonFile';
import DividerLine from '../../components/DividerLine';
import DatePicker from '../../components/DatePicker';
import {Picker} from '@react-native-picker/picker';

export default function Customer_Base_Info() {
  const [open_cusinfo, setCusInfo] = useState(false);
  const [show_nrc, setNRC] = useState('new');
  const [show_village, setVillage] = useState('village');
  const [show_businessdate, setBusiness] = useState('estimated');

  const CusInfoFun = () => {
    setCusInfo(!open_cusinfo);
  };
  const test = [
    {
      id: 1,
      label: '12/okt',
      value: '1',
    },
    {
      id: 2,
      label: '5/0988',
      value: '2',
    },
  ];

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
        <Text style={{fontWeight: 'bold', fontSize: 20}}>
          Customer Base Information
        </Text>
        <TouchableOpacity onPress={CusInfoFun}>
          <Icon name="arrow-up" size={30} style={{marginTop: 10}} />
        </TouchableOpacity>
      </View>

      <Collapsible collapsed={open_cusinfo}>
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
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                marginLeft: 15,
                marginTop: 10,
              }}>
              NRC Type
            </Text>
            <RadioButton.Group
              onValueChange={newValue => setNRC(newValue)}
              value={show_nrc}>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 10,
                  marginTop: 10,
                }}>
                <Text style={{marginTop: 5}}>New </Text>
                <RadioButton value="new" />

                <Text style={{marginTop: 5}}>Old</Text>
                <RadioButton value="old" />
              </View>
            </RadioButton.Group>

            {/* {show_nrc == 'new' ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Field
                    data={gender}
                    name={'employeeNo'}
                    title={'Marial Status'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 170,
                      // height: 30,
                    }}
                  />

                  <Field
                    data={gender}
                    name={'employeeNo'}
                    title={'Marial Status'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 170,
                      // height: 30,
                    }}
                  />
                  <Field
                    name={'employeeNo'}
                    title={'Customer Name'}
                    component={TextInputFile}
                    input_mode
                    inputmax={100}
                  />
                </View>
              </View>
            ) : (
              <Field
                name={'employeeNo'}
                title={'NRC'}
                component={TextInputFile}
                cus_width
                input_mode
              />
            )} */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Field
                name={'employeeNo'}
                title={'Customer Name'}
                component={TextInputFile}
                input_mode
                inputmax={100}
              />

              <Field
                name={'employeeNo'}
                title={'Saving Code'}
                component={TextInputFile}
                cus_width
                input_mode
                inputmax={20}
              />
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Field
                data={gender}
                name={'employeeNo'}
                title={'Gender'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 300,
                }}
              />
              <Field
                data={maritail_status}
                name={'employeeNo'}
                title={'Maritial Status'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 300,
                }}
              />
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Field
                data={address_type}
                name={'employeeNo'}
                title={'Address Type'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 300,
                }}
              />
              <Field
                name={'employeeNo'}
                title={'No,Street '}
                component={TextInputFile}
                input_mode
                inputmax={100}
              />
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Field
                name={'employeeNo'}
                title={'City Code '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                icon={'magnify'}
              />
              <Field
                name={'employeeNo'}
                title={'City Name '}
                component={TextInputFile}
                input_mode
                inputmax={100}
              />
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Field
                name={'employeeNo'}
                title={'Village Code '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                icon={'magnify'}
              />
              <Field
                name={'employeeNo'}
                title={'Village Name '}
                component={TextInputFile}
                input_mode
                inputmax={100}
              />
            </View>

            <RadioButton.Group
              onValueChange={newValue => setVillage(newValue)}
              value={show_village}>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 20,
                  marginTop: 20,
                }}>
                <Text style={{marginTop: 5}}>Village </Text>
                <RadioButton value="village" />

                <Text style={{marginTop: 5}}>Ward</Text>
                <RadioButton value="ward" />
              </View>
            </RadioButton.Group>

            {show_village == 'village' ? (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Field
                  name={'employeeNo'}
                  title={'Village Code '}
                  component={TextInputFile}
                  input_mode
                  inputmax={100}
                  icon={'magnify'}
                />
                <Field
                  name={'employeeNo'}
                  title={'Village Name '}
                  component={TextInputFile}
                  input_mode
                  inputmax={100}
                />
              </View>
            ) : (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Field
                  name={'employeeNo'}
                  title={'Ward Code '}
                  component={TextInputFile}
                  input_mode
                  inputmax={100}
                  icon={'magnify'}
                />
                <Field
                  name={'employeeNo'}
                  title={'Ward Name '}
                  component={TextInputFile}
                  input_mode
                  inputmax={100}
                />
              </View>
            )}

            <View style={{marginLeft: 10, marginRight: 10}}>
              <Field
                name={'employeeNo'}
                title={'Postal Code '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                input_cusstyle
              />
            </View>
            <Text
              style={{
                marginTop: 10,
                fontWeight: 'bold',
                marginLeft: 20,
                fontSize: 15,
              }}>
              Start Living Date Current Address
            </Text>
            <RadioButton.Group
              onValueChange={newValue => setBusiness(newValue)}
              value={show_businessdate}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  marginLeft: 20,
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
              {show_businessdate == 'estimated' ? (
                <Field
                  num_data={numbers}
                  name={'employeeNo'}
                  title={'Select a Value'}
                  component={DropDownPicker}
                  pickerStyle={{
                    width: 300,
                  }}
                />
              ) : (
                <Field name={'ModifiedOn'} component={DatePicker} />
              )}
              <Field
                name={'employeeNo'}
                title={'Phone Number'}
                component={TextInputFile}
                input_mode
                inputmax={20}
              />
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Field
                name={'employeeNo'}
                title={'Mobile Phone Number '}
                component={TextInputFile}
                input_mode
                inputmax={100}
              />
              <Field
                name={'employeeNo'}
                title={'Number of family Number '}
                component={TextInputFile}
                input_mode
                inputmax={100}
              />
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Field
                name={'employeeNo'}
                title={'Number of Students '}
                component={TextInputFile}
                input_mode
                inputmax={100}
              />
              <Field
                name={'employeeNo'}
                title={'Number of Students '}
                component={TextInputFile}
                input_mode
                inputmax={100}
              />
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Field
                data={condition_house}
                name={'employeeNo'}
                title={'Condition of House'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 300,
                }}
              />
              <Field
                data={owner_shipratio}
                name={'employeeNo'}
                title={'Ownership of Business'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 300,
                }}
              />
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Field
                name={'employeeNo'}
                title={'Occupation'}
                component={TextInputFile}
                input_mode
                inputmax={100}
              />
              <Field name={'ModifiedOn'} component={DatePicker} />
            </View>
          </View>
        </View>
      </Collapsible>
      <DividerLine />
    </>
  );
}
