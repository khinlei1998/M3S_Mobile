import {View, Text, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Viewloan from '../Loan/Viewloan';
import {fetchEmpName} from '../../query/Employee_query';
import {getAllLoan} from '../../query/AllLoan_query';
import {Modal, Portal, Button, Provider, Divider} from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

export default function Home(props) {
  const {navigation} = props;
  const isFocused = useIsFocused();


  const [emp_name, setEmpName] = useState();
  const [loan_data, setAllLoan] = useState([]);

  const loadData = async () => {
    await fetchEmpName()
      .then(data => setEmpName(data[0].employee_name))
      .catch(error => console.log(error));

    await getAllLoan()
      .then(data => setAllLoan(data))
      .catch(error => console.log(error));
  };

  const data = [
    {
      id: 1,
      type: 'Individual loan Type',
      no: '2000000000',
      name: 'Tun Tun',
      amount: 500000,
      sync: '00',
    },

    {
      id: 2,
      type: 'Cover loan ',
      no: '2000000000',
      name: 'Tun Tun',
      amount: 900000,
      sync: '00',
    },
    {
      id: 3,
      type: 'Individual loan Type',
      no: '2000000000',
      name: 'Tun Tun',
      amount: 250000,
      sync: '00',
    },
  ];

  const totalAmount = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0,
  );
  const formattedPrice = totalAmount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Output: "1,000"

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [loadData]);
  console.log('loan_data',loan_data);
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#232D57',
          flexDirection: 'row',
          justifyContent: 'space-around',
          height: 300,
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/images/default-user.png')}
            style={{width: 30, height: 30}}
          />
          <View style={{marginLeft: 20}}>
            <Text style={{color: '#c7c7c7'}}>Team leader</Text>
            <Text style={{color: '#fff'}}>{emp_name}</Text>
          </View>
        </View>

        <View
          style={{
            width: 250,
            height: 200,
            borderRadius: 10,
            backgroundColor: '#46578D',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            padding: 10,
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              color: '#fff',
              padding: 5,
            }}>
            Number of new loans
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                fontSize: 25,
                textAlign: 'right',
                color: 'red',
              }}>
              {loan_data.length}
              <Text style={{color: '#c7c7c7', fontSize: 15}}>PCS</Text>
            </Text>
          </View>
        </View>

        <View
          style={{
            width: 250,
            height: 200,
            borderRadius: 10,
            backgroundColor: '#46578D',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            padding: 10,
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              color: '#fff',
              padding: 5,
            }}>
            Amount of new loan Applications
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                fontSize: 25,
                textAlign: 'right',
                color: '#73DEF7',
              }}>
              {formattedPrice}{' '}
              <Text style={{color: '#c7c7c7', fontSize: 15}}>MMK</Text>
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Text
          style={{
            marginLeft: 10,
            color: '#8B92AD',
            fontWeight: 'bold',
            fontSize: 17,
          }}>
          Today New Application
        </Text>

        <Text
          style={{
            marginRight: 10,
            fontSize: 17,
            color: 'red',
          }}>
          {loan_data.length}
          <Text style={{color: '#c7c7c7', fontSize: 17}}>Pcs</Text>
        </Text>
      </View>

      <Viewloan loan_data={loan_data} navigation={navigation} />
    </View>
  );
}
