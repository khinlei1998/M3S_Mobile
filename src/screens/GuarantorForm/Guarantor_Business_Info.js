import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {List} from 'react-native-paper';
import {reduxForm, Field, change, reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import TextInputFile from '../../components/TextInputFile';
import {style} from '../../style/Guarantor_style';
import DropDownPicker from '../../components/DropDownPicker';
import {business_type, address_type, owner_shipratio} from '../../common';
import DatePicker from '../../components/DatePicker';
export default function Guarantor_Business_Info() {
  const [guarantor_business_expand, setGuarantorBusinessExpand] =
    useState(true);
  const handleGuarantorBusinessToggle = () => {
    setGuarantorBusinessExpand(!guarantor_business_expand);
  };
  return (
    <>
      <List.Accordion
        expanded={guarantor_business_expand}
        onPress={handleGuarantorBusinessToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Business Info">
        <View style={style.sub_container}>
          <View style={style.sub_list_container}>
            <Field
              name={'workplace_name'}
              title={'Business Name '}
              component={TextInputFile}
              input_mode
              inputmax={100}
            />
            <Field
              data={business_type}
              name={'workplace_type'}
              title={'Type of business'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'workplace_date'}
              component={DatePicker}
              label={'Business Peroid'}
              icon={'calendar'}
            />
            <Field
              name={'employee_num'}
              title={'Number of workers'}
              component={TextInputFile}
              input_mode
              keyboardType={'numeric'}
              inputmax={20}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              data={address_type}
              name={'co_borrower_address_type'}
              title={'Address Type'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
            />
            <Field
              name={'workplace_addr'}
              title={'Address'}
              component={TextInputFile}
              input_mode
              inputmax={100}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'curr_workplace_date'}
              component={DatePicker}
              label={'Current Business Start Date'}
              icon={'calendar'}
            />

            <Field
              name={'land_scale'}
              title={'Agriture-Lands'}
              component={TextInputFile}
              input_mode
              inputmax={100}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              data={owner_shipratio}
              name={'land_own_type'}
              title={'Ownership Ratio'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
            />

            <Field
              name={'curr_workplace_perd'}
              component={DatePicker}
              label={'Guarantee Date'}
              icon={'calendar'}
            />
          </View>
        </View>
      </List.Accordion>
    </>
  );
}
