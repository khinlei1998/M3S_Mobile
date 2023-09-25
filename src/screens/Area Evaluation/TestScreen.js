import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import RNImageTools from 'react-native-image-tools';
import PhotoEditor from '@baronha/react-native-photo-editor';

export default function TestScreen() {
  useEffect(() => {
    console.log('hello');
    // const hasPermission = await RNImageTools.checkImageLibraryPermission();
    // console.log('hasPermission',hasPermission);
    // if (!hasPermission) {
    //     await RNImageTools.requestImageLibraryPermission();
    // }
  }, []);

  const callfun = async () => {
    try {
      const remoteURL =
        'https://images.unsplash.com/photo-1634915728822-5ad85582837a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80';
      await PhotoEditor.open({
        path: remoteURL,
        stickers: [],
      });

      //   const selected = await RNImageTools.selectImage({});

      //   console.log('chosen image', selected);

      // const uri = selected.uri;

      // this.setState({
      //   originalImageUri: uri,
      //   editedImageUri: null,
      //   selectedImage: uri
      // });
    } catch (e) {
      console.log('cancelled', e);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={() => callfun()}>
        <Text>TestScreen</Text>
      </TouchableOpacity>
    </View>
  );
}
