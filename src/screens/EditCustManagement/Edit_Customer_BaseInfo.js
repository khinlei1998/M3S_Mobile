import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import Collapsible from 'react-native-collapsible';
import {RadioButton} from 'react-native-paper';
import {
  Field,
  reduxForm,
  setInitialValues,
  initialize,
  change,
} from 'redux-form';
import DropDownPicker from '../../components/DropDownPicker';
import TextInputFile from '../../components/TextInputFile';
import {connect} from 'react-redux';
import DefaultTextInput from '../../components/DefaultTextInput';
import {Picker} from '@react-native-picker/picker';
import InputTest from '../../components/InputTest';
import {
  owner_shipratio,
  gender,
  maritail_status,
  address_type,
  condition_house,
} from '../../common';
import DividerLine from '../../components/DividerLine';
import DatePicker from '../../components/DatePicker';
import {style} from '../../style/Customer_Base_style';
import {setCusFormInitialValues} from '../../redux/CustomerReducer';
import {fetchAllCustomerNum} from '../../query/Customer_query';
import {Modal, Provider, Portal, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {city_code} from '../../common';
import {useDispatch} from 'react-redux';

function Edit_Customer_BaseInfo(props) {
  const {
    show_businessdate,
    handleStartLivingStatus,
    showNrcFun,
    show_nrc,
    handleSubmit,
    showVillageSearch,
    showCitySearch,
    showTownshipSearch,
    showWardSearch,
    update_status,
  } = props;
  const dispatch = useDispatch();

  const [open_cusinfo, setCusInfo] = useState(false);
  const [show_village, setVillage] = useState('village');
  const [modal_city_visible, setCityCodeModalVisible] = useState(false);
  const [selectedItemValue, setSelectedItemValue] = useState('employee_name');
  const [all_emp, setAllEmp] = useState([]);

  const CusInfoFun = () => {
    setCusInfo(!open_cusinfo);
  };

  const numbers = Array.from({length: 60}, (_, i) => i + 1);
  const handleRadioButtonChange = value => {
    alert(value);
    setVillage(value);
    if (value == 'ward') {
      dispatch(change('Customer_ManagementForm', 'village_code', ''));
    }
    // Dispatch action to clear the field value
    // dispatch(
    //   change('myForm', 'fieldName', radioValue === 'clear' ? '' : radioValue),
    // );
  };
  return (
    <>
      <View style={style.container}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>
          Customer Base Information
        </Text>
        <TouchableOpacity onPress={CusInfoFun}>
          <Icon name="arrow-up" size={30} style={{marginTop: 10}} />
        </TouchableOpacity>
      </View>

      <Collapsible collapsed={open_cusinfo}>
        <View style={style.collapsible_style}>
          <View
            style={{
              padding: 5,
            }}>
            <Text style={style.radio_title_style}>NRC Type</Text>

            <RadioButton.Group
              onValueChange={newValue => {
                showNrcFun(newValue);
              }}
              value={show_nrc}>
              <View style={style.child_radio_title_style}>
                <Text style={{marginTop: 5}}>Old </Text>
                <RadioButton value="old" />

                <Text style={{marginTop: 5}}>New</Text>
                <RadioButton value="new" />
              </View>
            </RadioButton.Group>

            <View style={style.child_input_style}>
              {show_nrc == 'old' ? (
                <Field
                  name={'nrc_no'}
                  title={'NRC'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  editable={update_status == true ? false : true}
                />
              ) : (
                <></>
              )}
              <Field
                name={'customer_no'}
                title={'Customer No'}
                component={TextInputFile}
                input_mode
                inputmax={100}
                editable
              />
            </View>

            <View style={style.child_input_style}>
              <Field
                name={'customer_nm'}
                title={'Customer Name'}
                component={TextInputFile}
                input_mode
                inputmax={100}
                editable={update_status == true ? false : true}
              />

              <Field
                name={'saving_acct_num'}
                title={'Saving Code'}
                component={TextInputFile}
                cus_width
                input_mode
                inputmax={20}
                editable={update_status == true ? false : true}
              />
            </View>

            <View style={style.child_input_style}>
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
                editable={update_status == true ? false : true}
                icon={update_status == true && 'calendar'}
                update_status
              />
            </View>

            <View style={style.child_input_style}>
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
              <Field
                name={'addr'}
                title={'No,Street '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                editable={update_status == true ? false : true}
              />
            </View>

            <View style={style.child_input_style}>
              <Field
                name={'city_code'}
                title={'City Code '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                icon={'magnify'}
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

            <View style={style.child_input_style}>
              <Field
                name={'township_code'}
                title={'Township Code '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                icon={'magnify'}
                editable
                handleTextInputFocus={showTownshipSearch}
              />
              <Field
                name={'township_name'}
                title={'Township Name '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                editable
              />
            </View>

            <RadioButton.Group
              onValueChange={newValue => handleRadioButtonChange(newValue)}
              value={show_village}>
              <View style={style.child_radio_title_style}>
                <Text style={{marginTop: 5}}>Village </Text>
                <RadioButton value="village" />

                <Text style={{marginTop: 5}}>Ward</Text>
                <RadioButton value="ward" />
              </View>
            </RadioButton.Group>

            {show_village == 'village' ? (
              <View style={style.child_input_style}>
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
              <View style={style.child_input_style}>
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
                  editable
                />
              </View>
            )}

            <View style={style.postal_input_style}>
              <Field
                name={'postal_code'}
                title={'Postal Code '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                input_cusstyle
                editable={update_status == true ? false : true}
              />
            </View>
            <Text style={style.radio_title_style}>
              Start Living Date Current Address
            </Text>
            <RadioButton.Group
             onValueChange={newValue => handleStartLivingStatus(newValue)}
              value={show_businessdate}>
              <View style={style.child_radio_title_style}>
                <Text style={{marginTop: 5}}>Estimated </Text>
                <RadioButton value="1" />

                <Text style={{marginTop: 5}}>Exact Date</Text>
                <RadioButton value="2" />
              </View>
            </RadioButton.Group>

            <View style={style.child_input_style}>
              {show_businessdate == '1' ? (
                <Field
                  num_data={numbers}
                  name={'curr_resident_perd'}
                  title={'Select a Value'}
                  component={DropDownPicker}
                  pickerStyle={{
                    width: 300,
                  }}
                  enabled={update_status == true ? false : true}
                />
              ) : (
                <Field
                  name={'curr_resident_perd'}
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
              />
            </View>

            <View style={style.child_input_style}>
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

            <View style={style.child_input_style}>
              <Field
                name={'hghschl_num'}
                title={'Number of High school Students '}
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

            <View style={style.child_input_style}>
              <Field
                data={condition_house}
                name={'house_ocpn_type'}
                title={'Condition of House'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 300,
                }}
                enabled={update_status == true ? false : true}
              />
              <Field
                data={owner_shipratio}
                name={'business_own_type'}
                title={'Ownership of Business'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 300,
                }}
                enabled={update_status == true ? false : true}
              />
            </View>

            <View style={style.child_input_style}>
              <Field
                name={'occupation'}
                title={'Occupation'}
                component={TextInputFile}
                editable={update_status == true ? false : true}
              />

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
            </View>
          </View>
        </View>
      </Collapsible>
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
