import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { style } from '../../style/Individual_Loan_style';
import { useTranslation } from 'react-i18next';

export default function Borrower_Contract() {
  const { t, } = useTranslation();
  const [borrower_contract_expanded, setBorrowerContractExpanded] =
    useState(true);

  const handleBorrowerMapToggle = () => {
    setBorrowerContractExpanded(!borrower_contract_expanded);
  };
  return (
    <List.Accordion
      expanded={borrower_contract_expanded}
      onPress={handleBorrowerMapToggle}
      style={style.list_container}
      titleStyle={style.list_title}
      title="Contract">
      <View style={style.sub_container}>
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
          {t("The individual loan borrower undertakes to keep the ownership of assets mentioned in above page No (1) without selling, mortgage or transferring to any person to ensure the repayment of guarantee group loan which would be granted by the Company.")}
        </Text>
        <Text style={{ marginTop: 2 }} />
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
          {t("The individual loan borrower guarantees for the provided personal information, property ownership and other attached documents. The individual loan borrower undertakes to accept the legal action taken by the Company against the Group either under the applicable criminal law or civil law or both if the Company finds out incorrect facts,data and information relevant to the guarantee group loan and documents provided by the Group to the Company.")}
        </Text>
        <Text style={{ marginTop: 2 }} />
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
          {t("I, individual loan borrower put thumbprints below, to express that the Borrower shall be abided by the above conditions, with our free consent and without seduction and undue influence of any person.")}
        </Text>
        <Text style={{ marginTop: 2 }} />
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
          {t("The individual loan borrower undertakes to accept the legal action taken by the Company against the borrower either under the applicable criminal law or civil law or both if the borrower fails to repay the loan in accordance with the guideline of the Company and terms and conditions of the Guarantee Individual Loan Contract.")}
        </Text>
        <Text style={{ marginTop: 2 }} />
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
          {t("If Shinhan Microfinance Co., ltd observed that fake documents, the borrower agrees that the borrower shall repay all of its indebtedness of the company, including the principle, the interest.")}
        </Text>
        <Text style={{ marginTop: 2 }} />
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
          {t("I, the individual loan borrower put thumbprints below, to express that the borrower shall be abided by the above conditions, with my free consent and without seduction and undue influence of any person.")}
        </Text>
      </View>
    </List.Accordion>
  );
}
