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
import DividerLine from '../../components/DividerLine';
import {business_situation, owner_shipratio} from '../../common';
import {style} from '../../style/Business_Info_style';

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
        style={style.container}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Business Info</Text>
        <TouchableOpacity onPress={MonthlyIncomeFun}>
          <Icon name="arrow-up" size={30} style={{marginTop: 10}} />
        </TouchableOpacity>
      </View>
      <Collapsible collapsed={open_business_info}>
        <View
          style={style.collapsible_container}>
          <View style={style.input_container_style}>
            <Field
              name={'employeeNo'}
              title={'Business Name '}
              component={TextInputFile}
              input_mode
              inputmax={100}
            />
            <Field
              data={business_type}
              name={'businessOwnType'}
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
              style={style.input_container_style}>
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
                <Field name={'employeeNo'} component={DatePicker} title={'Select Date'}/>
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
                name={'workplaceAddr'}
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
                style={style.input_container_style}>
                {show_business_date == 'estimated' ? (
                  <Field
                    num_data={numbers}
                    name={'employeeNo'}
                    title={'Select a Value'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width:300,
                     
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
                style={style.input_container_style}>
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
    </>
  );
}
