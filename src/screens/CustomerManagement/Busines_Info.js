import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Collapsible from 'react-native-collapsible';
import {Field, reduxForm} from 'redux-form';
import TextInputFile from '../../components/TextInputFile';
import {business_type} from '../../common';
import DropDownPicker from '../../components/DropDownPicker';
import {RadioButton} from 'react-native-paper';
import RadioButtonFile from '../../components/RadioButtonFile';
import DatePicker from '../../components/DatePicker';
import DividerLine from '../../components/DividerLine';
import {
  business_situation,
  owner_shipratio,
  start_living_date_status,
} from '../../common';
import {style} from '../../style/Business_Info_style';
import {connect} from 'react-redux';

function Busines_Info() {
  const [open_business_info, setBusinessInfo] = useState(false);
  const [show_businessdate, setBusiness] = useState('1');
  const [show_business_date, setBusinessStartDate] = useState('estimated');

  const MonthlyIncomeFun = () => {
    setBusinessInfo(!open_business_info);
  };
  const numbers = Array.from({length: 60}, (_, i) => i + 1);

  const handlePeroidChange = (value, input) => {
    input.onChange(value.id);
    setBusiness(value.id);
  };

  const handleCurrBusinessChange = (value, input) => {
    setBusinessStartDate(value.id);
    input.onChange(value.id);
  };

  return (
    <>
      <View style={style.container}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Business Info</Text>
        <TouchableOpacity onPress={MonthlyIncomeFun}>
          <Icon name="arrow-up" size={30} style={{marginTop: 10}} />
        </TouchableOpacity>
      </View>
      <Collapsible collapsed={open_business_info}>
        <View style={style.collapsible_container}>
          <View style={style.input_container_style}>
            <Field
              name={'workplaceName'}
              title={'Business Name '}
              component={TextInputFile}
              input_mode
              inputmax={100}
            />
            <Field
              data={business_type}
              name={'wokplaceType'}
              title={'Type of business'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
            />
          </View>
          <View
            style={{
              padding: 5,
              marginTop: 10,
            }}>
            <Text style={{marginLeft: 10, fontSize: 15, fontWeight: 'bold'}}>
              Business Period
            </Text>

            <View>
              <Field
                data={start_living_date_status}
                name={'business_period_status'}
                component={RadioButtonFile}
                ShowRadioBtnChange={(value, input) =>
                  handlePeroidChange(value, input)
                }
              />
            </View>

            <View style={style.input_container_style}>
              {show_businessdate == '1' ? (
                <Field
                  num_data={numbers}
                  name={'workplace_date'}
                  title={'Select a Value'}
                  component={DropDownPicker}
                  icon={'calendar'}
                  keyboardType={'numeric'}
                  pickerStyle={{
                    width: 280,
                  }}
                />
              ) : (
                <Field
                  name={'workplace_date'}
                  component={DatePicker}
                  title={'Select Date'}
                  icon={'calendar'}
                />
              )}

              <Field
                name={'employeeNum'}
                title={'Numbers of workers '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                keyboardType={'numeric'}
              />
            </View>

            <View style={{marginRight: 10, marginLeft: 10}}>
              <Field
                name={'workplaceAddr'}
                title={'Address'}
                component={TextInputFile}
                input_mode
                input_cusstyle
                inputmax={200}
              />
            </View>

            <View style={{marginTop: 15}}>
              <Text style={{marginLeft: 10, fontSize: 15, fontWeight: 'bold'}}>
                Current Businesss Start Date
              </Text>

              {/* <RadioButton.Group
                onValueChange={newValue => setBusinessStartDate(newValue)}
                value={show_business_date}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginLeft: 10,
                  }}>
                  <Text style={{ marginTop: 5 }}>Estimated </Text>
                  <RadioButton value="estimated" />

                  <Text style={{ marginTop: 5 }}>Exact Date</Text>
                  <RadioButton value="exact" />
                </View>
              </RadioButton.Group> */}

              <View>
                <Field
                  data={start_living_date_status}
                  name={'curr_business_date_status'}
                  component={RadioButtonFile}
                  ShowRadioBtnChange={(value, input) =>
                    handleCurrBusinessChange(value, input)
                  }
                />
              </View>

              <View style={style.input_container_style}>
                {show_business_date == 'estimated' ? (
                  <Field
                    num_data={numbers}
                    name={'currWorkplacePerd'}
                    title={'Select a Value'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 300,
                    }}
                  />
                ) : (
                  <Field
                    name={'currWorkplacePerd'}
                    component={DatePicker}
                    icon={'calendar'}
                  />
                )}
                <View>
                  <Text
                    style={{fontSize: 15, fontWeight: 'bold', marginLeft: 10}}>
                    Business Situation
                  </Text>
                  <Field
                    data={business_situation}
                    name={'businessSttnFlg'}
                    component={RadioButtonFile}
                  />
                </View>
              </View>

              <View style={style.input_container_style}>
                <Field
                  name={'landScale'}
                  title={'Agriculture Land'}
                  component={TextInputFile}
                  keyboardType={'numeric'}
                  input_mode
                  words_count
                  inputmax={50}
                />

                <Field
                  data={owner_shipratio}
                  name={'landOwnType'}
                  title={'OwnerShip Ratio'}
                  component={DropDownPicker}
                  pickerStyle={{
                    width: 280,
                  }}
                />
              </View>
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
})(connect(mapStateToProps, null)(Busines_Info));
