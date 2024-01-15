import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DragTextEditor} from 'react-native-drag-text-editor';
// import RNImageTools from 'react-native-image-tools';
import {Button} from 'react-native-paper';

export function TestScreen() {
  const viewComponent = () => <View style={styles.cornerStyles} />;

  const _cornerComponent = [
    {
      side: 'TR',
      customCornerComponent: () => viewComponent(),
    },
  ];

  const _rotateComponent = {
    side: 'bottom',
    customRotationComponent: () => viewComponent(),
  };

  // const test = async () => {
  //   try {
  //     const uri = await RNImageTools.openEditor({
  //       imageUri,
  //       outputFormat,
  //       quality,
  //       preserveMetadata,
  //       saveTo,
  //     });
  //   } catch (e) {
  //     console.warn('error', e);
  //   }
  // };

  const _resizerSnapPoints = ['right', 'left'];
  return (
    <DragTextEditor
      visible={true}
      resizerSnapPoints={_resizerSnapPoints}
      cornerComponents={_cornerComponent}
      rotationComponent={_rotateComponent}
      externalTextStyles={styles.textStyles}
      externalBorderStyles={styles.borderStyles}
    />

    // <Button
    //   onPress={() => test()}
    //   mode="contained"
    //   buttonColor={'#21316C'}
    //   style={{width: 150, height: 44}}>
    //   Save
    // </Button>
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
