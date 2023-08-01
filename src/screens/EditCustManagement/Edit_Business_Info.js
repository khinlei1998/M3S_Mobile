import {View, Text, TouchableOpacity, Button} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Collapsible from 'react-native-collapsible';
import {Field, reduxForm, setInitialValues, initialize} from 'redux-form';
import TextInputFile from '../../components/TextInputFile';
import {business_type} from '../../common';
import DropDownPicker from '../../components/DropDownPicker';
import {RadioButton, TextInput,List} from 'react-native-paper';
import RadioButtonFile from '../../components/RadioButtonFile';
import DatePicker from '../../components/DatePicker';
import DividerLine from '../../components/DividerLine';
import {
  business_situation,
  owner_shipratio,
  start_living_date_status,
} from '../../common';
// import {style} from '../../style/Business_Info_style';
import {connect} from 'react-redux';
import {style} from '../../style/Customer_Mang_style';
function Edit_Business_Info(props) {
  const {
    update_status,
    handlePeroidChange,
    show_businessdate_per,
    handleCurrBusinessChange,
    show_business_date,
  } = props;
  const [open_business_info, setBusinessInfo] = useState(true);

  const MonthlyIncomeFun = () => {
    setBusinessInfo(!open_business_info);
  };
  // const numbers = Array.from({length: 60}, (_, i) => i + 1);
  const numbers = Array.from({length: 60}, (_, i) => (i + 1).toString());

  const arrayWithObjects = numbers.map((num, index) => {
    return {id: num, label: num, value: num};
  });

  return (
    <>
      <List.Accordion
        expanded={open_business_info}
        onPress={setBusinessInfo}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Business Information">
        <View style={style.sub_container}>
          <View style={style.sub_list_container}>
            <Field
              name={'workplace_name'}
              title={'Business Name '}
              component={TextInputFile}
              input_mode
              inputmax={100}
              editable={update_status == true ? false : true}
            />
            <Field
              data={business_type}
              name={'workplace_type'}
              title={'Type of business'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
              enabled={update_status == true ? false : true}
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
                disabled={update_status == true ? false : true}
              />
            </View>

            <View style={style.input_container_style}>
              {show_businessdate_per == '1' ? (
                <Field
                  num_data={arrayWithObjects}
                  name={'workplace_date'}
                  title={'Select a Value'}
                  component={DropDownPicker}
                  keyboardType={'numeric'}
                  pickerStyle={{
                    width: 280,
                  }}
                  enabled={update_status == true ? false : true}
                />
              ) : (
                <Field
                  name={'workplace_date'}
                  component={DatePicker}
                  title={'Select Date'}
                  editable={update_status == true ? false : true}
                  icon={update_status == true && 'calendar'}
                />
              )}

              <Field
                name={'employee_num'}
                title={'Numbers of workers '}
                component={TextInputFile}
                input_mode
                inputmax={100}
                editable={update_status == true ? false : true}
              />
            </View>

            <View style={{marginRight: 10, marginLeft: 10}}>
              <Field
                name={'workplace_addr'}
                title={'Address'}
                component={TextInputFile}
                input_mode
                input_cusstyle
                inputmax={200}
                editable={update_status == true ? false : true}
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
                  disabled={update_status == true ? false : true}
                />
              </View>

              <View style={style.input_container_style}>
                {show_business_date == '1' ? (
                  <Field
                    num_data={arrayWithObjects}
                    name={'curr_workplace_date'}
                    title={'Select a Value'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 300,
                    }}
                    enabled={update_status == true ? false : true}
                  />
                ) : (
                  <Field
                    name={'curr_workplace_date'}
                    component={DatePicker}
                    editable={update_status == true ? false : true}
                  />
                )}
                <View>
                  <Text
                    style={{fontSize: 15, fontWeight: 'bold', marginLeft: 10}}>
                    Business Situation
                  </Text>
                  <Field
                    data={business_situation}
                    name={'business_sttn_flg'}
                    component={RadioButtonFile}
                    disabled={update_status == true ? false : true}
                  />
                </View>
              </View>

              <View style={style.input_container_style}>
                <Field
                  name={'land_scale'}
                  title={'Agriculture Land'}
                  component={TextInputFile}
                  keyboardType={'numeric'}
                  input_mode
                  words_count
                  inputmax={50}
                  editable={update_status == true ? false : true}
                />

                <Field
                  data={owner_shipratio}
                  name={'land_own_type'}
                  title={'OwnerShip Ratio'}
                  component={DropDownPicker}
                  pickerStyle={{
                    width: 280,
                  }}
                  enabled={update_status == true ? false : true}
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

function mapStateToProps(state) {
  return {
    update_status: state.customers.update_status,
  };
}

export default reduxForm({
  form: 'Customer_ManagementForm',
})(connect(mapStateToProps, {})(Edit_Business_Info));
