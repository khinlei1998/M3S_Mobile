import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import { Button } from 'react-native-paper';

export default function Borrower_Sign(props) {
  const { coborrower_sign_path,show_coborrower_sign,show_borrower_sign, borrower_sign_path, setCanvas, show_canvas, showCanvas, navigation, filePath, setCoBorrowerCanvas, co_borrower_filePath, show_co_borrower_canvas } = props;
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
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
              Borrower Name
            </Text>
            <Text> Date 17/05/2023</Text>
          </View>
          {/* <Text>{borrower_sign_path}</Text> */}

          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Sign</Text>
            {show_borrower_sign == '' && (
              <TouchableOpacity onPress={() => setCanvas(!show_canvas)}>
                <Image
                  source={{
                    uri: ` /storage/emulated/0/Android/data/com.m3smobile/files/saved_signature/signature.png`,
                  }}
                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>
            )}
            {borrower_sign_path !== '' && (
              <TouchableOpacity onPress={() => setCanvas(!show_canvas)}>
                <Image
                  // source={{uri: `file://${borrower_sign_path}`}}
                  source={{ uri: `data:image/png;base64,${show_borrower_sign}` }}

                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>
            )}
            {/* <View style={{width: 300, height: 300,backgroundColor:'red'}}>
            <SketchCanvas
              style={{flex: 1}}
              strokeColor="#000000"
              strokeWidth={3}
            />
          </View> */}
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
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
              Co Borrower Name
            </Text>
            <Text> Date 17/05/2023</Text>
          </View>

          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Sign</Text>
            {show_coborrower_sign == '' && (
              <TouchableOpacity onPress={() => setCoBorrowerCanvas(!show_co_borrower_canvas)}>
                <Image
                  source={{
                    uri: `https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png`,
                  }}
                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>
            )}
            {coborrower_sign_path !== '' && (
              <TouchableOpacity onPress={() => setCoBorrowerCanvas(!show_co_borrower_canvas)}>
                {/* <Image
                  source={{uri: `file://${co_borrower_filePath}`}}
                  style={{width: 100, height: 50}}
                /> */}
                <Image
                  // source={{uri: `file://${borrower_sign_path}`}}
                  source={{ uri: `data:image/png;base64,${show_coborrower_sign}` }}

                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>
            )}
            {/* <View style={{width: 300, height: 300,backgroundColor:'red'}}>
            <SketchCanvas
              style={{flex: 1}}
              strokeColor="#000000"
              strokeWidth={3}
            />
          </View> */}
          </View>
        </View>
      </View>
    </>
  );
}
