import {View, Text,} from 'react-native';
import React, {useState} from 'react';
import {Field, reduxForm} from 'redux-form';
import TextInputFile from '../../components/TextInputFile';
import {business_type} from '../../common';
import DropDownPicker from '../../components/DropDownPicker';
import RadioButtonFile from '../../components/RadioButtonFile';
import DatePicker from '../../components/DatePicker';
import DividerLine from '../../components/DividerLine';
import {
  business_situation,
  owner_shipratio,
  start_living_date_status,
} from '../../common';
import {connect} from 'react-redux';
import {style} from '../../style/Customer_Mang_style';
import {List} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

function Busines_Info() {
  const [open_business_info, setBusinessInfo] = useState(true);
  const [show_businessdate, setBusiness] = useState('1');
  const [show_business_date, setBusinessStartDate] = useState('estimated');
  const {t} = useTranslation();

  const MonthlyIncomeFun = () => {
    setBusinessInfo(!open_business_info);
  };
  const numbers = Array.from({length: 60}, (_, i) => (i + 1).toString());

  const arrayWithObjects = numbers.map((num, index) => {
    return {id: num, label: num, value: num};
  });

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
      <List.Accordion
        expanded={open_business_info}
        onPress={MonthlyIncomeFun}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Business Information">
        <View style={style.sub_container}>
          <View style={style.sub_list_container}>
            <Field
              name={'workplaceName'}
              title={t('Business Name')}
              component={TextInputFile}
              input_mode
              inputmax={100}
            />
            <Field
              data={business_type}
              name={'wokplaceType'}
              title={t('Type of business')}
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
              {t("Business Period")}
            </Text>
            <View>
              <Field
                data={start_living_date_status}
                name={'business_period_status'}
                component={RadioButtonFile}
                ShowRadioBtnChange={(value, input) =>
                  handlePeroidChange(value, input)
                }
                get_value={'1'}
              />
            </View>
            <View style={style.input_container_style}>
              {show_businessdate == '1' ? (
                <Field
                  num_data={arrayWithObjects}
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
                  label={'Select Date'}
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

              <View>
                <Field
                  data={start_living_date_status}
                  name={'curr_business_date_status'}
                  component={RadioButtonFile}
                  ShowRadioBtnChange={(value, input) =>
                    handleCurrBusinessChange(value, input)
                  }
                  get_value={1}
                />
              </View>

              <View style={style.input_container_style}>
                {show_business_date == 'estimated' ? (
                  <Field
                    num_data={arrayWithObjects}
                    name={'curr_workplace_date'}
                    title={'Select a Value'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 300,
                    }}
                  />
                ) : (
                  <Field
                    name={'curr_workplace_date'}
                    component={DatePicker}
                    icon={'calendar'}
                    label={'Select Date'}
                  />
                )}
                <View>
                  <Text
                    style={{fontSize: 15, fontWeight: 'bold', marginLeft: 10}}>
                    {t('Business Situation')}
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
                  title={t('Agriculture Land')}
                  component={TextInputFile}
                  keyboardType={'numeric'}
                  input_mode
                  words_count
                  inputmax={50}
                />

                <Field
                  data={owner_shipratio}
                  name={'landOwnType'}
                  title={t('OwnerShip Ratio')}
                  component={DropDownPicker}
                  pickerStyle={{
                    width: 280,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </List.Accordion>
      <DividerLine />
    </>
  );
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
})(connect(null, null)(Busines_Info));
