import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {List, Button} from 'react-native-paper';
import {style} from '../../style/Individual_Loan_style';
import TextInputFile from '../../components/TextInputFile';
import {reduxForm, Field, change} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import {getAllLoanMax} from '../../query/LoanMax_query';
import {
  totalIncome,
  totalExpense,
  totalFamilyExpense,
  totalFamilyIncome,
  totalNetBusiness,
  totalNetFamily,
  totalNetIncome,
} from '../../redux/MonthlyReducer';
import {useTranslation} from 'react-i18next';

import {totalLoanAmt} from '../../redux/MonthlyReducer';
function Borrower_Monthly_Income(props) {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {
    handleCalculate,
    app_amount,
    totalIncome,
    total_income,
    total_expense,
    totalExpense,
    totalFamilyExpense,
    totalFamilyIncome,
    total_family_income,
    total_family_expense,
    totalNetBusiness,
    total_net_business,
    totalNetFamily,
    total_net_family,
    total_business_net_total,
    totalNetIncome,
    totalLoanAmt,
    retrive_loan_data,
    loan_limit_amount,
    update_status
  } = props;
  const [co_borrower_expanded, setBorrowerIncomeExpanded] = useState(true);
  const [values, setValues] = useState([
    retrive_loan_data.rawmaterial_expans,
    retrive_loan_data.wrkp_rent_expns,
    retrive_loan_data.employee_expns,
    retrive_loan_data.trnsrt_expns,
    retrive_loan_data.bus_utlbil_expns,
    retrive_loan_data.tel_expns,
    retrive_loan_data.tax_expns,
    retrive_loan_data.goods_loss_expns,
    retrive_loan_data.othr_expns_1,
    retrive_loan_data.othr_expns_2,
  ]);
  const [familyvalues, setFamilyValues] = useState([
    retrive_loan_data.food_expns,
    retrive_loan_data.house_mngt_expns,
    retrive_loan_data.utlbil_expns,
    retrive_loan_data.edct_expns,
    retrive_loan_data.healthy_expns,
    retrive_loan_data.fmly_trnsrt_expns,
    retrive_loan_data.fmly_tax_expns,
    retrive_loan_data.finance_expns,
    retrive_loan_data.fmly_otr_expns,
  ]);
  const [total_fmly_net, setFamilyNet] = useState(0);
  const [totalnet, setTotalNet] = useState(0);

  const handleBorrowerIncomeToggle = () => {
    setBorrowerIncomeExpanded(!co_borrower_expanded);
  };

  const handleNetChange = (text, index) => {
    const number = parseFloat(text);

    // Check if the input is a valid number
    if (!isNaN(number)) {
      totalIncome(number);
    }
  };

  const handleFieldChange = (value, index) => {
    const number = parseFloat(value);

    // Check if the input is a valid number
    if (!isNaN(number)) {
      // Update the corresponding value in the values array
      const newValues = [...values];
      newValues[index] = number;
      setValues(newValues);
      const filteredValues = newValues.filter(
        value => typeof value === 'number',
      );

      // Calculate the sum of the values array
      const sum = filteredValues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      );
      console.log('sum', sum);
      totalExpense(sum);

      dispatch(
        change(
          'Edit_Individual_Loan_Form',
          'tot_sale_expense',
          `${sum.toString()}`,
        ),
      );
    } else {
      const newValues = [...values];
      newValues[index] = 0;
      setValues(newValues);
      const filteredValues = newValues.filter(
        value => typeof value === 'number',
      );
      // Calculate the sum of the values array
      const sum = filteredValues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      );
      console.log('sum', sum);
      totalExpense(sum);
      dispatch(
        change(
          'Edit_Individual_Loan_Form',
          'tot_sale_expense',
          `${sum.toString()}`,
        ),
      );
    }
  };

  const handleFamilyChange = text => {
    const number = parseFloat(text);

    // Check if the input is a valid number
    if (!isNaN(number)) {
      totalFamilyIncome(number);
    }
  };

  const handleFmailyChange = (value, index) => {
    const number = parseFloat(value);

    // Check if the input is a valid number
    if (!isNaN(number)) {
      // Update the corresponding value in the values array
      console.log('familyvalues', familyvalues);
      const newValues = [...familyvalues];
      newValues[index] = number;
      setFamilyValues(newValues);
      // Calculate the sum of the values array
      const filteredfmlyValues = newValues.filter(
        value => typeof value === 'number',
      );

      const sum = filteredfmlyValues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      );
      totalFamilyExpense(sum);
      dispatch(
        change(
          'Edit_Individual_Loan_Form',
          'fmly_tot_expense',
          `${sum.toString()}`,
        ),
      );
    } else {
      const newValues = [...familyvalues];
      newValues[index] = 0;
      console.log('family newValues', newValues);

      setFamilyValues(newValues);
      // Calculate the sum of the values array
      const filteredfmlyValues = newValues.filter(
        value => typeof value === 'number',
      );

      const sum = filteredfmlyValues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      );
      console.log('sum', sum);
      totalFamilyExpense(sum);
      dispatch(
        change(
          'Edit_Individual_Loan_Form',
          'fmly_tot_expense',
          `${sum.toString()}`,
        ),
      );
    }
  };

  const calCulateSum = (total_expense, total_income) => {
    const sum = total_income - total_expense;
    // setBusinessNet(sum);
    dispatch(
      change('Edit_Individual_Loan_Form', 'totBusNetIncomeitem', `${sum}`),
    );
    totalNetBusiness(sum);
  };

  const familyCulateSum = (total_family_income, total_family_expense) => {
    const sum = total_family_income - total_family_expense;
    setFamilyNet(sum);
    dispatch(change('Edit_Individual_Loan_Form', 'fmlyTotNetIncome', `${sum}`));
    totalNetFamily(sum);
  };
  const netCulateSum = (total_net_business, total_net_family) => {
    const sum = total_net_business + total_net_family;
    totalNetIncome(sum);
    setTotalNet(sum);
    dispatch(change('Edit_Individual_Loan_Form', 'totalnet', `${sum}`));
  };

  useEffect(() => {
    calCulateSum(total_expense, total_income);
  }, [total_expense, total_income]);

  useEffect(() => {
    familyCulateSum(total_family_income, total_family_expense);
  }, [total_family_income, total_family_expense]);

  useEffect(() => {
    netCulateSum(total_net_business, total_net_family);
  }, [total_net_business, total_net_family]);

  return (
    <>
      <List.Accordion
        expanded={co_borrower_expanded}
        onPress={handleBorrowerIncomeToggle}
        style={{
          backgroundColor: '#fff',
        }}
        titleStyle={style.list_title}
        title={t("Borrower's Monthly Income/Expense Statement")}>
        <View style={style.sub_container}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={{fontWeight: 'bold', padding: 5, marginTop: 10}}>
                {t("Business Income/Expense")}
              </Text>
              <View
                style={{
                  backgroundColor: '#ECF0F3',
                  borderWidth: 1,
                  borderColor: '#CFD2DC',
                  padding: 10,
                  marginTop: 10,
                }}>
                <Field
                  name={'tot_sale_income'}
                  title={t('Total Sale Income (+)')}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleNetChange(value, 10)}
                  editable={update_status == true ? false : true}

                />

                <Field
                  name={'tot_sale_expense'}
                  title={t('Total Sale Expense (-)')}
                  component={TextInputFile}
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  editable
                />
                <Field
                  name={'rawmaterial_expans'}
                  title={t('Raw Material Expense')}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 0)}
                  editable={update_status == true ? false : true}

                />

                <Field
                  name={'wrkp_rent_expns'}
                  title={t('Business Building Renting')}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 1)}
                  editable={update_status == true ? false : true}

                />

                <Field
                  name={'employee_expns'}
                  title={t('Employee Expense')}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 2)}
                  editable={update_status == true ? false : true}

                />

                <Field
                  name={'trnsrt_expns'}
                  title={'Transportation'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 3)}
                  editable={update_status == true ? false : true}

                />

                <Field
                  name={'bus_utlbil_expns'}
                  title={'Electricity Bill Expense'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 4)}
                  editable={update_status == true ? false : true}

                />

                <Field
                  name={'tel_expns'}
                  title={'Phone Bill Expense'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 5)}
                  editable={update_status == true ? false : true}

                />

                <Field
                  name={'tax_expns'}
                  title={'Taxes'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 6)}
                  editable={update_status == true ? false : true}

                />

                <Field
                  name={'goods_loss_expns'}
                  title={t('Loss of Goods')}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 7)}
                  editable={update_status == true ? false : true}

                />

                <Field
                  name={'othr_expns_1'}
                  title={t('Other Expense')}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 8)}
                  editable={update_status == true ? false : true}

                />

                <Field
                  name={'othr_expns_2'}
                  title={t('Other Expense')}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 9)}
                  editable={update_status == true ? false : true}

                />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#20316C',
                    width: 300,
                    padding: 20,
                    marginTop: 10,
                  }}>
                  <Text style={{color: '#fff'}}>{t('Total Net Income')}</Text>
                  <Text style={{color: '#F9A970'}}>
                    {total_business_net_total}
                  </Text>
                </View>
              </View>
            </View>
            {/* Family Inccome */}
            <View style={{marginLeft: 15}}>
              <Text style={{fontWeight: 'bold', padding: 5, marginTop: 10}}>
                {t("Family Income/Expense")}
              </Text>
              <View
                style={{
                  backgroundColor: '#ECF0F3',
                  borderWidth: 1,
                  borderColor: '#CFD2DC',
                  padding: 10,
                  marginTop: 10,
                }}>
                <Field
                  name={'fmly_tot_income'}
                  title={t('Total Family Income (+)')}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFamilyChange(value)}
                  editable={update_status == true ? false : true}

                />

                <Field
                  name={'fmly_tot_expense'}
                  title={t('Total Family Expense (-)')}
                  component={TextInputFile}
                  inputmax={28}
                  keyboardType={'numeric'}
                  editable
                />

                <Field
                  name={'food_expns'}
                  title={t('Cost For Food')}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFmailyChange(value, 0)}
                  editable={update_status == true ? false : true}

                />

                <Field
                  name={'house_mngt_expns'}
                  title={t('House Maintenance')}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFmailyChange(value, 1)}
                  editable={update_status == true ? false : true}

                />

                <Field
                  name={'utlbil_expns'}
                  title={t('Electric, Water, Ph bill')}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFmailyChange(value, 2)}
                  editable={update_status == true ? false : true}

                />

                <Field
                  name={'edct_expns'}
                  title={t('Education Expense')}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFmailyChange(value, 3)}
                  editable={update_status == true ? false : true}

                />
                <Field
                  name={'healthy_expns'}
                  title={'Social /Welfare(Healty Expense)'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFmailyChange(value, 4)}
                  editable={update_status == true ? false : true}

                />

                <Field
                  name={'fmly_trnsrt_expns'}
                  title={'Transportation'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFmailyChange(value, 5)}
                  editable={update_status == true ? false : true}

                />
                <Field
                  name={'fmly_tax_expns'}
                  title={'Taxes'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFmailyChange(value, 6)}
                  editable={update_status == true ? false : true}

                />

                <Field
                  name={'finance_expns'}
                  title={'Other debt/Saving'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFmailyChange(value, 7)}
                  editable={update_status == true ? false : true}

                />

                <Field
                  name={'fmly_otr_expns'}
                  title={t('Other Expense')}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFmailyChange(value, 8)}
                  editable={update_status == true ? false : true}

                />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#20316C',
                    width: 300,
                    padding: 20,
                    marginTop: 77,
                  }}>
                  <Text style={{color: '#fff'}}>{t('Total Net Income')}</Text>
                  <Text style={{color: '#F9A970'}}>{total_fmly_net}</Text>
                </View>
              </View>
            </View>
          </View>
          <Field
            name={'remark'}
            title={t('Remark')}
            component={TextInputFile}
            input_mode
            input_cusstyle
            inputmax={10000}
            editable={update_status == true ? false : true}

          />

          <View
            style={{
              marginTop: 10,
              padding: 10,
              // justifyContent: 'space-between',
              // flexDirection: 'row',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  Total Net Icome=
                </Text>
                <Text>
                  (Total Net Icome= Total Business Net Income+Total Fammily Net
                  Income+Other Income)
                </Text>
                {/* <Text style={{ color: '#F9A970', fontSize: 15 }}>0</Text> */}
              </View>

              <Text>{totalnet}</Text>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#20316C',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: 10,
                  padding: 10,
                  alignItems: 'center',
                }}>
                <Button
                  onPress={() => handleCalculate()}
                  mode="contained"
                  buttonColor={'#6870C3'}
                  style={{
                    borderRadius: 0,
                    width: 150,
                    color: 'black',
                    marginLeft: 5,
                    padding: 5,
                  }}>
                  Calculation
                </Button>
                <Text style={{color: '#fff', marginLeft: 15}}>
                  Loan Limit Amount
                </Text>
              </View>
              <Text style={{color: '#F9A970', fontSize: 15, marginRight: 5}}>
                {/* {app_amount} */}
                {loan_limit_amount}
              </Text>
            </View>
          </View>
        </View>
      </List.Accordion>
    </>
  );
}

function mapStateToProps(state) {
  const total_business_net_total =
    state.monthly.totalincome - state.monthly.totalexpense;
  return {
    total_income: state.monthly.totalincome,
    total_expense: state.monthly.totalexpense,
    total_family_income: state.monthly.totalincomeexpense,
    total_family_expense: state.monthly.totalfamilyexpense,
    total_net_business: state.monthly.totalnetbusiness,
    total_net_family: state.monthly.totalnetfamily,
    total_business_net_total,
    retrive_loan_data: state.loan.edit_loandata,
    loan_limit_amount:state.monthly.totallmtamount,
    update_status: state.loan.update_status,

  };
}

export default reduxForm({
  form: 'Edit_Individual_Loan_Form',
  // validate,
})(
  connect(mapStateToProps, {
    totalFamilyIncome,
    totalIncome,
    totalExpense,
    totalFamilyExpense,
    totalNetBusiness,
    totalNetFamily,
    totalNetIncome,
    totalLoanAmt,
  })(Borrower_Monthly_Income),
);
