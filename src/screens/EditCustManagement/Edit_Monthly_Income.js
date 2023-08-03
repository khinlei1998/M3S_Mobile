import {View, Text, TouchableOpacity, Button, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import TextInputFile from '../../components/TextInputFile';
import DividerLine from '../../components/DividerLine';
import {connect} from 'react-redux';
import {Field, reduxForm, reset, change} from 'redux-form';
import {
  totalIncome,
  totalExpense,
  totalFamilyExpense,
  totalFamilyIncome,
  totalNetBusiness,
  totalNetFamily,
  updateTotalSum,
} from '../../redux/MonthlyReducer';
import {List} from 'react-native-paper';
import {style} from '../../style/Customer_Mang_style';
function Edit_Monthly_Income(props) {
  const {
    dispatch,
    totalIncome,
    updateTotalSum,
    inquiry_cusdata,
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
    update_status,
    total_net,
  } = props;
  const [values, setValues] = useState([
    inquiry_cusdata.rawmaterial_expans,
    inquiry_cusdata.wrkp_rent_expns,
    inquiry_cusdata.employee_expns,
    inquiry_cusdata.trnsrt_expns,
    inquiry_cusdata.bus_utlbil_expns,
    inquiry_cusdata.tel_expns,
    inquiry_cusdata.tax_expns,
    inquiry_cusdata.goods_loss_expns,
    inquiry_cusdata.othr_expns_1,
    inquiry_cusdata.othr_expns_2,
  ]);
  const [familyvalues, setFamilyValues] = useState([
    inquiry_cusdata.food_expns,
    inquiry_cusdata.house_mngt_expns,
    inquiry_cusdata.utlbil_expns,
    inquiry_cusdata.edct_expns,
    inquiry_cusdata.healthy_expns,
    inquiry_cusdata.fmly_trnsrt_expns,
    // retrive_loan_data.fmly_tax_expns,

    inquiry_cusdata.finance_expns,
    inquiry_cusdata.fmly_otr_expns,
  ]);
  const [open_monthlyincome, setMonthlyExpense] = useState(true);
  const [total_fmly_net, setFamilyNet] = useState(0);
  const [total_business_net, setBusinessNet] = useState(0);
  const [totalnet, setTotalNet] = useState(0);
  const MonthlyIncomeFun = () => {
    setMonthlyExpense(!open_monthlyincome);
  };

  const handleFieldChange = (value, index) => {
    const number = parseFloat(value);
    //2

    // Check if the input is a valid number
    if (!isNaN(number)) {
      // Update the corresponding value in the values array
      const newValues = [...values];
      newValues[index] = number;
      console.log('newValues', newValues);
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
          'Customer_ManagementForm',
          'tot_sale_expense',
          `${sum.toString()}`,
        ),
      );
    } else {
      const newValues = [...values];
      newValues[index] = 0;
      console.log('newValues', newValues);
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
        change(
          'Customer_ManagementForm',
          'tot_sale_expense',
          `${sum.toString()}`,
        ),
      );
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
      // const totalsmly_expense = sum + (-inquiry_cusdata.fmly_tot_expense)
      totalFamilyExpense(sum);
      dispatch(
        change(
          'Customer_ManagementForm',
          'fmly_tot_expense',
          `${sum.toString()}`,
        ),
      );
    } else {
      const newValues = [...familyvalues];
      console.log('familyvalues', familyvalues);
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
      console.log('sum', sum);
      totalFamilyExpense(sum);
      dispatch(
        change(
          'Customer_ManagementForm',
          'fmly_tot_expense',
          `${sum.toString()}`,
        ),
      );
    }
  };

  const handleNetChange = (text, index) => {
    const number = parseFloat(text);

    // Check if the input is a valid number
    if (!isNaN(number)) {
      totalIncome(number);
    } else {
      totalIncome(0);
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
  const calCulateSum = (total_expense, total_income) => {
    const sum = total_income - total_expense;
    setBusinessNet(sum);
    dispatch(
      change('Customer_ManagementForm', 'totBusNetIncomeitem', `${sum}`),
    );
    totalNetBusiness(sum);
  };
  const familyCulateSum = (total_family_income, total_family_expense) => {
    const sum = total_family_income - total_family_expense;
    setFamilyNet(sum);
    dispatch(change('Customer_ManagementForm', 'fmlyTotNetIncome', `${sum}`));
    totalNetFamily(sum);
  };
  const netCulateSum = (total_net_business, total_net_family) => {
    const sum = (total_net_business += total_net_family);
    updateTotalSum(sum);
    setTotalNet(sum);
    dispatch(change('Customer_ManagementForm', 'totalnet', `${sum}`));
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
        expanded={open_monthlyincome}
        onPress={setMonthlyExpense}
        style={style.list_container}
        titleStyle={style.list_title}
        title="     Monthly Income / Expense Statement
        ">
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            backgroundColor: '#FAF8F8',
            margin: 10,
          }}>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
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
                  name={'tot_sale_income'}
                  title={'Total Sale Income (+)'}
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
                  title={'Total Sale Expense (-)'}
                  component={TextInputFile}
                  input_mode
                  inputmax={28}
                  keyboardType={'numeric'}
                  editable
                />

                <Field
                  name={'rawmaterial_expans'}
                  title={'Raw Material Expense'}
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
                  title={'Business Building Renting'}
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
                  title={'Employee Expense'}
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
                  title={'Loss of Goods'}
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
                  title={'Other Expense'}
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
                  title={'Other Expense'}
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
                  <Text style={{color: '#fff'}}>Total Net Income</Text>
                  <Text style={{color: '#F9A970'}}>{total_net_business}</Text>
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
                  name={'fmly_tot_income'}
                  title={'Total Family Income (+)'}
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
                  title={'Total Family Expense (-)'}
                  component={TextInputFile}
                  inputmax={28}
                  keyboardType={'numeric'}
                  editable
                />

                <Field
                  name={'food_expns'}
                  title={'Cost For Food'}
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
                  title={'House Maintenance'}
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
                  title={'Electric, Water, Ph bill'}
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
                  title={'Education Expense'}
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
                  title={'Other Expense'}
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
                  <Text style={{color: '#fff'}}>Total Net Income</Text>
                  <Text style={{color: '#F9A970'}}>{total_net_family}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginLeft: 15, marginRight: 15}}>
            <Field
              name={'remark'}
              title={'Remark'}
              component={TextInputFile}
              input_mode
              input_cusstyle
              inputmax={10000}
              editable={update_status == true ? false : true}
            />
          </View>

          <View
            style={{
              marginTop: 10,
              padding: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  Total Net Icome=
                </Text>
                <Text style={{color: '#F9A970', fontSize: 15}}>
                  {total_net}
                </Text>
              </View>

              <Text>
                (Total Net Icome= Total Business Net Income+Total Fammily Net
                Income)
              </Text>
            </View>
          </View>
        </View>
      </List.Accordion>

      <DividerLine />
    </>
  );
}

function mapStateToProps(state) {
  return {
    // sale_expense:
    //   state.form.Customer_ManagementForm?.values?.totSaleExpense || '',
    update_status: state.customers.update_status,
    inquiry_cusdata: state.customers.inquiry_cusdata,
    total_income: state.monthly.totalincome,
    total_expense: state.monthly.totalexpense,
    total_family_income: state.monthly.totalincomeexpense,
    total_family_expense: state.monthly.totalfamilyexpense,
    total_net_business: state.monthly.totalnetbusiness,
    total_net_family: state.monthly.totalnetfamily,
    total_net: state.monthly.totalSum,
  };
}

export default reduxForm({
  form: 'Customer_ManagementForm',
  enableReinitialize: true,
})(
  connect(mapStateToProps, {
    totalFamilyIncome,
    totalIncome,
    totalExpense,
    totalFamilyExpense,
    totalNetBusiness,
    totalNetFamily,
    updateTotalSum,
  })(Edit_Monthly_Income),
);
