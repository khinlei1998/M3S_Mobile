import {View} from 'react-native';
import React from 'react';
import {List} from 'react-native-paper';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {style} from '../../style/Individual_Loan_style';
import {
  borrower_type,
  condition_house,
  maritail_status,
  gender,
  address_type,
} from '../../common';
import TextInputFile from '../../components/TextInputFile';
import DropDownPicker from '../../components/DropDownPicker';
import DatePicker from '../../components/DatePicker';
import RadioButtonFile from '../../components/RadioButtonFile';
function Borrower_Info(props) {
  const {showCustomerSearch} = props;
  const [borrower_expanded, setBorrowerExpanded] = React.useState(true);

  const handleBorrowerToggle = () => {
    setBorrowerExpanded(!borrower_expanded);
  };

  return (
    <>
      <List.Accordion
        expanded={borrower_expanded}
        onPress={handleBorrowerToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Borrower Info">
        <View style={style.sub_container}>
          <Field
            data={borrower_type}
            name={'cst_new_exist_flg'}
            component={RadioButtonFile}
          />

          <Field
            name={'customer_no'}
            title={'Customer No'}
            component={TextInputFile}
            cus_width
            input_mode
            editable
          />
          <View style={style.sub_list_container}>
            <Field
              name={'resident_rgst_id'}
              title={'NRC'}
              icon={'magnify'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
              handleTextInputFocus={showCustomerSearch}
              focusTextInput
            />

            <Field
              name={'borrower_name'}
              title={'Borrower Name'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'saving_acct_num'}
              title={'Saving Code'}
              component={TextInputFile}
              cus_width
              input_mode
            />

            <Field
              name={'tel_no'}
              title={'Tel No'}
              component={TextInputFile}
              cus_width
              input_mode
              keyboardType={'numeric'}

            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              data={gender}
              name={'gender'}
              title={'Gender'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
            />

            <Field
              name={'birth_date'}
              component={DatePicker}
              label={'date of birth'}
              icon={'calendar'}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              data={maritail_status}
              name={'marital_status'}
              title={'Maritial Status'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
            />

            <Field
              data={address_type}
              name={'address_type'}
              title={'Address Type'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
            />
          </View>

          <Field
            name={'addr'}
            title={'No,Street '}
            component={TextInputFile}
            input_mode
            inputmax={100}
            input_cusstyle
          />

          <View style={style.sub_list_container}>
            <Field
              name={'curr_resident_date'}
              component={DatePicker}
              label={'Living Time in current address'}
              icon={'calendar'}
            />

            <Field
              name={'family_num'}
              title={'Number of family'}
              component={TextInputFile}
              cus_width
              input_mode
              keyboardType={'numeric'}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'students_cnt'}
              title={'Number of Students'}
              component={TextInputFile}
              cus_width
              input_mode
              keyboardType={'numeric'}
            />

            <Field
              name={'students_cnt'}
              title={'Number of Students'}
              component={TextInputFile}
              cus_width
              input_mode
              keyboardType={'numeric'}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              data={condition_house}
              name={'house_ocpn_type'}
              title={'Condition of house'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
            />

            <Field
              name={'business_own_type'}
              title={'OwnerShip of business'}
              component={TextInputFile}
              cus_width
              input_mode
            />
          </View>
        </View>
      </List.Accordion>
    </>
  );
}
function mapStateToProps(state) {
  return {};
}

export default reduxForm({
  form: 'Individual_Loan_Form',
  // validate,
})(connect(mapStateToProps, {})(Borrower_Info));
