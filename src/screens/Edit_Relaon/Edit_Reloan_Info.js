import {View, } from 'react-native';
import React, {useState,} from 'react';
import {List} from 'react-native-paper';
import DatePicker from '../../components/DatePicker';
import {reduxForm, Field,} from 'redux-form';
import TextInputFile from '../../components/TextInputFile';
import {connect} from 'react-redux';
import {style} from '../../style/Cover_Loan_style';
import { useTranslation } from 'react-i18next';

 function Edit_Reloan_Info(props) {
  const [Reloan_expand, setReloanInfoExpand] = useState(true);
  const {showCustomerSearch,reloan_update_status} = props;
  const { t } = useTranslation()
  const handleReloanToggle = () => {
    setReloanInfoExpand(!Reloan_expand);
  };
  return (
    <>
      <List.Accordion
        expanded={Reloan_expand}
        onPress={handleReloanToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Reloan Information">
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
              editable={reloan_update_status == true ? false : true}

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
              editable={reloan_update_status == true ? false : true}

            />

            <Field
              name={'township_name'}
              title={'Name of Township'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={reloan_update_status == true ? false : true}

            />
          </View>

          <Field
            name={'addr'}
            title={'Address'}
            component={TextInputFile}
            input_mode
            input_cusstyle
            editable={reloan_update_status == true ? false : true}

          />
        </View>
      </List.Accordion>
    </>
  );
}
function mapStateToProps(state) {
  return {
    reloan_update_status: state.loan.reloan_update_status,
  };
}

export default reduxForm({
  form: 'Edit_Reloan_Form',
})(connect(mapStateToProps, {})(Edit_Reloan_Info));
