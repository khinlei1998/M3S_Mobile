import { View } from 'react-native';
import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { reduxForm, Field, change } from 'redux-form';
import { connect } from 'react-redux';
import { style } from '../../style/Individual_Loan_style';
import {
  borrower_type,
  condition_house,
  maritail_status,
  gender,
  address_type,
  village_status,
  owner_ship_business,
} from '../../common';
import TextInputFile from '../../components/TextInputFile';
import DropDownPicker from '../../components/DropDownPicker';
import DatePicker from '../../components/DatePicker';
import RadioButtonFile from '../../components/RadioButtonFile';
import { useDispatch } from 'react-redux';
function Borrower_Info(props) {
  const {
    showLocationSearch,
    showCustomerSearch,
    showTownshipSearch,
    showCitySearch,
    showVillageSearch,
    showWardSearch,
    p_type,
  } = props;
  const [borrower_expanded, setBorrowerExpanded] = React.useState(true);
  const [show_village, setVillage] = useState('1');
  const dispatch = useDispatch();

  const handleBorrowerToggle = () => {
    setBorrowerExpanded(!borrower_expanded);
  };
  const handleRadioButtonChange = (value, input) => {
    setVillage(value.id);
    input.onChange(value.id);
    if (value.id == '2') {
      dispatch(change('Individual_Loan_Form', 'village_name', ''));
      dispatch(change('Individual_Loan_Form', 'village_code', ''));
    } else {
      dispatch(change('Individual_Loan_Form', 'ward_code', ''));
      dispatch(change('Individual_Loan_Form', 'ward_name', ''));
    }
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
            get_value={'N'}
          />
          <View style={style.sub_list_container}>
            <Field
              name={'customer_no'}
              title={'Customer No'}
              component={TextInputFile}
              cus_width
              input_mode
            />
            {p_type == 30 || p_type == 40 || p_type == 50 ? (
              <Field
                name={'group_aplc_no'}
                title={'Groupaplic No'}
                component={TextInputFile}
                cus_width
                input_mode
                editable
              />
            ) : (
              <></>
            )}
          </View>

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
              require
            />

            <Field
              name={'borrower_name'}
              title={'Borrower Name'}
              component={TextInputFile}
              cus_width
              input_mode
              require
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
              require
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

          <View style={style.sub_list_container}>
            <Field
              name={'city_code'}
              title={'City Code '}
              component={TextInputFile}
              input_mode
              inputmax={100}
              icon={'magnify'}
              editable
              handleTextInputFocus={showCitySearch}
            />
            <Field
              name={'city_name'}
              title={'City Name '}
              component={TextInputFile}
              input_mode
              inputmax={100}
              editable
            />
          </View>
          <View style={style.sub_list_container}>
            <Field
              name={'ts_code'}
              title={'Township Code '}
              component={TextInputFile}
              input_mode
              inputmax={100}
              icon={'magnify'}
              editable
              handleTextInputFocus={showTownshipSearch}
            />
            <Field
              name={'ts_name'}
              title={'Township Name '}
              component={TextInputFile}
              input_mode
              inputmax={100}
              editable
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              data={village_status}
              name={'village_status'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleRadioButtonChange(value, input)
              }
              get_value={'1'}
            />
          </View>

          {show_village == '1' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Field
                name={'village_code'}
                title={'Village Code '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                icon={'magnify'}
                editable
                handleTextInputFocus={showVillageSearch}
              />
              <Field
                name={'village_name'}
                title={'Village Name '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                editable
              />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Field
                name={'ward_code'}
                title={'Ward Code '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                icon={'magnify'}
                editable
                handleTextInputFocus={showWardSearch}
              />
              <Field
                name={'ward_name'}
                title={'Ward Name '}
                component={TextInputFile}
                input_mode
                inputmax={100}
              />
            </View>
          )}
          <View style={style.sub_list_container}>
            <Field
              name={'location_code'}
              title={'Location Code '}
              component={TextInputFile}
              input_mode
              inputmax={100}
              icon={'magnify'}
              handleTextInputFocus={showLocationSearch}
              editable
            />
            <Field
              name={'location_name'}
              title={'Location Name '}
              component={TextInputFile}
              input_mode
              inputmax={100}
              editable
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
              name={'hghschl_num'}
              title={'Number of High school Students'}
              component={TextInputFile}
              cus_width
              input_mode
              keyboardType={'numeric'}
            />

            <Field
              name={'university_num'}
              title={'Number of University Student'}
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
              data={owner_ship_business}
              name={'business_own_type'}
              title={'Ownership of Business'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
            />
          </View>
        </View>
      </List.Accordion>
    </>
  );
}

export default reduxForm({
  form: 'Individual_Loan_Form',
  // validate,
})(connect(null, {})(Borrower_Info));
