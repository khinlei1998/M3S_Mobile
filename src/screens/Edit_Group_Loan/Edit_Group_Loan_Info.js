import {View, Text} from 'react-native';
import React, {useState, useEffect, createRef} from 'react';
import {style} from '../../style/Group_Loan_style';
import {List} from 'react-native-paper';
import DatePicker from '../../components/DatePicker';
import {reduxForm, Field, change, reset} from 'redux-form';
import TextInputFile from '../../components/TextInputFile';
import {connect} from 'react-redux';
import { useTranslation } from 'react-i18next';

function Edit_Group_Loan_Info(props) {
  const { t } = useTranslation();
  const [Group_expand, setGroupInfoExpand] = useState(true);
  const {showCustomerSearch, group_update_status} = props;
  const handleGroupToggle = () => {
    setGroupInfoExpand(!Group_expand);
  };
  return (
    <>
      <List.Accordion
        expanded={Group_expand}
        onPress={handleGroupToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Group Leader Information">
        <View style={style.sub_container}>
          <View style={style.sub_list_container}>
            <Field
              name={'group_aplc_no'}
              title={'Group Application No'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
            />

            <Field
              name={'product_type'}
              title={'Product Type'}
              component={TextInputFile}
              cus_width
              input_mode
              keyboardType={'numeric'}
              editable
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'application_date'}
              component={DatePicker}
              icon={group_update_status == true && 'calendar'}
              label={'Application Date'}
            />

            <Field
              name={'customer_no'}
              title={t('Customer No')}
              component={TextInputFile}
              cus_width
              input_mode
              editable
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'resident_rgst_id'}
              title={t('NRC')}
              icon={'magnify'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
              handleTextInputFocus={showCustomerSearch}
              focusTextInput
              require
            />

            <Field
              name={'leader_name'}
              title={'Leader Name'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'in_charge'}
              title={'In Charge'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={group_update_status == true ? false : true}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'father_name'}
              title={'Father Name'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={group_update_status == true ? false : true}
            />

            <Field
              name={'township_name'}
              title={'Name of Township'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={group_update_status == true ? false : true}
            />
          </View>

          <Field
            name={'addr'}
            title={'Address'}
            component={TextInputFile}
            input_mode
            input_cusstyle
            editable={group_update_status == true ? false : true}
          />
        </View>
      </List.Accordion>
    </>
  );
}
function mapStateToProps(state) {
  return {
    group_update_status: state.loan.group_update_status,
  };
}

export default reduxForm({
  form: 'Edit_Group_Form',
})(connect(mapStateToProps, {})(Edit_Group_Loan_Info));
