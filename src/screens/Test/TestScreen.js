import React ,{useState}from 'react';
import { View, Text, StyleSheet, Image, } from 'react-native';
import { Button } from 'react-native-paper';
import PhotoEditor from 'react-native-photo-editor'
import RNFS from 'react-native-fs';
export function TestScreen() {
  const viewComponent = () => <View style={styles.cornerStyles} />;
  const [queryParam, setQueryTime] = useState()

  const test = (path) => {
    PhotoEditor.Edit({
      path: "/storage/emulated/0/Pictures/Camera/1.jpg",
      onDone: async (oldFilePath) => {
        try {
          const directoryPath = '/storage/emulated/0/Pictures/PhotoEditorSDK/';
          const newFilePath = `${directoryPath}3.jpg`;

          // Check if the destination directory exists, create it if not
          await RNFS.mkdir(directoryPath);

          // Copy the image file to the specified directory with the new file name
          await RNFS.copyFile(oldFilePath, newFilePath);

          // Remove the original file if the copy is successful
          await RNFS.unlink(oldFilePath);
          setQueryTime(`?timestamp=${Date.now()}`)

          console.log(`Image file name overridden successfully`);
        } catch (error) {
          console.error('Error overriding image file name:', error);
        }
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
        Open
      </Button>
      <Image
        source={{ uri: `file:///storage/emulated/0/Pictures/PhotoEditorSDK/3.jpg${queryParam}` }}
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
