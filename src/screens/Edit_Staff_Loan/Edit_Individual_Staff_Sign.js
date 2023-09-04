import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { reduxForm, } from 'redux-form';
import { connect, } from 'react-redux';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

function Edit_Individual_Staff_Sign(props) {
  const {
    coborrower_sign_path,
    show_coborrower_sign,
    show_borrower_sign,
    borrower_sign_path,
    setCanvas,
    show_canvas,
    setCoBorrowerCanvas,
    show_co_borrower_canvas,
    update_status,
    borrower_name,
    coborrower_name
  } = props;
  const {t} = useTranslation();

  const queryParam = `?timestamp=${Date.now()}`;
  return (
    <>
      <View style={{ flex: 1, padding: 5, margin: 20 }}>
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
                {t("Borrower Name")}
              </Text>
              <Text style={{ color: '#A1B5DC', fontSize: 18, marginLeft: 10 }}>
                {borrower_name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                Date
              </Text>
              <Text style={{ color: '#A1B5DC', fontSize: 18, marginLeft: 10 }}>
                <Text> {moment().format('YYYY-MM-DD')}</Text>
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Sign</Text>
            {borrower_sign_path == null && (

                <TouchableOpacity
                  onPress={() =>
                    update_status == true && setCanvas(!show_canvas)
                  }>
                  <Image
                    source={require('../../../assets/images/default-sign.png')}
                    style={{ width: 100, height: 50 }}
                  />
                </TouchableOpacity>
            )}
            {borrower_sign_path ? (
              <TouchableOpacity
                onPress={() =>
                  update_status == true && setCanvas(!show_canvas)
                }>
                <Image
                  source={{ uri: `file://${borrower_sign_path}${queryParam}` }}
                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>
            ) : (
              show_borrower_sign !== '' && (
                <TouchableOpacity onPress={() => setCanvas(!show_canvas)}>
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
                {coborrower_name}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                {t('Date')}
              </Text>
              <Text style={{ color: '#A1B5DC', fontSize: 18, marginLeft: 10 }}>
                <Text> {moment().format('YYYY-MM-DD')}</Text>
              </Text>
            </View>
          </View>

          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Sign1</Text>
            {coborrower_sign_path == null && (

              <TouchableOpacity
                onPress={() =>
                  update_status == true &&
                  setCoBorrowerCanvas(!show_co_borrower_canvas)
                }>
                <Image
                  source={require('../../../assets/images/default-sign.png')}
                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>

            )}
            {coborrower_sign_path ? (

              <TouchableOpacity
                onPress={() =>
                  update_status == true &&
                  setCoBorrowerCanvas(!show_co_borrower_canvas)
                }>
                <Image
                  source={{ uri: `file://${coborrower_sign_path}${queryParam}` }}
                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>

            ) : (
              show_coborrower_sign !== '' && (

                <TouchableOpacity onPress={() => setCanvas(!show_canvas)}>
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
      </View>
    </>
  );
}
function mapStateToProps(state) {
  return {
    update_status: state.loan.staff_loan_update_status,
  };
}

export default reduxForm({
  form: 'Edit_Individual_Staff_Loan_Form',
  // validate,
})(connect(mapStateToProps, {})(Edit_Individual_Staff_Sign));
