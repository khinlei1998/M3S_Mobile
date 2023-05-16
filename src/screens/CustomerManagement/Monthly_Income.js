import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Collapsible from 'react-native-collapsible';
import TextInputFile from '../../components/TextInputFile';
import {Field, reduxForm, setInitialValues, initialize} from 'redux-form';
import DividerLine from '../../components/DividerLine';
export default function Monthly_Income() {
  const [open_monthlyincome, setMonthlyExpense] = useState(false);

  const MonthlyIncomeFun = () => {
    setMonthlyExpense(!open_monthlyincome);
  };
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
          marginLeft: 30,
          marginRight: 20,
          marginTop: 15,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>
          Monthly Income / Expense Statement
        </Text>
        <TouchableOpacity onPress={MonthlyIncomeFun}>
          <Icon name="arrow-up" size={30} style={{marginTop: 10}} />
        </TouchableOpacity>
      </View>

      <Collapsible collapsed={open_monthlyincome}>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            backgroundColor: '#FAF8F8',
            margin: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={{fontWeight: 'bold'}}>Business Income/Expense</Text>
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
                />

                <Field
                  name={'totSaleExpense'}
                  title={'Total Sale Expense (-)'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />

                <Field
                  name={'rawmaterialExpans'}
                  title={'Raw Material Expense'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />

                <Field
                  name={'employeeNo'}
                  title={'Business Building Renting'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />

                <Field
                  name={'employeeExpns'}
                  title={'Employee Expense'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />

                <Field
                  name={'trnsrtExpns'}
                  title={'Transportation'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />
                <Field
                  name={'employeeNo'}
                  title={'Electricity Bill Expense'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />

                <Field
                  name={'telExpns'}
                  title={'Phone Bill Expense'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />
                <Field
                  name={'taxExpns'}
                  title={'Taxes'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />

                <Field
                  name={'employeeNo'}
                  title={'Loss of Gods'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />
                <Field
                  name={'othrExpns1'}
                  title={'Other Expense'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />

                <Field
                  name={'othrExpns2'}
                  title={'Other Expense'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
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
                  <Text style={{color: '#F9A970'}}>0</Text>
                </View>
              </View>
            </View>
            {/* Family Inccome */}

            <View style={{marginLeft: 15}}>
              <Text style={{fontWeight: 'bold'}}>Family Income/Expense</Text>
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
                />

                <Field
                  name={'fmlyTotExpense'}
                  title={'Total Family Expense (-)'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />

                <Field
                  name={'foodExpns'}
                  title={'Cost For Food'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />

                <Field
                  name={'houseMngtExpns'}
                  title={'House Maintenance'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />

                <Field
                  name={'utlbilExpns'}
                  title={'Electric, Water, Ph bill'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />

                <Field
                  name={'edctExpns'}
                  title={'Education Expense'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />
                <Field
                  name={'healthyExpns'}
                  title={'Social /Welfare(Healty Expense)'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />

                <Field
                  name={'employeeNo'}
                  title={'Transportation'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />
                <Field
                  name={'employeeNo'}
                  title={'Taxes'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />

                <Field
                  name={'employeeNo'}
                  title={'Loss of Gods'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />
                <Field
                  name={'employeeNo'}
                  title={'Other debt/Saving'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
                />

                <Field
                  name={'employeeNo'}
                  title={'Other Expense'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  inputmax={28}
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
                  <Text style={{color: '#F9A970'}}>0</Text>
                </View>
              </View>
            </View>
          </View>

          <Field
            name={'employeeNo'}
            title={'Remark'}
            component={TextInputFile}
            input_mode
            input_cusstyle
            inputmax={10000}
          />
          <View style={{marginTop: 10, padding: 10,justifyContent:'space-between',flexDirection:'row'}}>
            <View>
              <Text style={{fontWeight: 'bold'}}>Total Net Icome=</Text>
              <Text>
                (Total Net Icome= Total Business Net Income+Total Fammily Net
                Income+Other Income)
              </Text>
            </View>
            <Text>00</Text>
          </View>
        </View>
      </Collapsible>

      <DividerLine />
    </>
  );
}
