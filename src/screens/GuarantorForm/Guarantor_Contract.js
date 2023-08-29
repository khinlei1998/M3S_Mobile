import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { style } from '../../style/Guarantor_style';
import { useTranslation } from 'react-i18next';
export default function Guarantor_Contract(props) {
  const { t, i18n } = useTranslation();

  const { retrive_loan_data, guarantor_name } = props;
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
            <Text style={{ fontWeight: 'bold' }}>
              {t("I am")} <Text style={{ color: '#A1B5DC' }}>{guarantor_name} ,</Text>{t("Guarantee for")}{' '}
              <Text style={{ color: '#A1B5DC' }}>
                {retrive_loan_data.borrower_name} {'\n'}
              </Text>
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              {t("NRC No")}{' '}
              <Text style={{ color: '#A1B5DC' }}>
                {retrive_loan_data.resident_rgst_id} {'\n'}
              </Text>
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              {t("who withdraw the individual loan amount")}
              <Text style={{ color: '#A1B5DC' }}>
                {retrive_loan_data.application_amt} {'\n'}
              </Text>
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              , {t("from Shinhan Microfinance Co., ltd on")}
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              {t("Anyhow, if the borrower lacked to pay loan principal and interest to Shinhan Microfinance Co., ltd, I guarantee to pay all loan principal and interest to Shinhan Microfinance Co., ltd on behalf of borrower as per repayment schedule.")}
            </Text>
          </View>
        </View>
      </List.Accordion>
    </>
  );
}
