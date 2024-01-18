import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import PhotoEditor from 'react-native-photo-editor'
import RNFS from 'react-native-fs';
export function TestScreen() {
  const viewComponent = () => <View style={styles.cornerStyles} />;

  const test = (path) => {
    let editingCancelled = false;
    PhotoEditor.Edit({
      path: "/storage/emulated/0/Pictures/Camera/2.jpg",
      onDone:async (image) => {
        console.log('image', image);
        const directory = '/storage/emulated/0/Pictures/Map/';
        const newPath = `/storage/emulated/0/Pictures/Map/1.jpg`; // You don't really need the `'file://` prefix
        console.log(newPath);
        await RNFS.mkdir(directory);
        // COPY the file
        // RNFS.copyFile(image, newPath)
        //   .then((success) => {
        //     console.log('IMG COPIED!');
        //     console.log(newPath);
        //   })
        //   .catch((err) => {
        //     console.log(err.message);
        //   });
        await RNFS.writeFile(filePath, image_encode, 'base64');

      },
      onCancel: (cancel) => {
        console.log('cancel', cancel);

      },
      hiddenControls: ['share', 'sticker', 'crop', 'cancel']
    });
  }
  return (

    <>
      <Button
        onPress={() => test()}
        mode="contained"
        buttonColor={'#21316C'}
        style={{ width: 150, height: 44 }}>
        Save
      </Button>
      <Image
        source={{ uri: `file:///storage/emulated/0/Pictures/PhotoEditorSDK/IMG_20240118_104913.jpg` }}
        style={{ width: 100, height: 100 }}
      />
    </>
  );
}
const styles = StyleSheet.create({
  borderStyles: {
    borderStyle: 'dashed',
    borderColor: 'gray',
  },
  textStyles: {
    color: '#000',
  },
  cornerStyles: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    borderColor: '#aaa',
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default TestScreen;
