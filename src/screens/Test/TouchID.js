import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import TouchID from 'react-native-touch-id';

export default function TouchTestID() {
  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };
  useEffect(() => {
    test();
  }, []);

  const test = () => {
    // TouchID.isSupported(optionalConfigObject)
    //   .then(biometryType => {
    //     console.log('biometryType',biometryType);
    //     // Success code
    //     if (biometryType === 'FaceID') {
    //       console.log('FaceID is supported.');
    //     } else {
    //       console.log('TouchID is supported.');
    //     }
    //   })
    //   .catch(error => {
    //     // Failure code
    //     console.log(error);
    //   });

    TouchID.authenticate(
      'to demo this react-native component',
      optionalConfigObject,
    )
      .then(success => {
        console.log('succ');
        // Success code
      })
      .catch(error => {
        console.log('oo',error);
        // Failure code
      });
  };

  return (
    <View>
      <Text>TouchID</Text>
    </View>
  );
}
