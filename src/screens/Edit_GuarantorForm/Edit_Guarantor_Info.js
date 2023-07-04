import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {List} from 'react-native-paper';
import {style} from '../../style/Guarantor_style';
import TextInputFile from '../../components/TextInputFile';
import {connect, useDispatch} from 'react-redux';
import DropDownPicker from '../../components/DropDownPicker';
import DatePicker from '../../components/DatePicker';
import {reduxForm, Field, change, reset} from 'redux-form';
import {
  gender,
  address_type,
  maritail_status,
  condition_house,
} from '../../common';
function Edit_Guarantor_Info(props) {
  const {showGuarantorSearch, guarantor_update_status} = props;
  const [guarantor_expand, setGuarantorInfoExpand] = useState(true);
  const handleGuarantorToggle = () => {
    setGuarantorInfoExpand(!guarantor_expand);
  };
  return (
    <>
      <List.Accordion
        expanded={guarantor_expand}
        onPress={handleGuarantorToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Borrower Info">
        <View style={style.sub_container}>
          <View style={style.sub_list_container}>
            <Field
              name={'guarantee_no'}
              title={'Guarantee No'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
            />

            <Field
              name={'guarantor_no'}
              title={'Guarantor No'}
              component={TextInputFile}
              cus_width
              input_mode
              keyboardType={'numeric'}
              editable
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'resident_rgst_id'}
              title={'NRC'}
              icon={guarantor_update_status == true && 'magnify'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
              require
              handleTextInputFocus={showGuarantorSearch}
            />

            <Field
              name={'guarantor_nm'}
              title={'Guarantor Name'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
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
              enabled={guarantor_update_status == true ? false : true}
            />

            <Field
              name={'birth_date'}
              component={DatePicker}
              label={'date of birth'}
              icon={guarantor_update_status == true && 'calendar'}
              editable={guarantor_update_status == true ? false : true}
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
              enabled={guarantor_update_status == true ? false : true}
            />

            <Field
              data={address_type}
              name={'address_type'}
              title={'Address Type'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
              enabled={guarantor_update_status == true ? false : true}
            />
          </View>

          <Field
            name={'addr'}
            title={'No,Street '}
            component={TextInputFile}
            input_mode
            inputmax={100}
            input_cusstyle
            editable={guarantor_update_status == true ? false : true}
          />
          <View style={style.sub_list_container}>
            <Field
              name={'curr_resident_date'}
              component={DatePicker}
              label={'Start Living Date in current address'}
              icon={guarantor_update_status == true && 'calendar'}
            />

            <Field
              name={'tel_no'}
              title={'Tel No'}
              component={TextInputFile}
              cus_width
              input_mode
              keyboardType={'numeric'}
              editable={guarantor_update_status == true ? false : true}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'borrower_rltn'}
              title={'Relationship with borrower'}
              component={TextInputFile}
              cus_width
              input_mode
              keyboardType={'numeric'}
              editable={guarantor_update_status == true ? false : true}
            />
            <Field
              name={'relation_period'}
              component={DatePicker}
              label={'Relationship Period'}
              icon={guarantor_update_status == true && 'calendar'}
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
              enabled={guarantor_update_status == true ? false : true}
            />

            <Field
              name={'business_own_type'}
              title={'OwnerShip of business'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={guarantor_update_status == true ? false : true}
            />
          </View>

          {/* <View style={style.sub_list_container}>

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
              name={'VillageName'}
              title={'Village Name '}
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


          </View> */}
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
})(connect(mapStateToProps, {})(Edit_Guarantor_Info));
