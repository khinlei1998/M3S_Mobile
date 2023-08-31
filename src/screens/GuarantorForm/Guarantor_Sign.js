import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

export default function Guarantor_Sign(props) {
  const {
    show_borrower_sign,
    borrower_sign_path,
    setCanvas,
    show_canvas,
    guarantor_name,
    guarantee_date
  } = props;
  const {t} = useTranslation();

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
              <Text style={{ color: '#A1B5DC', fontSize: 18,marginLeft:10 }}>
                {guarantor_name}
              </Text>


            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                {t('Date')}
              </Text>
              <Text style={{ color: '#A1B5DC', fontSize: 15,marginLeft:10 }}>
                {guarantee_date}
              </Text>


            </View>

          </View>


          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Sign</Text>
            {show_borrower_sign == '' && (
              <TouchableOpacity onPress={() => setCanvas(!show_canvas)}>
                <Image
                  source={{
                    uri: `https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png`,
                  }}
                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>
            )}
            {borrower_sign_path !== '' && (
              <TouchableOpacity onPress={() => setCanvas(!show_canvas)}>
                <Image
                  source={{ uri: `data:image/png;base64,${show_borrower_sign}` }}
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
