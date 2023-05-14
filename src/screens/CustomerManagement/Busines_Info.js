import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Collapsible from 'react-native-collapsible';
import {Field, reduxForm, setInitialValues, initialize} from 'redux-form';
import TextInputFile from '../../components/TextInputFile';
import {business_type} from '../../common';
import DropDownPicker from '../../components/DropDownPicker';
import {RadioButton, Button, TextInput} from 'react-native-paper';
import RadioButtonFile from '../../components/RadioButtonFile';
import DatePicker from '../../components/DatePicker';
export default function Busines_Info() {
  const [open_business_info, setBusinessInfo] = useState(false);
  const [show_businessdate, setBusiness] = useState('estimated');

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
            backgroundColor: '#FAFBFA',
            margin: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <Field
              name={'password'}
              title={'Business Name'}
              component={TextInputFile}
              cus_width
              input_mode
            />

            <Field
              data={business_type}
              name={'password'}
              title={'Salary Grade'}
              component={DropDownPicker}
              pickerStyle={{
                width: 280,
                backgroundColor: 'white',
                marginRight: 10,
              }}
            />
          </View>

          <View
            style={{
              padding: 5,
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
                    width: 280,
                    backgroundColor: 'white',
                    // margin: 10,
                  }}
                />
              ) : (
                <Field name={'ModifiedOn'} component={DatePicker} />
              )}
              <View>
                <Field
                  name={'employeeNo'}
                  title={'Numbers of workers'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                />
              </View>
            </View>
          </View>
        </View>
      </Collapsible>
    </>
  );
}
