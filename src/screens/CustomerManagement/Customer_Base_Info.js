import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import Collapsible from 'react-native-collapsible';
import {RadioButton} from 'react-native-paper';
import {
  Field,
  reduxForm,
  setInitialValues,
  initialize,
  reset,
  change,
} from 'redux-form';
import DropDownPicker from '../../components/DropDownPicker';
import TextInputFile from '../../components/TextInputFile';
import {connect} from 'react-redux';
import DefaultTextInput from '../../components/DefaultTextInput';
import {Picker} from '@react-native-picker/picker';
import RadioButtonFile from '../../components/RadioButtonFile';
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
import {
  city_code,
  owner_ship_business,
  village_status,
  start_living_date_status,
  nrc_type,
} from '../../common';
import {useDispatch} from 'react-redux';

function Customer_Base_Info(props) {
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
    showLocationSearch,
  } = props;
  const dispatch = useDispatch();

  const [open_cusinfo, setCusInfo] = useState(false);
  const [show_village, setVillage] = useState('1');
  const [modal_city_visible, setCityCodeModalVisible] = useState(false);
  // const [show_businessdate, setBusiness] = useState('estimated');
  const [selectedItemValue, setSelectedItemValue] = useState('employee_name');
  const [all_emp, setAllEmp] = useState([]);

  const CusInfoFun = () => {
    setCusInfo(!open_cusinfo);
  };

  // const numbers = Array.from({length: 60}, (_, i) => i + 1);
  const numbers = Array.from({length: 60}, (_, i) => (i + 1).toString());

  const arrayWithObjects = numbers.map((num, index) => {
    return {id: num, label: num, value: num};
  });

  const handleRadioButtonChange = (value, input) => {
    setVillage(value.id);
    input.onChange(value.id);
    if (value.id == '2') {
      dispatch(change('Customer_ManagementForm', 'village_code', ''));
    }
  };

  const handleNRCChange = (value, input) => {
    input.onChange(value.id);
    showNrcFun(value.id);
    if (value.id == '1') {
      dispatch(change('Customer_ManagementForm', 'nrc_state_code', ''));
      dispatch(change('Customer_ManagementForm', 'nrc_prefix_code', ''));
      dispatch(change('Customer_ManagementForm', 'nrcNo', ''));
    } else {
      dispatch(change('Customer_ManagementForm', 'nrcNo', ''));
      dispatch(change('Customer_ManagementForm', 'resident_rgst_id', ''));
    }
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

            <Field
              data={nrc_type}
              name={'nrc_type'}
              component={RadioButtonFile}
              get_value={1}
              ShowRadioBtnChange={(value, input) =>
                handleNRCChange(value, input)
              }
            />

            <View style={style.child_input_style}>
              {show_nrc == '1' ? (
                <Field
                  name={'nrcNo'}
                  title={'NRC'}
                  inputmax={6}
                  component={TextInputFile}
                  cus_width
                  input_mode
                />
              ) : (
                <Field
                  name={'resident_rgst_id'}
                  title={'NRC'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  editable
                  require
                />
              )}

              <Field
                name={'CustomerNo'}
                title={'Customer No'}
                component={TextInputFile}
                input_mode
                inputmax={100}
                editable
                require
              />
            </View>

            <View style={style.child_input_style}>
              <Field
                name={'employeeName'}
                title={'Customer Name'}
                component={TextInputFile}
                input_mode
                inputmax={100}
                require
              />

              <Field
                name={'savingAcctNum'}
                title={'Saving Code'}
                component={TextInputFile}
                cus_width
                input_mode
                inputmax={20}
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
              />
              <Field
                name={'birthDate'}
                component={DatePicker}
                label={'date of birth'}
                icon={'calendar'}
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
              />
              <Field
                name={'addr'}
                title={'No,Street '}
                component={TextInputFile}
                input_mode
                inputmax={100}
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
            <View>
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
                  // editable
                />
              </View>
            ) : (
              <View style={style.child_input_style}>
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

            <View style={style.child_input_style}>
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

            <Text style={style.radio_title_style}>
              Start Living Date Current Address
            </Text>

            <View>
              <Field
                data={start_living_date_status}
                name={'start_living_date_status'}
                component={RadioButtonFile}
                ShowRadioBtnChange={(value, input) =>
                  handleStartLivingStatus(value, input)
                }
                get_value={'1'}
              />
            </View>

            <View style={style.child_input_style}>
              {show_businessdate == '1' ? (
                <Field
                  // num_data={numbers}
                  num_data={arrayWithObjects}
                  name={'curr_resident_date'}
                  title={'Select a Value'}
                  component={DropDownPicker}
                  pickerStyle={{
                    width: 300,
                  }}
                />
              ) : (
                <Field
                  name={'curr_resident_date'}
                  component={DatePicker}
                  label={'Start Living Date'}
                  icon={'calendar'}
                />
              )}
              <Field
                name={'telNo'}
                title={'Phone Number'}
                component={TextInputFile}
                input_mode
                inputmax={20}
                keyboardType={'numeric'}
              />
            </View>

            <View style={style.child_input_style}>
              <Field
                name={'mobileTelNo'}
                title={'Mobile Phone Number '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                keyboardType={'numeric'}
              />
              <Field
                name={'familyNum'}
                title={'Number of family Number '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                keyboardType={'numeric'}
              />
            </View>

            <View style={style.child_input_style}>
              <Field
                name={'hghschlNum'}
                title={'Number of High school Students '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                keyboardType={'numeric'}
              />
              <Field
                name={'universityNum'}
                title={'Number of University Student '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                keyboardType={'numeric'}
              />
            </View>

            <View style={style.child_input_style}>
              <Field
                data={condition_house}
                name={'houseOcpnType'}
                title={'Condition of House'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 300,
                }}
              />
              <Field
                data={owner_ship_business}
                name={'businessOwnType'}
                title={'Ownership of Business'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 300,
                }}
              />
            </View>

            <View style={style.child_input_style}>
              <Field
                name={'occupation'}
                title={'Occupation'}
                component={TextInputFile}
              />

              <Field
                data={maritail_status}
                name={'maritalStatus'}
                title={'Maritial Status'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 300,
                }}
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
  return {};
}

export default reduxForm({
  form: 'Customer_ManagementForm',
  enableReinitialize: true,
  initialValues: {
    village_status: '1',
    nrc_type: '1',
    start_living_date_status: '1',
    curr_business_date_status: '1',
  },
})(
  connect(mapStateToProps, {setCusFormInitialValues, fetchAllCustomerNum})(
    Customer_Base_Info,
  ),
);
