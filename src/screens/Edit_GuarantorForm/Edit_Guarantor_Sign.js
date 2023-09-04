import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { reduxForm, } from 'redux-form';
import { connect, } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

function Edit_Guarantor_Sign(props) {
  const {
    show_borrower_sign,
    borrower_sign_path,
    setCanvas,
    show_canvas,
    guarantor_name,
    guarantor_update_status,
    retrive_guarantor_data
  } = props;
  const queryParam = `?timestamp=${Date.now()}`;
  const { t } = useTranslation();
  const btnShowBorrowerSign = () => {
    setCanvas(!show_canvas);
  };
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
                {t('Guarantor Name')}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: '#A1B5DC',
                  marginLeft: 10,
                }}>
                {guarantor_name}
              </Text>
            </View>
            <Text>{moment(retrive_guarantor_data.create_datetime).format('YYYY-MM-DD')}</Text>
          </View>

          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Sign</Text>
            {borrower_sign_path == '' && show_borrower_sign == '' ? (
              <TouchableOpacity
                onPress={() =>
                  guarantor_update_status == true ? setCanvas(!show_canvas) : ''
                }>
                <Image
                  source={require('../../../assets/images/default-sign.png')}
                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>
            ) : borrower_sign_path && show_borrower_sign == '' ? (
              <TouchableOpacity
                onPress={() =>
                  guarantor_update_status == true && btnShowBorrowerSign()
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
                    guarantor_update_status == true && setCanvas(!show_canvas)
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
      </View>
    </>
  );
}
function mapStateToProps(state) {
  return {
    guarantor_update_status: state.loan.gurantor_update_status,
  };
}

export default reduxForm({
  form: 'Edit_Guarantor_Form',
})(connect(mapStateToProps, {})(Edit_Guarantor_Sign));
