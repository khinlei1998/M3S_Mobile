import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {List} from 'react-native-paper';
import {reduxForm, Field, change} from 'redux-form';
import {style} from '../../style/Individula_staff_Loan_Style';
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
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
 function Edit_Individual_staff_Emp_loan(props) {
  const {
    showCustomerSearch,
    showLocationSearch,
    showVillageSearch,
    showWardSearch,
    showCitySearch,
    showTownshipSearch,
    handleCalculate,
    app_amount,
    setWorkingMonth,
    setSalaryAmountValue,
    loan_limit_amount,
    setLoanLimitAmount,
    working_month,
    workingDateRef,
    update_status
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
    // Dispatch action to clear the field value
    // dispatch(
    //   change('myForm', 'fieldName', radioValue === 'clear' ? '' : radioValue),
    // );
  };
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
            disabled={update_status == true ? false : true}
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
              title={'Borrower Name'}
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
              editable={update_status == true ? false : true}
              // ref={workingDateRef}
              onWorkingDateChange={(month)=>{
                setWorkingMonth(month)
                setLoanLimitAmount(0)

                console.log('finale moth',month);

              }}
            />

            <Field
              name={'position_title_nm'}
              title={'Current Position'}
              component={TextInputFile}
              editable={update_status == true ? false : true}

            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'branch_code'}
              title={'Branch'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={update_status == true ? false : true}

            />
            <Field
              data={salary_grade}
              name={'salary_rating_code'}
              title={'Salary Grade'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
              enabled={update_status == true ? false : true}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'resident_rgst_id'}
              title={'NRC'}
              component={TextInputFile}
              cus_width
              input_mode
              require
              editable={update_status == true ? false : true}


            />

            <Field
              name={'customer_no'}
              title={'Customer No'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={update_status == true ? false : true}


            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'saving_acct_num'}
              title={'Saving Code'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={update_status == true ? false : true}

            />

            <Field
              name={'tel_no'}
              title={'Tel No'}
              component={TextInputFile}
              cus_width
              input_mode
              keyboardType={'numeric'}
              editable={update_status == true ? false : true}

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
              enabled={update_status == true ? false : true}
            />

            <Field
              name={'birth_date'}
              component={DatePicker}
              label={'date of birth'}
              icon={'calendar'}
              editable={update_status == true ? false : true}
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
              enabled={update_status == true ? false : true}
            />

            <Field
              data={address_type}
              name={'address_type'}
              title={'Address Type'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
              enabled={update_status == true ? false : true}
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
              name={'TownshipCode'}
              title={'Township Code '}
              component={TextInputFile}
              input_mode
              inputmax={100}
              icon={'magnify'}
              editable
              handleTextInputFocus={showTownshipSearch}
            />
            <Field
              name={'TownshipName'}
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
                name={'Wardcode'}
                title={'Ward Code '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                icon={'magnify'}
                editable
                handleTextInputFocus={showWardSearch}
              />
              <Field
                name={'WardName'}
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
              title={'Lolcation Code '}
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
              editable={update_status == true ? false : true}

            />
            <Field
              name={'salary_amount'}
              title={'Salary Amount'}
              component={TextInputFile}
              input_mode
              inputmax={100}
              editable={update_status == true ? false : true}

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
              <Text style={{color: '#fff', marginLeft: 15}}>
                Loan Limit Amount
              </Text>
            </View>
            <Text style={{color: '#F9A970', fontSize: 15, marginRight: 5}}>
              {loan_limit_amount}
            </Text>
          </View>

          {/* <View style={style.sub_list_container}>
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
          </View> */}

          {/* <View style={style.sub_list_container}>
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
          </View> */}

          {/* <View style={style.sub_list_container}>
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
          </View> */}
        </View>
      </List.Accordion>
    </>
  );
}
function mapStateToProps(state) {
  return {
    update_status: state.loan.staff_loan_update_status,
  };
}

export default reduxForm({
  form: 'Edit_Individual_Staff_Loan_Form',
  // validate,
})(connect(mapStateToProps, {})(Edit_Individual_staff_Emp_loan));