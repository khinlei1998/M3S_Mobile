import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux';
import {Field, reduxForm, reset, change} from 'redux-form';
import { addInquiryLoanData } from '../../redux/LoanReducer';
function Viewloan(props) {
    const { loan_data,navigation ,addInquiryLoanData} = props
    const btn_inquiry_loan = (item) => {
        navigation.navigate('Edit_Individual_Loan', item)
        addInquiryLoanData(item)
    }
    const item = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => btn_inquiry_loan(item)}>
                <View style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                    padding: 10
                }}>
                    <Text style={{
                        padding: 10,
                        flex: 1,
                    }}>{item.id}</Text>
                    <Text style={{
                        padding: 10,
                        flex: 1,
                    }}>{item.loan_type}</Text>
                    <Text style={{
                        padding: 10,
                        flex: 1,
                    }}>{item.application_no}</Text>

                    <Text style={{
                        padding: 10,
                        flex: 1,
                    }}>{item.borrower_name}</Text>

                    <Text style={{
                        padding: 10,
                        flex: 1,
                    }}>{item.past_loan_amount}</Text>

                    <Text style={{
                        padding: 10,
                        flex: 1,
                    }}>{item.sync_sts}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <>

            <View style={{
                flexDirection: 'row',
                backgroundColor: '#D7D8DC',
                borderRadius: 5,
                padding: 5,
                margin: 10
            }}>
                <Text style={{
                    padding: 10,
                    flex: 1,
                    fontWeight: 'bold',
                }}>#</Text>
                <Text style={{
                    flex: 1,

                    padding: 10,
                    fontWeight: 'bold',
                }}>Loan Type</Text>
                <Text style={{
                    flex: 1,

                    padding: 10,
                    fontWeight: 'bold',
                }}>Application No</Text>
                <Text style={{
                    flex: 1,

                    padding: 10,
                    fontWeight: 'bold',
                }}>Borrower Name</Text>

                <Text style={{
                    flex: 1,

                    padding: 10,
                    fontWeight: 'bold',
                }}>Application amount</Text>

                <Text style={{
                    flex: 1,

                    padding: 10,
                    fontWeight: 'bold',
                }}>Sync</Text>
            </View>

            <FlatList data={loan_data} renderItem={item}
                keyExtractor={(item, index) => index.toString()}

            />
        </>
    )
}

export default reduxForm({
    form: 'ViewloanForm',
  })(
    connect(null, {
        addInquiryLoanData,
    })(Viewloan),
  );