import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect, createRef } from 'react';
import { style } from '../../style/Relation_style';
import { List } from 'react-native-paper';
import { reduxForm, Field, change, reset } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import moment from 'moment';
function Edit_Relation_Contract(props) {
  const {
    coborrower_sign_path,
    show_coborrower_sign,
    show_borrower_sign,
    borrower_sign_path,
    setCanvas,
    show_canvas,
    setCoBorrowerCanvas,
    show_co_borrower_canvas,
    btnShowBorrowerSign,
    relation_update_status,
    relation_name,
    retrive_relation_data
  } = props;
  console.log('retrive_relation_data', retrive_relation_data);
  const queryParam = `?timestamp=${Date.now()}`;

  const [relation_contract_expanded, setRelationContractExpanded] =
    useState(true);
  const handleRelationContractToggle = () => {
    setRelationContractExpanded(!relation_contract_expanded);
  };
  return (
    <>
      <List.Accordion
        expanded={relation_contract_expanded}
        onPress={handleRelationContractToggle}
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
              My Name<Text style={{ color: '#A1B5DC' }}>{retrive_relation_data.borrower_name} , address,</Text>
              <Text style={{ color: '#A1B5DC' }}>{retrive_relation_data.addr}{'\n'}</Text>
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              holding egistration number
              <Text style={{ color: '#A1B5DC' }}>{retrive_relation_data.resident_rgst_id}{'\n'}</Text>
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              and the Co-borrower
              <Text style={{ color: '#A1B5DC' }}>{retrive_relation_data.co_brwer_name},{'\n'}</Text>
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              Register Number
              <Text style={{ color: '#A1B5DC' }}>{retrive_relation_data.co_brwer_rgst_id},{'\n'}</Text>
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              are promise to be directly related in the following form
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
              margin: 10,
            }}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                  Borrower Name
                </Text>
                <Text style={{ color: '#A1B5DC', fontSize: 18, marginLeft: 10 }}>
                  {retrive_relation_data.borrower_name}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                  {t('Date')}
                </Text>
                  <Text style={{ color: '#A1B5DC', fontSize: 18, marginLeft: 10 }}>{moment().format('YYYY-MM-DD')}</Text>

              </View>
            </View>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Sign</Text>

              {borrower_sign_path == '' && show_borrower_sign == '' ? (
                <TouchableOpacity
                  onPress={() =>
                    relation_update_status == true
                      ? setCanvas(!show_canvas)
                      : ''
                  }>
                  <Image
                    source={require('../../../assets/images/default-sign.png')}
                    style={{ width: 100, height: 50 }}
                  />
                </TouchableOpacity>
              ) : borrower_sign_path && show_borrower_sign == '' ? (
                <TouchableOpacity
                  onPress={() =>
                    relation_update_status == true && setCanvas(!show_canvas)
                  }>
                  <Image
                    source={{
                      uri: `file:///storage/emulated/0/Pictures/Signature/${borrower_sign_path}${queryParam}`,
                    }}
                    style={{ width: 100, height: 50 }}
                  />
                </TouchableOpacity>
              ) : (
                show_borrower_sign &&
                borrower_sign_path && (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true && setCanvas(!show_canvas)
                    }>
                    <Image
                      source={{
                        uri: `data:image/png;base64,${show_borrower_sign}`,
                      }}
                      style={{ width: 100, height: 50 }}
                    />
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
              margin: 10,
            }}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                  {t("Co Borrower Name")}
                </Text>
                <Text style={{ color: '#A1B5DC', fontSize: 18, marginLeft: 10 }}>
                  {retrive_relation_data.co_brwer_name
                  }
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                  {t('Date')}
                </Text>
                <Text style={{ color: '#A1B5DC', fontSize: 18, marginLeft: 10 }}>{moment().format('YYYY-MM-DD')}</Text>
              </View>
            </View>

            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Sign</Text>

              {coborrower_sign_path == '' && show_coborrower_sign == '' ? (
                <TouchableOpacity
                  onPress={() =>
                    relation_update_status == true
                      ? setCoBorrowerCanvas(!show_co_borrower_canvas)
                      : ''
                  }>
                  <Image
                    source={require('../../../assets/images/default-sign.png')}
                    style={{ width: 100, height: 50 }}
                  />
                </TouchableOpacity>
              ) : coborrower_sign_path && show_coborrower_sign == '' ? (
                <TouchableOpacity
                  onPress={() =>
                    relation_update_status == true && setCoBorrowerCanvas(!show_co_borrower_canvas)
                  }>
                  <Image
                    source={{
                      uri: `file:///storage/emulated/0/Pictures/Signature/${coborrower_sign_path}${queryParam}`,
                    }}
                    style={{ width: 100, height: 50 }}
                  />
                </TouchableOpacity>
              ) : (
                show_coborrower_sign &&
                coborrower_sign_path && (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true && setCoBorrowerCanvas(!show_co_borrower_canvas)
                    }>
                    <Image
                      source={{
                        uri: `data:image/png;base64,${show_coborrower_sign}`,
                      }}
                      style={{ width: 100, height: 50 }}
                    />
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
            The co-borrower is responsible for repaying the loan if it fails to
            do so.{'\n'}
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
            The above-mentioned borrower and co-borrower are responsible for
            compliance with the terms and conditions of the contract by
            confirming that the above-mentioned{'\n'}{' '}
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
            {relation_name} relationship is correct
          </Text>
        </View>
      </List.Accordion>
    </>
  );
}

function mapStateToProps(state) {
  return {
    relation_update_status: state.loan.relation_update_status,
  };
}

export default reduxForm({
  form: 'Edit_Relation_Form',
  // validate,
})(connect(mapStateToProps, {})(Edit_Relation_Contract));
