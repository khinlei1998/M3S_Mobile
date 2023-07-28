import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { List } from 'react-native-paper';
import TextInputFile from '../../components/TextInputFile';
import RadioButtonFile from '../../components/RadioButtonFile';
import {
  business_type,
  address_type,
  owner_shipratio,
  business_situation,
} from '../../common';
import DatePicker from '../../components/DatePicker';
import DropDownPicker from '../../components/DropDownPicker';
import { style } from '../../style/Individual_Loan_style';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
function Loan_Business_Info(props) {
  const { update_status } = props
  const [loan_business_expanded, setLoan_BusinessInfo_expanded] =
    useState(true);

  const handleLoanBusinessToggle = () => {
    setLoan_BusinessInfo_expanded(!loan_business_expanded);
  };

  return (
    <>
      <List.Accordion
        expanded={loan_business_expanded}
        onPress={handleLoanBusinessToggle}
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
              editable={update_status == true ? false : true}
            />
            <Field
              data={business_type}
              name={'workplace_type'}
              title={'Type of business'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
              enabled={update_status == true ? false : true}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'workplace_date'}
              component={DatePicker}
              label={'Business Peroid'}
              icon={update_status == true && 'calendar'}
              editable={update_status == true ? false : true}
            />
            <Field
              name={'employee_num'}
              title={'Number of workers'}
              component={TextInputFile}
              input_mode
              keyboardType={'numeric'}
              inputmax={20}
              editable={update_status == true ? false : true}
            />
          </View>


          <Field
            name={'workplace_addr'}
            title={'Address'}
            component={TextInputFile}
            input_mode
            inputmax={100}
            editable={update_status == true ? false : true}
          />

          <View style={style.sub_list_container}>
            <Field
              name={'curr_workplace_date'}
              component={DatePicker}
              label={'Working Time in current business'}
              icon={update_status == true && 'calendar'}
              editable={update_status == true ? false : true}
            />
            <View
              style={{
                flexDirection: 'column',
                marginTop: 10,
                display: 'flex',
                justifyContent: 'flex-start',
              }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 20 }}>
                Business Situation
              </Text>
              <View >
                <Field
                  data={business_situation}
                  name={'business_sttn_flg'}
                  component={RadioButtonFile}
                  disabled={update_status == true ? false : true}
                />
              </View>
            </View>
          </View>

          <View style={style.sub_list_container}>
            <Field
              data={owner_shipratio}
              name={'land_own_type'}
              title={'OwnerShip ratio'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
              enabled={update_status == true ? false : true}
            />
            <Field
              name={'land_scale'}
              title={'Agriture-Lands'}
              component={TextInputFile}
              input_mode
              inputmax={100}
              editable={update_status == true ? false : true}
            />
          </View>
        </View>
      </List.Accordion>
    </>
  );
}
function mapStateToProps(state) {
  return {
    update_status: state.loan.update_status,
  };
}

export default reduxForm({
  form: 'Edit_Individual_Loan_Form',
  // validate,
})(connect(mapStateToProps, {})(Loan_Business_Info));
