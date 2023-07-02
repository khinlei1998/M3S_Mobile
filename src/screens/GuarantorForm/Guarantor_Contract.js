import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {List} from 'react-native-paper';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {style} from '../../style/Guarantor_style';
export default function Guarantor_Contract(props) {
  const {retrive_loan_data,guarantor_name} = props;
  const [guarantor_Contract_expanded, setGuarantorContractExpand] =
    useState(true);
  const handleGuarantorContractToggle = () => {
    setGuarantorContractExpand(!guarantor_Contract_expanded);
  };
  return (
    <>
      <List.Accordion
        expanded={guarantor_Contract_expanded}
        onPress={handleGuarantorContractToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Contract">
        <View style={style.sub_container}>
          <View
            style={{
              flexDirection: 'column',
              padding: 5,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold'}}>
              I am <Text style={{color: '#A1B5DC'}}>{guarantor_name} ,</Text>Guarantee for{' '}
              <Text style={{color: '#A1B5DC'}}>
                {retrive_loan_data.borrower_name} {'\n'}
              </Text>
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              NRC No{' '}
              <Text style={{color: '#A1B5DC'}}>
                {retrive_loan_data.resident_rgst_id} {'\n'}
              </Text>
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              who whithdrawl the individual loan amount
              <Text style={{color: '#A1B5DC'}}>
                {retrive_loan_data.application_amt} {'\n'}
              </Text>
            </Text>
          </View>
        </View>
      </List.Accordion>
    </>
  );
}
