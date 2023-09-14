import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect, useRef, createRef } from 'react';
import DividerLine from '../../components/DividerLine';
import { style } from '../../style/Individual_Loan_style';
import {
  RadioButton,
  Button,
  List,
  Modal,
  Provider,
  Portal,
  TextInput,
} from 'react-native-paper';
import { reduxForm, Field, change, reset } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import TextInputFile from '../../components/TextInputFile';
import DropDownPicker from '../../components/DropDownPicker';
import DatePicker from '../../components/DatePicker';
import validate from './Validate';
import { resetMonthlyIncome } from '../../redux/MonthlyReducer';
import {
  cus_filter_item,
  sav_product_type,
  interest_rate,
  loan_type,
} from '../../common';
import { setBorrowerMap_Path } from '../../redux/LoanReducer';
import { RenderBottomSheet } from '../../components/RenderBotttomSheet';
import { addCustomerInfo } from '../../redux/CustomerReducer';
import {
  totalFamilyExpense,
  totalIncome,
  totalExpense,
  totalFamilyIncome,
} from '../../redux/MonthlyReducer';
import Create_Operation from '../../components/Create_Operation';
import { useTranslation } from 'react-i18next';


function Individual_Loan(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loanexpanded, setLoanExpanded] = React.useState(true);
  const [loan_cycle_value, setLocanCycleValue] = useState('');
  const [loan_type_value, setLoanType] = useState();
  const [show_canvas, setCanvas] = useState(false);
  const {
  } = props;

  const hideSignModal = () => {
    setCanvas(!show_canvas);
  };

  const handleLoanToggle = () => {
    setLoanExpanded(!loanexpanded);
  };

  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Text style={style.title_style}>{t("Individual Loan Application")}</Text>
            <DividerLine />


            <Create_Operation />
            <DividerLine />

            <List.Accordion
              expanded={loanexpanded}
              onPress={handleLoanToggle}
              style={style.list_container}
              titleStyle={style.list_title}
              title={t("Loan Info")}>
              <View style={style.sub_container}>
                <View style={style.sub_list_container}>
                  <Field
                    name={'application_no'}
                    title={'Application No'}
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
                    editable
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    data={loan_type}
                    name={'loan_type'}
                    title={t('Type of Loan')}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 300,
                    }}
                    onChange={value => setLoanType(value)}
                  />

                  <Field
                    name={'application_date'}
                    component={DatePicker}
                    label={'Application Date'}
                    icon={'calendar'}
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'loan_cycle'}
                    title={t('Loan Cycle')}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                    onChange={value => setLocanCycleValue(value)}
                    require
                  />

                  <Field
                    name={'loanterm_cnt'}
                    title={t('Loan Term')}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                    require
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'application_amt'}
                    title={t('Loan Apply Amount')}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                    require
                  />

                  <Field
                    name={'loan_code'}
                    title={t('Loan Code')}
                    component={TextInputFile}
                    cus_width
                    input_mode
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'loan_charges'}
                    title={'Loan Charges'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                  />
                  <Field
                    data={interest_rate}
                    name={'interest_rates'}
                    title={'Interest Rates'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 300,
                    }}
                    require
                  />
                </View>
                <View style={style.sub_list_container}>
                  <Field
                    data={sav_product_type}
                    name={'sv_pr_type'}
                    title={'Saving Product Type'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 300,
                    }}
                  />
                </View>
              </View>
            </List.Accordion>


          </View>
        </TouchableWithoutFeedback>
      </ScrollView>


    </>
  );
}

function mapStateToProps(state) {
  return {
    totalnet: state.monthly.totalnetincome,
    map: state.loan.borrower_map_path,
    update_status: state.loan.update_status,
  };
}

export default reduxForm({
  form: 'Individual_Loan_Form',
  enableReinitialize: true,
  initialValues: {
    village_status: '1',
    cst_new_exist_flg: 'N',
  },
  validate,
})(
  connect(mapStateToProps, {
    resetMonthlyIncome,
    setBorrowerMap_Path,
    totalIncome,
    totalExpense,
    totalFamilyIncome,
    totalFamilyExpense,
    addCustomerInfo,
  })(Individual_Loan),
);
