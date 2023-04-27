import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper';
import { getAllLoan } from '../../query/AllLoan_query';
export default function Viewloan() {

    useEffect(() => {
        getAllLoan()
    }, [count])


    const data = [
        {
            id: 1,
            type: 'Individual loan Type',
            no: '2000000000',
            name: 'Tun Tun',
            amount: '20000',
            sync: '00'
        },

        {
            id: 2,
            type: 'Cover loan ',
            no: '2000000000',
            name: 'Tun Tun',
            amount: '20000',
            sync: '00'
        },
        {
            id: 3,
            type: 'Individual loan Type',
            no: '2000000000',
            name: 'Tun Tun',
            amount: '20000',
            sync: '00'
        },

        {
            id: 4,
            type: 'Cover loan ',
            no: '2000000000',
            name: 'Tun Tun',
            amount: '20000',
            sync: '00'
        },

        {
            id: 5,
            type: 'Individual loan Type',
            no: '2000000000',
            name: 'Tun Tun',
            amount: '20000',
            sync: '00'
        },

        {
            id: 6,
            type: 'Cover loan ',
            no: '2000000000',
            name: 'Tun Tun',
            amount: '20000',
            sync: '00'
        },

        {
            id: 7,
            type: 'Individual loan Type',
            no: '2000000000',
            name: 'Tun Tun',
            amount: '20000',
            sync: '00'
        },

        {
            id: 8,
            type: 'Cover loan ',
            no: '2000000000',
            name: 'Tun Tun',
            amount: '20000',
            sync: '00'
        },

        {
            id: 9,
            type: 'Individual loan Type',
            no: '2000000000',
            name: 'Tun Tun',
            amount: '20000',
            sync: '00'
        },

        {
            id: 10,
            type: 'Cover loan ',
            no: '2000000000',
            name: 'Tun Tun',
            amount: '20000',
            sync: '00'
        }
    ]

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
                }}>{item.type}</Text>
                <Text style={{
                    padding: 10,
                    flex: 1,
                }}>{item.no}</Text>

                <Text style={{
                    padding: 10,
                    flex: 1,
                }}>{item.name}</Text>

                <Text style={{
                    padding: 10,
                    flex: 1,
                }}>{item.amount}</Text>

                <Text style={{
                    padding: 10,
                    flex: 1,
                }}>{item.sync}</Text>
            </View>
        )
    }
    return (
        <>
            {/* <Text>{count}</Text>
            <Button mode="contained" onPress={() =>setCount(count+1)}>
                Press me
            </Button> */}


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

            <FlatList data={data} renderItem={item}
                keyExtractor={(item, index) => index.toString()}

            />
        </>
    )
}