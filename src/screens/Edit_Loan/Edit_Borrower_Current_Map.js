import { View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { style } from '../../style/Individual_Loan_style';
import { reduxForm, } from 'redux-form';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

function Borrower_Current_Map(props) {
  const { navigation, map, borrower_map, update_status, retrive_loan_data } =
    props;
  const [borrower_map_expanded, setBorrowerMapExpanded] = useState(true);
  const handleBorrowerMapToggle = () => {
    setBorrowerMapExpanded(!borrower_map_expanded);
  };
  const queryParam = `?timestamp=${Date.now()}`;
  const { t } = useTranslation();
  return (
    <List.Accordion
      expanded={borrower_map_expanded}
      onPress={handleBorrowerMapToggle}
      style={style.list_container}
      titleStyle={style.list_title}
      title={t("Borrower current Home Map")}>
      <View style={style.sub_container}>
        <TouchableOpacity
          onPress={() =>
            update_status == true
              ? navigation.navigate('Edit Borrower Map', { application_no: retrive_loan_data.application_no })
              : ''
          }>
          {map ? (
            <Image
              source={{
                uri: `file://${map}`,
              }}
              style={{ height: 400 }}
              resizeMode="contain"
            />
          ) : borrower_map ? (
            <Image
              source={{
                uri: `file://${borrower_map}${queryParam}`,
              }}
              style={{ width: '100%', height: 400 }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require('../../../assets/images/default-sign.png')}
              style={{ width: '100%', height: 200 }}
            />
          )}
        </TouchableOpacity>
      </View>
    </List.Accordion>
  );
}
function mapStateToProps(state) {
  return {
    map: state.loan.borrower_map_path,
    update_status: state.loan.update_status,
    retrive_loan_data: state.loan.edit_loandata,

  };
}

export default reduxForm({
  form: 'Edit_Individual_Loan_Form',
  // validate,
})(connect(mapStateToProps, {})(Borrower_Current_Map));
