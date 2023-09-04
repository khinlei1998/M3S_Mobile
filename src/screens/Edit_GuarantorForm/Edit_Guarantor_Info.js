import { View, } from 'react-native';
import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { style } from '../../style/Guarantor_style';
import TextInputFile from '../../components/TextInputFile';
import { connect, } from 'react-redux';
import DropDownPicker from '../../components/DropDownPicker';
import DatePicker from '../../components/DatePicker';
import { reduxForm, Field, } from 'redux-form';
import {
  gender,
  address_type,
  maritail_status,
  condition_house,
  owner_ship_business
} from '../../common';
import { useTranslation } from 'react-i18next';

function Edit_Guarantor_Info(props) {
  const { t } = useTranslation()
  const { showGuarantorSearch, guarantor_update_status } = props;
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
        title="Guarantor Info">
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
              title={t('NRC')}
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
              title={t('Guarantor Name')}
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
              label={t('Date of birth')}
              icon={guarantor_update_status == true && 'calendar'}
              editable={guarantor_update_status == true ? false : true}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              data={maritail_status}
              name={'marital_status'}
              title={t('Marital Status')}
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
              title={t('Relationship with borrower')}
              component={TextInputFile}
              cus_width
              input_mode
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
              title={t('Condition of house')}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
              enabled={guarantor_update_status == true ? false : true}
            />

            <Field
              data={owner_ship_business}
              name={'business_own_type'}
              title={t('OwnerShip of business')}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
              enabled={guarantor_update_status == true ? false : true}
            />
          </View>
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
