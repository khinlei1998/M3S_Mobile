import {View, Text} from 'react-native';
import React, {useState, useEffect, createRef} from 'react';
import {List} from 'react-native-paper';
import DatePicker from '../../components/DatePicker';
import {reduxForm, Field, change, reset} from 'redux-form';
import TextInputFile from '../../components/TextInputFile';
import {connect} from 'react-redux';
import {style} from '../../style/Cover_Loan_style';
import {setCover_UpdateStatus} from '../../redux/LoanReducer';
import { useTranslation } from 'react-i18next';

function Edit_Cover_Loan_Info(props) {
  const [Cover_expand, setCoverInfoExpand] = useState(true);
  const { t } = useTranslation();
  const {showCustomerSearch, cover_update_status} =
    props;
  const handleCoverToggle = () => {
    setCoverInfoExpand(!Cover_expand);
  };
  return (
    <>
      <List.Accordion
        expanded={Cover_expand}
        onPress={handleCoverToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="CoverLoan Information">
        <View style={style.sub_container}>
          <View style={style.sub_list_container}>
            <Field
              name={'group_aplc_no'}
              title={'Cover Application No'}
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
              label={'Application Date'}
              icon={'calendar'}
            />

            <Field
              name={'customer_no'}
              title={'Customer No'}
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
              title={t('Borrower Name')}
              component={TextInputFile}
              cus_width
              input_mode
              editable
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'father_name'}
              title={'Father Name'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={cover_update_status == true ? false : true}
            />

            <Field
              name={'township_name'}
              title={'Name of Township'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={cover_update_status == true ? false : true}

            />
          </View>

          <Field
            name={'addr'}
            title={'Address'}
            component={TextInputFile}
            input_mode
            input_cusstyle
            editable={cover_update_status == true ? false : true}

          />
        </View>
      </List.Accordion>
    </>
  );
}
function mapStateToProps(state) {
  return {
    cover_update_status: state.loan.cover_update_status,
  };
}

export default reduxForm({
  form: 'Edit_Cover_Form',
})(connect(mapStateToProps, {setCover_UpdateStatus})(Edit_Cover_Loan_Info));
