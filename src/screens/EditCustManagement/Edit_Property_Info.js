import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Feather';
import {property_type} from '../../common';
import CheckBoxFile from '../../components/CheckBoxFile';
import TextInputFile from '../../components/TextInputFile';
import DividerLine from '../../components/DividerLine';
// import {style} from '../../style/Property_Info_style';
import SingleCheckBox from '../../components/SingleCheckBox';
import {connect, useDispatch} from 'react-redux';
import {Field, reduxForm, change} from 'redux-form';
import {style} from '../../style/Customer_Mang_style';
import { List } from 'react-native-paper';

function Edit_property_Info(props) {
  const {update_status} = props;
  const [show_propertyinfo, setOpenPropertyInfo] = useState(true);

  const PropertyInfoFun = () => {
    setOpenPropertyInfo(!show_propertyinfo);
  };

  return (
    <>
      <List.Accordion
        expanded={show_propertyinfo}
        onPress={setOpenPropertyInfo}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Property Information">
        <View style={style.collasible_container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 15,
              marginRight: 16,
            }}>
            <View style={{padding: 5, flexDirection: 'row'}}>
              <View>
                <Field
                  label={'House'}
                  name={'prop_house_yn'}
                  component={SingleCheckBox}
                  // checkedValue="Y"
                  // uncheckedValue="N"
                  disabled={update_status == true ? false : true}
                  // format={value => !!value}
                  // parse={value => (value ? true : false)}
                />
                <Field
                  label={'Motorcycle'}
                  name={'prop_motorcycle_yn'}
                  component={SingleCheckBox}
                  // defaultValue={false}
                  disabled={update_status == true ? false : true}
                  // checkedValue="Y"
                  // uncheckedValue="N"
                />
              </View>

              <View>
                <Field
                  label={'Apartment'}
                  name={'prop_apartment_yn'}
                  component={SingleCheckBox}
                  initialValue={false}
                  // checkedValue="Y"
                  // uncheckedValue="N"
                  disabled={update_status == true ? false : true}
                />
                <Field
                  label={'Machines'}
                  name={'prop_machines_yn'}
                  component={SingleCheckBox}
                  initialValue={false}
                  checkedValue="Y"
                  uncheckedValue="N"
                  disabled={update_status == true ? false : true}
                />
              </View>

              <View>
                <Field
                  label={'prop_car_yn'}
                  name={'prop_car_yn'}
                  component={SingleCheckBox}
                  initialValue={false}
                  checkedValue="Y"
                  uncheckedValue="N"
                  disabled={update_status == true ? false : true}
                />
                <Field
                  label={'Farmland'}
                  name={'prop_farmland_yn'}
                  component={SingleCheckBox}
                  initialValue={false}
                  checkedValue="Y"
                  uncheckedValue="N"
                  disabled={update_status == true ? false : true}
                />
              </View>
            </View>

            <Field
              name={'otr_prop_estmtd_val'}
              title={'Estimated Value'}
              component={TextInputFile}
              input_mode
              keyboardType={'numeric'}
              disabled={update_status == true ? false : true}
            />
          </View>

          <View style={style.input_container_style}>
            <Field
              name={'ohtr_own_property'}
              title={'Other Property'}
              component={TextInputFile}
              input_mode
              disabled={update_status == true ? false : true}
            />
            <Field
              name={'tot_prop_estmtd_val'}
              title={'Estimated Value'}
              component={TextInputFile}
              input_mode
              keyboardType={'numeric'}
              disabled={update_status == true ? false : true}
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
})(connect(mapStateToProps, {})(Edit_property_Info));
