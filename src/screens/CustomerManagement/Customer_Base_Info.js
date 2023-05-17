import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Collapsible from 'react-native-collapsible';
import {
  RadioButton,
} from 'react-native-paper';
import { Field, reduxForm, setInitialValues, initialize } from 'redux-form';
import DropDownPicker from '../../components/DropDownPicker';
import TextInputFile from '../../components/TextInputFile';
import { connect } from 'react-redux';
import {
  owner_shipratio,
  gender,
  maritail_status,
  address_type,
  condition_house,
} from '../../common';
import DividerLine from '../../components/DividerLine';
import DatePicker from '../../components/DatePicker';
import { style } from '../../style/Customer_Base_style';

function Customer_Base_Info(props) {
  const { showNrcFun, show_nrc } = props
  const [open_cusinfo, setCusInfo] = useState(false);
  const [show_village, setVillage] = useState('village');
  const [show_businessdate, setBusiness] = useState('estimated');
  const CusInfoFun = () => {
    setCusInfo(!open_cusinfo);
  };

  const numbers = Array.from({ length: 60 }, (_, i) => i + 1);

  return (
    <>
      <View style={style.container}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
          Customer Base Information
        </Text>
        <TouchableOpacity onPress={CusInfoFun}>
          <Icon name="arrow-up" size={30} style={{ marginTop: 10 }} />
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
              onValueChange={newValue => showNrcFun(newValue)}
              value={show_nrc}>
              <View style={style.child_radio_title_style}>
                <Text style={{ marginTop: 5 }}>Old </Text>
                <RadioButton value="old" />

                <Text style={{ marginTop: 5 }}>New</Text>
                <RadioButton value="new" />
              </View>
            </RadioButton.Group>

            <View style={style.child_input_style}>
              {show_nrc == 'old' ? (
                <Field
                  name={'nrcNo'}
                  title={'NRC'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                />)
                :
                <></>

              }
              <Field
                name={'birthDate'}
                component={DatePicker}
                label={'date of birth'}
              />
            </View>

            <View style={style.child_input_style}>
              <Field
                name={'employeeName'}
                title={'Customer Name'}
                component={TextInputFile}
                input_mode
                inputmax={100}
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
                data={maritail_status}
                name={'maritalStatus'}
                title={'Maritial Status'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 300,
                }}
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
              />
              <Field
                name={'city_name'}
                title={'City Name '}
                component={TextInputFile}
                input_mode
                inputmax={100}
              />
            </View>

            <View style={style.child_input_style}>
              <Field
                name={'villageCode'}
                title={'Village Code '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                icon={'magnify'}
              />
              <Field
                name={'VillageName'}
                title={'Village Name '}
                component={TextInputFile}
                input_mode
                inputmax={100}
              />
            </View>

            <RadioButton.Group
              onValueChange={newValue => setVillage(newValue)}
              value={show_village}>
              <View style={style.child_radio_title_style}>
                <Text style={{ marginTop: 5 }}>Village </Text>
                <RadioButton value="village" />

                <Text style={{ marginTop: 5 }}>Ward</Text>
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
                />
                <Field
                  name={'village_name'}
                  title={'Village Name '}
                  component={TextInputFile}
                  input_mode
                  inputmax={100}
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

            <View style={style.postal_input_style}>
              <Field
                name={'postal_code'}
                title={'Postal Code '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                input_cusstyle
              />
            </View>
            <Text style={style.radio_title_style}>
              Start Living Date Current Address
            </Text>
            <RadioButton.Group
              onValueChange={newValue => setBusiness(newValue)}
              value={show_businessdate}>
              <View style={style.child_radio_title_style}>
                <Text style={{ marginTop: 5 }}>Estimated </Text>
                <RadioButton value="estimated" />

                <Text style={{ marginTop: 5 }}>Exact Date</Text>
                <RadioButton value="exact" />
              </View>
            </RadioButton.Group>

            <View style={style.child_input_style}>
              {show_businessdate == 'estimated' ? (
                <Field
                  num_data={numbers}
                  name={'currResidentPerd'}
                  title={'Select a Value'}
                  component={DropDownPicker}
                  pickerStyle={{
                    width: 300,
                  }}
                />
              ) : (
                <Field
                  name={'currResidentPerd'}
                  component={DatePicker}
                  label={'Start Living Date'}
                />
              )}
              <Field
                name={'telNo'}
                title={'Phone Number'}
                component={TextInputFile}
                input_mode
                inputmax={20}
              />
            </View>

            <View style={style.child_input_style}>
              <Field
                name={'mobileTelNo'}
                title={'Mobile Phone Number '}
                component={TextInputFile}
                input_mode
                inputmax={100}
              />
              <Field
                name={'familyNum'}
                title={'Number of family Number '}
                component={TextInputFile}
                input_mode
                inputmax={100}
              />
            </View>

            <View style={style.child_input_style}>
              <Field
                name={'hghschlNum'}
                title={'Number of High school Students '}
                component={TextInputFile}
                input_mode
                inputmax={100}
              />
              <Field
                name={'universityNum'}
                title={'Number of University Student '}
                component={TextInputFile}
                input_mode
                inputmax={100}
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
                data={owner_shipratio}
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
            </View>
          </View>
        </View>
      </Collapsible>
      <DividerLine />
    </>
  );
}

export default reduxForm({
  form: 'Customer_ManagementForm',
})(connect(null, {})(Customer_Base_Info));
