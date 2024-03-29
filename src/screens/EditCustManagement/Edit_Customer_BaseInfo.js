import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {List} from 'react-native-paper';
import {Field, reduxForm, change} from 'redux-form';
import DropDownPicker from '../../components/DropDownPicker';
import TextInputFile from '../../components/TextInputFile';
import {connect} from 'react-redux';
import {
  gender,
  maritail_status,
  address_type,
  condition_house,
  village_status,
  nrc_type,
  owner_ship_business,
} from '../../common';
import DividerLine from '../../components/DividerLine';
import DatePicker from '../../components/DatePicker';
import {setCusFormInitialValues} from '../../redux/CustomerReducer';
import {fetchAllCustomerNum} from '../../query/Customer_query';
import {start_living_date_status} from '../../common';
import {useDispatch} from 'react-redux';
import RadioButtonFile from '../../components/RadioButtonFile';
import {style} from '../../style/Customer_Mang_style';
import { useTranslation } from 'react-i18next';

function Edit_Customer_BaseInfo(props) {
  const {
    show_village,
    show_businessdate,
    handleStartLivingStatus,
    showNrcFun,
    show_nrc,
    showVillageSearch,
    showCitySearch,
    showTownshipSearch,
    showWardSearch,
    update_status,
    handleRadioButtonChange,
    showLocationSearch,
  } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation()
  const [open_cusinfo, setCusInfo] = useState(true);
  const numbers = Array.from({length: 60}, (_, i) => (i + 1).toString());

  const arrayWithObjects = numbers.map((num, index) => {
    return {id: num, label: num, value: num};
  });
  const handleNRCChange = (value, input) => {
    input.onChange(value.id);
    showNrcFun(value.id);
    if (value.id == '1') {
      dispatch(change('Customer_ManagementForm', 'nrc_state_code', ''));
      dispatch(change('Customer_ManagementForm', 'nrc_prefix_code', ''));
      dispatch(change('Customer_ManagementForm', 'nrc_no', ''));
      dispatch(change('Customer_ManagementForm', 'resident_rgst_id', ''));
    } else {
    }
  };
  return (
    <>
      <List.Accordion
        expanded={open_cusinfo}
        onPress={setCusInfo}
        style={style.list_container}
        titleStyle={style.list_title}
        title={t("Customer Base Information")}>
        <View style={style.sub_container}>
          <Text style={style.radio_title_style}>NRC Type</Text>

          <View>
            <Field
              data={nrc_type}
              name={'nrc_type'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleNRCChange(value, input)
              }
              disabled={update_status == true ? false : true}
            />
          </View>

          <View style={style.sub_list_container}>
            {show_nrc == '1' ? (
              <Field
                name={'resident_rgst_id'}
                title={t('NRC')}
                component={TextInputFile}
                cus_width
                input_mode
                editable={update_status == true ? false : true}
                require
              />
            ) : (
              <Field
                name={'resident_rgst_id'}
                title={t('NRC')}
                component={TextInputFile}
                cus_width
                input_mode
                editable
              />
            )}
            <Field
              name={'customer_no'}
              title={t('Customer No')}
              component={TextInputFile}
              input_mode
              inputmax={100}
              editable
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'customer_nm'}
              title={t('Customer Name')}
              component={TextInputFile}
              input_mode
              inputmax={100}
              editable={update_status == true ? false : true}
            />

            <Field
              name={'saving_acct_num'}
              title={t('Saving Code')}
              component={TextInputFile}
              cus_width
              input_mode
              inputmax={20}
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
              label={t('Date of birth')}
              editable={update_status == true ? false : true}
              icon={update_status == true && 'calendar'}
              update_status
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              data={address_type}
              name={'addressType'}
              title={'Address Type'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
              enabled={update_status == true ? false : true}
            />
            <Field
              name={'addr'}
              title={'No,Street '}
              component={TextInputFile}
              input_mode
              inputmax={100}
              editable={update_status == true ? false : true}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'city_code'}
              title={'City Code '}
              component={TextInputFile}
              input_mode
              inputmax={100}
              icon={update_status == true && 'magnify'}
              // icon={'magnify'}
              handleTextInputFocus={showCitySearch}
              editable
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
              // icon={'magnify'}
              icon={update_status == true && 'magnify'}
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

          <Field
            data={village_status}
            name={'village_status'}
            component={RadioButtonFile}
            ShowRadioBtnChange={(value, input) =>
              handleRadioButtonChange(value, input)
            }
            disabled={update_status == true ? false : true}
            get_value={1}
          />

          {show_village == '1' ? (
            <View style={style.sub_list_container}>
              <Field
                name={'village_code'}
                title={'Village Code '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                icon={update_status == true && 'magnify'}
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
            <View style={style.sub_list_container}>
              <Field
                name={'ward_code'}
                title={'Ward Code '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                icon={update_status == true && 'magnify'}
                editable
                handleTextInputFocus={showWardSearch}
              />
              <Field
                name={'ward_name'}
                title={'Ward Name '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                editable
              />
            </View>
          )}

          <View style={style.sub_list_container}>
            <Field
              name={'location_code'}
              title={t('Location Code')}
              component={TextInputFile}
              input_mode
              inputmax={100}
              icon={update_status == true && 'magnify'}
              editable
              handleTextInputFocus={showLocationSearch}
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

          <Text style={style.radio_title_style}>
            {t('Start Living Date Current Address')}
          </Text>

          <View>
            <Field
              data={start_living_date_status}
              name={'start_living_date_status'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleStartLivingStatus(value, input)
              }
              disabled={update_status == true ? false : true}
            />
          </View>

          <View style={style.sub_list_container}>
            {show_businessdate == '1' ? (
              <Field
                num_data={arrayWithObjects}
                name={'curr_resident_date'}
                title={'Select a Value'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 300,
                }}
                enabled={update_status == true ? false : true}
              />
            ) : (
              <Field
                name={'curr_resident_date'}
                component={DatePicker}
                label={'Start Living Date'}
                editable={update_status == true ? false : true}
                icon={update_status == true && 'calendar'}
              />
            )}
            <Field
              name={'tel_no'}
              title={'Tel Number'}
              component={TextInputFile}
              input_mode
              inputmax={20}
              keyboardType={'numeric'}
              editable={update_status == true ? false : true}
              require
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'mobile_tel_no'}
              title={'Mobile Tel Number '}
              component={TextInputFile}
              input_mode
              inputmax={100}
              keyboardType={'numeric'}
              editable={update_status == true ? false : true}
            />
            <Field
              name={'family_num'}
              title={'Number of family Number '}
              component={TextInputFile}
              input_mode
              inputmax={100}
              keyboardType={'numeric'}
              editable={update_status == true ? false : true}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'hghschl_num'}
              title={t('Number of High school Students')}
              component={TextInputFile}
              input_mode
              inputmax={100}
              keyboardType={'numeric'}
              editable={update_status == true ? false : true}
            />
            <Field
              name={'university_num'}
              title={'Number of University Student'}
              component={TextInputFile}
              input_mode
              inputmax={100}
              keyboardType={'numeric'}
              editable={update_status == true ? false : true}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              data={condition_house}
              name={'house_ocpn_type'}
              title={t('Condition of House')}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
              enabled={update_status == true ? false : true}
            />
            <Field
              data={owner_ship_business}
              name={'business_own_type'}
              title={t('Ownership of Business')}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
              enabled={update_status == true ? false : true}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'occupation'}
              title={t('Occupation')}
              component={TextInputFile}
              editable={update_status == true ? false : true}
            />

            <Field
              data={maritail_status}
              name={'maritalStatus'}
              title={t('Marital Status')}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
              enabled={update_status == true ? false : true}
            />
          </View>
        </View>
      </List.Accordion>
      <DividerLine />
    </>
  );
}

function mapStateToProps(state) {
  return {
    update_status: state.customers.update_status,
  };
}

export default reduxForm({
  form: 'Customer_ManagementForm',
  enableReinitialize: true,
})(
  connect(mapStateToProps, {setCusFormInitialValues, fetchAllCustomerNum})(
    Edit_Customer_BaseInfo,
  ),
);
