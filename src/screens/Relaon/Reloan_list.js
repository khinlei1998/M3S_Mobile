import { View, Text, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { List, Button } from 'react-native-paper';
import { style } from '../../style/Cover_Loan_style';

export default function Reloan_list() {
  const [Reloanlist_expand, setReloanListExpand] = useState(true);

  const handleReloanListToggle = () => {
    setReloanListExpand(!Coverlist_expand);
  };
  return (
    <>
      <List.Accordion
        expanded={Reloanlist_expand}
        onPress={handleReloanListToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="List of loan application by Group Memebers">
        <View style={style.sub_container}>
          <Button
            onPress={() => ToastAndroid.show(
              'You have to save application First!',
              ToastAndroid.SHORT,
            )}
            mode="contained"
            buttonColor={'#21316C'}
            style={{
              width: 300,
              borderRadius: 0,
              marginTop: 10,
              color: 'black',
              borderRadius: 5,
              padding: 5,
            }}>
            INDIVIDUAL LOAN APPLICATION
          </Button>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#D7D8DC',
              borderRadius: 5,
              padding: 5,
              margin: 10,
            }}>
            <Text
              style={{
                padding: 10,
                flex: 1,
                fontWeight: 'bold',
              }}>
              #
            </Text>
            <Text
              style={{
                flex: 1,

                padding: 10,
                fontWeight: 'bold',
              }}>
              Loan Type
            </Text>
            <Text
              style={{
                flex: 1,

                padding: 10,
                fontWeight: 'bold',
              }}>
              Application No
            </Text>
            <Text
              style={{
                flex: 1,

                padding: 10,
                fontWeight: 'bold',
              }}>
              Borrower Name
            </Text>

            <Text
              style={{
                flex: 1,

                padding: 10,
                fontWeight: 'bold',
              }}>
              Application amount
            </Text>

            <Text
              style={{
                flex: 1,

                padding: 10,
                fontWeight: 'bold',
              }}>
              Sync
            </Text>
          </View>
        </View>
      </List.Accordion>
    </>
  );
}