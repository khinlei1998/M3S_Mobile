import { View, Text } from 'react-native'
import React, { useState,useEffect } from 'react'
import { List, Button } from 'react-native-paper'
import { style } from '../../style/Individual_Loan_style';
import TextInputFile from '../../components/TextInputFile';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import DefaultTextInput from '../../components/DefaultTextInput';
import { getAllLoanMax } from '../../query/LoanMax_query';
function Borrower_Monthly_Income(props) {
    const {handleCalculate,app_amount}=props
    const [co_borrower_expanded, setBorrowerIncomeExpanded] = useState(true);

    const handleBorrowerIncomeToggle = () => {
        setBorrowerIncomeExpanded(!co_borrower_expanded);
    };

    const handleNetChange = () => {
        alert('pp')
    }

    const handleFieldChange = () => {

    }

    const handleFmailyChange = () => {

    }
    // const loadData = async () => {
    //     await getAllLoanMax().then(loan_max_data => {
    //         console.log('loan_max_data',loan_max_data);

    //     })
    // }
    // useEffect(() => {
    //     loadData();
    // }, []);

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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', padding: 5, marginTop: 10 }}>
                                Business Income/Expense
                            </Text>
                            <View style={{
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
                                    component={DefaultTextInput}
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
                                    <Text style={{ color: '#fff' }}>Total Net Income</Text>
                                    <Text style={{ color: '#F9A970' }}>
                                        0
                                    </Text>
                                </View>

                            </View>
                        </View>
                        {/* Family Inccome */}
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ fontWeight: 'bold', padding: 5, marginTop: 10 }}>
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
                                    component={DefaultTextInput}
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
                                    <Text style={{ color: '#fff' }}>Total Net Income</Text>
                                    <Text style={{ color: '#F9A970' }}>0</Text>
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
                        <View style={{ flexDirection: 'row' }}>
                            <View
                                style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                    Total Net Icome=
                                </Text>
                                <Text>
                                    (Total Net Icome= Total Business Net Income+Total Fammily Net
                                    Income+Other Income)
                                </Text>
                                {/* <Text style={{ color: '#F9A970', fontSize: 15 }}>0</Text> */}
                            </View>

                            <Text>
                                0
                            </Text>

                        </View>
                        <View style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: '#20316C',
                            alignItems: 'center',

                        }}>
                            <View style={{
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
                                <Text style={{ color: '#fff', marginLeft: 15 }} >Loan Limit Amount</Text>

                            </View>
                            <Text style={{ color: '#F9A970', fontSize: 15, marginRight: 5 }}>{app_amount}</Text>
                        </View>
                    </View>


                </View>
            </List.Accordion>


        </>
    )
}

function mapStateToProps(state) {
    return {};
}

export default reduxForm({
    form: 'Individual_Loan_Form',
    // validate,
})(connect(mapStateToProps, {})(Borrower_Monthly_Income));