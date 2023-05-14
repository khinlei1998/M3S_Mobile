import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Collapsible from 'react-native-collapsible';
import {Field, reduxForm, setInitialValues, initialize} from 'redux-form';
import TextInputFile from '../../components/TextInputFile';
export default function Busines_Info() {
  const [open_business_info, setBusinessInfo] = useState(false);

  const MonthlyIncomeFun = () => {
    setBusinessInfo(!open_business_info);
  };
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
              margin:10
            }}>
            <Field
              name={'password'}
              title={'Business Name'}
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
      </Collapsible>
    </>
  );
}
