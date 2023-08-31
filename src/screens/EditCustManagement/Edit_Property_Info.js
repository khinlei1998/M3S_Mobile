import {View,} from 'react-native';
import React, {useState} from 'react';
import TextInputFile from '../../components/TextInputFile';
import DividerLine from '../../components/DividerLine';
import SingleCheckBox from '../../components/SingleCheckBox';
import {connect, } from 'react-redux';
import {Field, reduxForm, } from 'redux-form';
import {style} from '../../style/Customer_Mang_style';
import {List} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

function Edit_property_Info(props) {
  const {update_status} = props;
  const [show_propertyinfo, setOpenPropertyInfo] = useState(true);
  const {t} = useTranslation();

  return (
    <>
      <List.Accordion
        expanded={show_propertyinfo}
        onPress={setOpenPropertyInfo}
        style={style.list_container}
        titleStyle={style.list_title}
        title={t("Property Information")}>
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
                  label={t('House')}
                  name={'prop_house_yn'}
                  component={SingleCheckBox}
                  disabled={update_status == true ? false : true}
                />
                <Field
                  label={t('Motorcycle')}
                  name={'prop_motorcycle_yn'}
                  component={SingleCheckBox}
                  disabled={update_status == true ? false : true}
                />
              </View>

              <View>
                <Field
                  label={'Apartment'}
                  name={'prop_apartment_yn'}
                  component={SingleCheckBox}
                  initialValue={false}
                  disabled={update_status == true ? false : true}
                />
                <Field
                  label={t('Machines')}
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
                  label={t('Car')}
                  name={'prop_car_yn'}
                  component={SingleCheckBox}
                  initialValue={false}
                  checkedValue="Y"
                  uncheckedValue="N"
                  disabled={update_status == true ? false : true}
                />
                <Field
                  label={t('Farmland')}
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
              name={'tot_prop_estmtd_val'}
              title={t('Estimated Value')}
              component={TextInputFile}
              input_mode
              keyboardType={'numeric'}
              disabled={update_status == true ? false : true}
            />
          </View>

          <View style={style.input_container_style}>
            <Field
              name={'ohtr_own_property'}
              title={t('Other Property')}
              component={TextInputFile}
              input_mode
              disabled={update_status == true ? false : true}
            />
            <Field
              name={'otr_prop_estmtd_val'}
              title={t('Estimated Value')}
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
