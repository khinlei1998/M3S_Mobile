import {View, Text} from 'react-native';
import React, {useState, useEffect, createRef} from 'react';
import {List} from 'react-native-paper';
import DatePicker from '../../components/DatePicker';
import {reduxForm, Field, change, reset} from 'redux-form';
import TextInputFile from '../../components/TextInputFile';
import {connect} from 'react-redux';
import {style} from '../../style/Cover_Loan_style';
export default function Reloan_Info(props) {
  const [Reloan_expand, setReloanInfoExpand] = useState(true);
  const {showCustomerSearch} = props;
  const handleReloanToggle = () => {
    setReloanInfoExpand(!Reloan_expand);
  };
  const { t } = useTranslation();
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
              title={'Borrower Name'}
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
            />

            <Field
              name={'township_name'}
              title={'Name of Township'}
              component={TextInputFile}
              cus_width
              input_mode
            />
          </View>

          <Field
            name={'addr'}
            title={'Address'}
            component={TextInputFile}
            input_mode
            input_cusstyle
          />
        </View>
      </List.Accordion>
    </>
  );
}
