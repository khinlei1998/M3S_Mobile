import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Collapsible from 'react-native-collapsible';
import {RadioButton, Button, TextInput} from 'react-native-paper';
import {Field, reduxForm, setInitialValues, initialize} from 'redux-form';
import DropDownPicker from '../../components/DropDownPicker';
import TextInputFile from '../../components/TextInputFile';
import { business_situation ,owner_shipratio} from '../../common';
import RadioButtonFile from '../../components/RadioButtonFile';
export default function Customer_Base_Info() {
  const [open_cusinfo, setCusInfo] = useState(false);
  const [show_nrc, setNRC] = useState('new');
  const [show_businessdate, setBusiness] = useState('estimated');

  const CusInfoFun = () => {
    setCusInfo(!open_empinfo);
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
              //   margin: 10,
            }}>
            <RadioButton.Group
              onValueChange={newValue => setNRC(newValue)}
              value={show_nrc}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={{marginTop: 5}}>New </Text>
                <RadioButton value="new" />

                <Text style={{marginTop: 5}}>Old</Text>
                <RadioButton value="old" />
              </View>
            </RadioButton.Group>

            {show_nrc == 'new' ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Field
                    data={test}
                    name={'employeeNo'}
                    title={'New NRC'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 140,
                      backgroundColor: 'white',
                      marginRight: 8,
                    }}
                  />

                  <Field
                    data={test}
                    name={'employeeNo'}
                    title={'New NRC'}
                    component={DropDownPicker}
                    pickerStyle={{width: 140, backgroundColor: 'white'}}
                  />
                </View>

                <Field
                  name={'employeeNo'}
                  title={'New NRC'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                />
              </View>
            ) : (
              <Field
                name={'employeeNo'}
                title={'NRC'}
                component={TextInputFile}
                cus_width
                input_mode
              />
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Field
              name={'employeeNo'}
              title={'Customer Name'}
              component={TextInputFile}
              cus_width
              input_mode
            />

            <Field
              name={'employeeNo'}
              title={'Saving Code'}
              component={TextInputFile}
              cus_width
              input_mode
            />
          </View>

          <View
            style={{
              padding: 5,
              //   margin: 10,
            }}>
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
                // marginLeft: 15,
                justifyContent: 'space-around',
              }}>
              {show_businessdate == 'estimated' ? (
                <Field
                  num_data={numbers}
                  name={'employeeNo'}
                  title={'New NRC'}
                  component={DropDownPicker}
                  pickerStyle={{
                    width: 300,
                    backgroundColor: 'white',
                    // margin: 10,
                  }}
                />
              ) : (
                <Field
                  name={'employeeNo'}
                  title={'NRC'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                />
              )}
              <View>
                <Text style={{marginLeft: 10}}>Business Situation</Text>
                <Field
                  data={business_situation}
                  name={'employeeNo'}
                  title={'New NRC'}
                  component={RadioButtonFile}
                  //   pickerStyle={{
                  //     width: 300,
                  //     backgroundColor: 'white',
                  //     // margin: 10,
                  //   }}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Field
              name={'employeeNo'}
              title={'Argiture-Lands'}
              component={TextInputFile}
              cus_width
              input_mode
            />

            <Field
              data={owner_shipratio}
              name={'employeeNo'}
              title={'Saving Code'}
              component={DropDownPicker}
              pickerStyle={{
                width: '40%',
                backgroundColor: 'white',
                marginRight: 8,
              }}
            />
          </View>
        </View>
      </Collapsible>
    </>
  );
}
