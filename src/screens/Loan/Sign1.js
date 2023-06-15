import React, {useRef, useState, useEffect, createRef} from 'react';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
// import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
// import RNFS from 'react-native-fs';
import RNFS from 'react-native-fs';
import SignatureCapture from 'react-native-signature-capture';

import {
  TouchableHighlight,
  Text,
  View,
  Image,
  PermissionsAndroid,
} from 'react-native';

export default function Sign1() {
  const [imagepath, setImagePath] = useState('');
  const sign = createRef();

  const requestWriteStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Write Storage Permission',
          message:
            'App needs access to your device storage to save the signature image.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.log('Error requesting write storage permission:', error);
      return false;
    }
  };
  const _onSaveEvent = async result => {
    try {
      // Request write storage permission
      const granted = await requestWriteStoragePermission();

      if (granted) {
        // Get the base64-encoded image data from the result
        const imageData = result.encoded;

        // Generate a unique filename for the image
        const filename = `signature_${Date.now()}.jpg`;

        // Define the destination path in the app's internal storage
        const destinationPath = `${RNFS.DocumentDirectoryPath}/${filename}`;

        // Write the base64-encoded image data to the destination path
        await RNFS.writeFile(destinationPath, imageData, 'base64');
        console.log('destinationPath',destinationPath);
        // Set the image path for display
        setImagePath(destinationPath);
      } else {
        console.log('Write storage permission denied.');
      }
    } catch (error) {
      console.log('Error saving signature:', error);
    }
  };
  const _onDragEvent = () => {
    console.log('dragged');
  };
  const saveSign = async () => {
    // sign.current.saveImage();

    const pathName = await sign.current.saveImage();
    console.log('pathName', pathName);
  };

  const resetSign = () => {
    sign.current.resetImage();
  };
  return (
    <>
      <SignatureCapture
        style={{
          flex: 1,
        }}
        ref={sign}
        onSaveEvent={_onSaveEvent}
        onDragEvent={_onDragEvent}
        showNativeButtons={false}
        showTitleLabel={false}
        minStrokeWidth={10}
        maxStrokeWidth={10}
        // saveImageFileInExtStorage
        // backgroundColor="transparent"
        viewMode={'portrait'}
      />
      <View style={{flexDirection: 'row'}}>
        <TouchableHighlight
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            height: 50,
            backgroundColor: '#6870C3',
            margin: 10,
          }}
          onPress={() => {
            saveSign();
          }}>
          <Text style={{color: '#fff'}}>Save</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            height: 50,
            backgroundColor: '#6870C3',
            margin: 10,
          }}
          onPress={() => {
            resetSign();
          }}>
          <Text style={{color: '#fff'}}>Reset</Text>
        </TouchableHighlight>
      </View>

      {/* {imagepath ? ( */}
        <Image
          source={{uri: `file:///data/user/0/com.m3smobile/files/signature_1686830392093.jpg`}}
          style={{width: 200, height: 400}}
        />
      {/* ) : null} */}
    </>
  );
}
