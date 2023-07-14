import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { style } from '../../style/Group_Loan_style';
import { List, Button } from 'react-native-paper';
export default function Edit_Group_Loan_List(props) {
  const [Grouplist_expand, setGroupListExpand] = useState(true);
  const { inquiry_group_data, navigation, all_loan } = props;
  console.log('all_loan', all_loan);

  const handleGroupListToggle = () => {
    setGroupListExpand(!Grouplist_expand);
  };
  const p_type = 30;

  return (
    <>
      <List.Accordion
        expanded={Grouplist_expand}
        onPress={handleGroupListToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="List of loan application by Group Memebers">
        <View style={style.sub_container}>
          <Button
            onPress={() => {
              navigation.navigate(
                'Individual_loan',
                { inquiry_group_data: inquiry_group_data.group_aplc_no, p_type }
              );
            }}
            mode="contained"
            buttonColor={'#6870C3'}
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
          {/* show loan data */}
          {all_loan.map((val, index) => {
            console.log('val', val);
            return (
              <TouchableOpacity key={index} >
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      padding: 10,
                      flex: 1,
                    }}>
                    {index + 1}
                  </Text>
                  <Text
                    style={{
                      padding: 10,
                      flex: 1,
                    }}>
                    {val.product_type}
                  </Text>
                  <Text
                    style={{
                      padding: 10,
                      flex: 1,
                    }}>
                    {val.application_no}
                  </Text>
                  <Text
                    style={{
                      padding: 10,
                      flex: 1,
                    }}>
                    {val.borrower_name}
                  </Text>
                  <Text
                    style={{
                      padding: 10,
                      flex: 1,
                    }}>
                    {val.application_amt}
                  </Text>
                  <Text
                    style={{
                      padding: 10,
                      flex: 1,
                    }}>
                    {val.sync_sts}
                  </Text>

                </View>
              </TouchableOpacity>
            )

          })}

        </View>
      </List.Accordion>
    </>
  );
}
