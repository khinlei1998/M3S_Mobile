import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { List } from 'react-native-paper';
import {  Field, change } from 'redux-form';
import { style } from '../../style/Individula_staff_Loan_Style';
import {
  borrower_type,
  salary_grade,
  gender,
  maritail_status,
  address_type,
  village_status,
} from '../../common';
import RadioButtonFile from '../../components/RadioButtonFile';
import TextInputFile from '../../components/TextInputFile';
import DatePicker from '../../components/DatePicker';
import DropDownPicker from '../../components/DropDownPicker';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function Individual_staff_Emp_loan(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    showCustomerSearch,
    showLocationSearch,
    showVillageSearch,
    showWardSearch,
    showCitySearch,
    showTownshipSearch,
    handleCalculate,
    loan_limit_amount,
    setLoanLimitAmount,
    working_month,
  } = props;
  const [borrower_expanded, setBorrowerExpanded] = React.useState(true);
  const [show_village, setVillage] = useState('1');

  const handleBorrowerToggle = () => {
    setBorrowerExpanded(!borrower_expanded);
  };
  const handleRadioButtonChange = (value, input) => {
    setVillage(value.id);
    input.onChange(value.id);
    if (value.id == '2') {
      dispatch(change('Individual_Staff_Loan_Form', 'village_code', ''));
    }
  };
  const handleBrChange = (value) => {
    input.onChange(value.id);
  }
  return (
    <>
      <List.Accordion
        expanded={borrower_expanded}
        onPress={handleBorrowerToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Employee Information">

        <View style={style.sub_container}>
          <Field
            data={borrower_type}
            name={'cst_new_exist_flg'}
            component={RadioButtonFile}
            get_value={'N'}
          />
          <View style={style.sub_list_container}>
            <Field
              name={'employee_no'}
              title={'Employee No'}
              icon={'magnify'}
              handleTextInputFocus={showCustomerSearch}
              component={TextInputFile}
              cus_width
              input_mode
              editable
              focusTextInput
              require
            />

            <Field
              name={'borrower_name'}
              title={t('Borrower Name')}
              component={TextInputFile}
              cus_width
              input_mode
              editable
              require
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'entry_date'}
              component={DatePicker}
              label={'Start Working Date at SHM'}
              icon={'calendar'}
              onWorkingDateChange={(month) => {
                setLoanLimitAmount(0)

              }}
            />

            <Field
              name={'position_title_nm'}
              title={'Current Position'}
              component={TextInputFile}

            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'branch_code'}
              title={'Branch'}
              component={TextInputFile}
              cus_width
              input_mode

            />
            <Field
              data={salary_grade}
              name={'salary_rating_code'}
              title={'Salary Grade'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'resident_rgst_id'}
              title={t('NRC')}
              component={TextInputFile}
              cus_width
              input_mode
              require

            />

            <Field
              name={'customer_no'}
              title={'Customer No'}
              component={TextInputFile}
              cus_width
              input_mode

            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'saving_acct_num'}
              title={t('Saving Code')}
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
              label={t('Date of birth')}
              icon={'calendar'}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              data={maritail_status}
              name={'marital_status'}
              title={t('Marital Status')}
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
              // editable
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
              title={t('Location Code ')}
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

          <View style={style.sub_list_container}>
            <Field
              name={'addr'}
              title={'No,Street '}
              component={TextInputFile}
              input_mode
              inputmax={100}
            />
            <Field
              name={'salary_amount'}
              title={'Salary Amount'}
              component={TextInputFile}
              input_mode
              inputmax={100}
              keyboardType={'numeric'}
            />
          </View>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#20316C',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginRight: 10,
                padding: 10,
                alignItems: 'center',
              }}>
              <Button
                onPress={() => handleCalculate()}
                mode="contained"
                buttonColor={'#6870C3'}
                style={{
                  borderRadius: 0,
                  width: 150,
                  color: 'black',
                  marginLeft: 5,
                  padding: 5,
                }}>
                Calculation
              </Button>
              <Text style={{ color: '#fff', marginLeft: 15 }}>
                Loan Limit Amount
              </Text>
            </View>
            <Text style={{ color: '#F9A970', fontSize: 15, marginRight: 5 }}>
              {loan_limit_amount}
            </Text>
          </View>


        </View>
      </List.Accordion>
    </>
  );
}
