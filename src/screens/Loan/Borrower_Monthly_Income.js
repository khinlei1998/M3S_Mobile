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
import {totalLoanAmt} from '../../redux/MonthlyReducer';
function Borrower_Monthly_Income(props) {
  const dispatch = useDispatch();

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
    customer_info,
  } = props;
  const [co_borrower_expanded, setBorrowerIncomeExpanded] = useState(true);
  const [values, setValues] = useState([]);
  const [familyvalues, setFamilyValues] = useState([]);
  const [total_fmly_net, setFamilyNet] = useState(0);
  const [totalnet, setTotalNet] = useState(0);
  const handleBorrowerIncomeToggle = () => {
    setBorrowerIncomeExpanded(!co_borrower_expanded);
  };

  useEffect(() => {
    setValues([
      customer_info.rawmaterial_expans,
      customer_info.wrkp_rent_expns,
      customer_info.employee_expns,
      customer_info.trnsrt_expns,
      customer_info.bus_utlbil_expns,
      customer_info.tel_expns,
      customer_info.tax_expns,
      customer_info.goods_loss_expns,
      customer_info.othr_expns_1,
      customer_info.othr_expns_2,
    ]);

    setFamilyValues([
      customer_info.food_expns,
      customer_info.house_mngt_expns,
      customer_info.utlbil_expns,
      customer_info.edct_expns,
      customer_info.healthy_expns,
      customer_info.fmly_trnsrt_expns,
      customer_info.fmly_tax_expns,
      customer_info.finance_expns,
      customer_info.fmly_otr_expns,
    ]);
  }, [customer_info]);

  const handleNetChange = (text, index) => {
    const number = parseFloat(text);

    // Check if the input is a valid number
    if (!isNaN(number)) {
      totalIncome(number);
    } else {
      totalIncome(0);
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
      totalExpense(sum);

      dispatch(
        change('Individual_Loan_Form', 'totSaleExpense', `${sum.toString()}`),
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
      totalExpense(sum);
      dispatch(
        change('Individual_Loan_Form', 'totSaleExpense', `${sum.toString()}`),
      );
    }
  };

  const handleFamilyChange = text => {
    const number = parseFloat(text);

    // Check if the input is a valid number
    if (!isNaN(number)) {
      totalFamilyIncome(number);
    } else {
      totalFamilyIncome(0);
    }
  };

  const handleFmailyChange = (value, index) => {
    const number = parseFloat(value);

    // Check if the input is a valid number
    if (!isNaN(number)) {
      // Update the corresponding value in the values array
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
        change('Individual_Loan_Form', 'fmlyTotExpense', `${sum.toString()}`),
      );
    } else {
      const newValues = [...familyvalues];
      newValues[index] = 0;

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
        change('Individual_Loan_Form', 'fmlyTotExpense', `${sum.toString()}`),
      );
    }
  };

  const calCulateSum = (total_expense, total_income) => {
    const sum = total_income - total_expense;
    // setBusinessNet(sum);
    dispatch(change('Individual_Loan_Form', 'totBusNetIncomeitem', `${sum}`));
    totalNetBusiness(sum);
  };

  const familyCulateSum = (total_family_income, total_family_expense) => {
    const sum = total_family_income - total_family_expense;
    setFamilyNet(sum);
    dispatch(change('Individual_Loan_Form', 'fmlyTotNetIncome', `${sum}`));
    totalNetFamily(sum);
  };
  const netCulateSum = (total_net_business, total_net_family) => {
    const sum = total_net_business + total_net_family;
    totalNetIncome(sum);
    setTotalNet(sum);
    dispatch(change('Individual_Loan_Form', 'totalnet', `${sum}`));
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
        title="Borrower's Monthly Income/Expense Statement">
        <View style={style.sub_container}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={{fontWeight: 'bold', padding: 5, marginTop: 10}}>
                Business Income/Expense
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
                  name={'totSaleIncome'}
                  title={'Total Sale Income (+)'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleNetChange(value, 10)}
                />

                <Field
                  name={'totSaleExpense'}
                  title={'Total Sale Expense (-)'}
                  component={TextInputFile}
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  editable
                />
                <Field
                  name={'rawmaterialExpans'}
                  title={'Raw Material Expense'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 0)}
                />

                <Field
                  name={'wrkpRentExpns'}
                  title={'Business Building Renting'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 1)}
                />

                <Field
                  name={'employeeExpns'}
                  title={'Employee Expense'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 2)}
                />

                <Field
                  name={'trnsrtExpns'}
                  title={'Transportation'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 3)}
                />

                <Field
                  name={'busutlbilexpns'}
                  title={'Electricity Bill Expense'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 4)}
                />

                <Field
                  name={'telExpns'}
                  title={'Phone Bill Expense'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 5)}
                />

                <Field
                  name={'taxExpns'}
                  title={'Taxes'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 6)}
                />

                <Field
                  name={'goodsLossExpns'}
                  title={'Loss of Goods'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 7)}
                />

                <Field
                  name={'othrExpns1'}
                  title={'Other Expense'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 8)}
                />

                <Field
                  name={'othrExpns2'}
                  title={'Other Expense'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFieldChange(value, 9)}
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
                  <Text style={{color: '#fff'}}>Total Net Income</Text>
                  <Text style={{color: '#F9A970'}}>
                    {' '}
                    {total_business_net_total}
                  </Text>
                </View>
              </View>
            </View>
            {/* Family Inccome */}
            <View style={{marginLeft: 15}}>
              <Text style={{fontWeight: 'bold', padding: 5, marginTop: 10}}>
                Family Income/Expense
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
                  name={'fmlyTotIncome'}
                  title={'Total Family Income (+)'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFamilyChange(value)}
                />

                <Field
                  name={'fmlyTotExpense'}
                  title={'Total Family Expense (-)'}
                  component={TextInputFile}
                  inputmax={28}
                  keyboardType={'numeric'}
                  editable
                />

                <Field
                  name={'foodExpns'}
                  title={'Cost For Food'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFmailyChange(value, 0)}
                />

                <Field
                  name={'houseMngtExpns'}
                  title={'House Maintenance'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFmailyChange(value, 1)}
                />

                <Field
                  name={'utlbilExpns'}
                  title={'Electric, Water, Ph bill'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFmailyChange(value, 2)}
                />

                <Field
                  name={'edctExpns'}
                  title={'Education Expense'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFmailyChange(value, 3)}
                />
                <Field
                  name={'healthyExpns'}
                  title={'Social /Welfare(Healty Expense)'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFmailyChange(value, 4)}
                />

                <Field
                  name={'fmlyTrnsrtExpns'}
                  title={'Transportation'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFmailyChange(value, 5)}
                />
                <Field
                  name={'fmlyTaxExpns'}
                  title={'Taxes'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFmailyChange(value, 6)}
                />

                <Field
                  name={'financeExpns'}
                  title={'Other debt/Saving'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFmailyChange(value, 8)}
                />

                <Field
                  name={'fmlyOtrExpns'}
                  title={'Other Expense'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  onChange={value => handleFmailyChange(value, 9)}
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
                  <Text style={{color: '#fff'}}>Total Net Income</Text>
                  <Text style={{color: '#F9A970'}}>{total_fmly_net}</Text>
                </View>
              </View>
            </View>
          </View>
          <Field
            name={'remark'}
            title={'Remark'}
            component={TextInputFile}
            input_mode
            input_cusstyle
            inputmax={10000}
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
                {app_amount}
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
    customer_info: state.customers.customer_info,
  };
}

export default reduxForm({
  form: 'Individual_Loan_Form',
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
