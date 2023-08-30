import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { List, Button } from 'react-native-paper';
import { style } from '../../style/Cover_Loan_style';
import { loan_application_type } from '../../common';
import { addInquiryLoanData } from '../../redux/LoanReducer';
import { connect,  } from 'react-redux';
import { reduxForm, } from 'redux-form';
function Reloan_list(props) {
  const { reloan_update_status, navigation, inquiry_reloan, all_loan, addInquiryLoanData } = props;
  const [Reloanlist_expand, setReloanListExpand] = useState(true);
  const handleReloanListToggle = () => {
    setReloanListExpand(!Coverlist_expand);
  };
  const p_type = 50;
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
            disabled={reloan_update_status == true ? false : true}
            onPress={() => {
              navigation.navigate('Individual_loan', {
                inquiry_group_data: inquiry_reloan.group_aplc_no,
                p_type,
              });
            }}

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
          {/* show loan data */}
          {all_loan.map((val, index) => {
            const foundItem = loan_application_type.filter(
              data => data.value == val.product_type,
            );
            return (
              <TouchableOpacity key={index} onPress={() => {
                addInquiryLoanData(val);
                navigation.navigate('Edit_Individual_Loan');
              }}>
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
                    {foundItem[0].label}
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
            );
          })}
        </View>
      </List.Accordion>
    </>
  );
}
function mapStateToProps(state) {
  return {
    reloan_update_status: state.loan.reloan_update_status,
  };
}
export default reduxForm({
  form: 'Edit_Reloan_Form',
})(connect(mapStateToProps, { addInquiryLoanData })(Reloan_list));