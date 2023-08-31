import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
export default function Individual_Staff_Sign(props) {
  const {
    coborrower_sign_path,
    show_coborrower_sign,
    show_borrower_sign,
    borrower_sign_path,
    setCanvas,
    show_canvas,
    setCoBorrowerCanvas,
    show_co_borrower_canvas,
    borrower_name,
    coborrower_name
  } = props;
  const { t } = useTranslation();
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
                {t('Borrower Name')}
              </Text>
              <Text style={{ color: '#A1B5DC', fontSize: 18, marginLeft: 10 }}>
                {borrower_name}
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
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Sign</Text>
            {borrower_sign_path ? (
              <TouchableOpacity onPress={() => setCanvas(!show_canvas)}>
                <Image
                  source={{ uri: `data:image/png;base64,${show_borrower_sign}` }}
                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setCanvas(!show_canvas)}>
                <Image
                  source={require('../../../assets/images/default-sign.png')}
                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>
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
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Sign</Text>
            {show_coborrower_sign == '' && (
              <TouchableOpacity
                onPress={() => setCoBorrowerCanvas(!show_co_borrower_canvas)}>
                <Image
                  source={{
                    uri: `https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png`,
                  }}
                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>
            )}
            {coborrower_sign_path !== '' && (
              <TouchableOpacity
                onPress={() => setCoBorrowerCanvas(!show_co_borrower_canvas)}>
                <Image
                  source={{
                    uri: `data:image/png;base64,${show_coborrower_sign}`,
                  }}
                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  );
}
