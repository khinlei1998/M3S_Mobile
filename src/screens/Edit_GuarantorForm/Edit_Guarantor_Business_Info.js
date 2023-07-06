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
function Edit_Guarantor_Business_Info(props) {
  const {guarantor_update_status} = props;
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
              editable={guarantor_update_status == true ? false : true}
            />
            <Field
              data={business_type}
              name={'workplace_type'}
              title={'Type of business'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
              enabled={guarantor_update_status == true ? false : true}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'workplace_date'}
              component={DatePicker}
              label={'Business Peroid'}
              icon={guarantor_update_status == true && 'calendar'}
            />
            <Field
              name={'employee_num'}
              title={'Number of workers'}
              component={TextInputFile}
              input_mode
              keyboardType={'numeric'}
              inputmax={20}
              editable={guarantor_update_status == true ? false : true}


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
              enabled={guarantor_update_status == true ? false : true}

            />
            <Field
              name={'workplace_addr'}
              title={'Address'}
              component={TextInputFile}
              input_mode
              inputmax={100}
              editable={guarantor_update_status == true ? false : true}

            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'curr_workplace_date'}
              component={DatePicker}
              label={'Current Business Start Date'}
              icon={ guarantor_update_status == true && 'calendar'}
            />

            <Field
              name={'land_scale'}
              title={'Agriture-Lands'}
              component={TextInputFile}
              input_mode
              inputmax={100}
              editable={guarantor_update_status == true ? false : true}

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
              enabled={guarantor_update_status == true ? false : true}

            />

            <Field
              name={'curr_workplace_perd'}
              component={DatePicker}
              label={'Guarantee Date'}
              icon={guarantor_update_status == true &&'calendar'}
            />
          </View>
        </View>
      </List.Accordion>
    </>
  );
}
function mapStateToProps(state) {
  return {
    guarantor_update_status: state.loan.gurantor_update_status,
  };
}

export default reduxForm({
  form: 'Edit_Guarantor_Form',
  // validate,
})(connect(mapStateToProps, {})(Edit_Guarantor_Business_Info));