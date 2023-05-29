import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
export default function Viewloan(props) {
    const {loan_data}=props

    const item = ({ item }) => {
        return (
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