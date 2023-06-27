import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useRef, useState} from 'react';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';

export default function Show_Borrower_Map() {
  const [paths, setPaths] = useState([]);

  const sketchRef = useRef(null);
  const handleSave = async () => {
    const base64ImageData = sketchRef.current.getBase64(
      'png',
      'transparent',
      'includeImage',
      'includeText',
      false,
      (err, image) => {
        console.log('image', image);
      },
    );
  };
  const handleEdit = () => {
    // sketchRef.current.updateCanvas();
  };
  const handleStrokeEnd = path => {};

  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#F5FCFF',
    //   }}>
    //   <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //     <RNSketchCanvas
    //       ref={sketchRef}
    //       containerStyle={{backgroundColor: 'transparent', flex: 1}}
    //       canvasStyle={{backgroundColor: 'transparent', flex: 1}}
    //       defaultStrokeIndex={0}
    //       defaultStrokeWidth={5}
    //       closeComponent={
    //         <View
    //           style={{
    //             marginHorizontal: 2.5,
    //             marginVertical: 8,
    //             height: 30,
    //             width: 60,
    //             backgroundColor: '#39579A',
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             borderRadius: 5,
    //           }}>
    //           <Text style={{color: 'white'}}>Close</Text>
    //         </View>
    //       }
    //       undoComponent={
    //         <View
    //           style={{
    //             marginHorizontal: 2.5,
    //             marginVertical: 8,
    //             height: 30,
    //             width: 60,
    //             backgroundColor: '#39579A',
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             borderRadius: 5,
    //           }}>
    //           <Text style={{color: 'white'}}>Undo</Text>
    //         </View>
    //       }
    //       clearComponent={
    //         <View
    //           style={{
    //             marginHorizontal: 2.5,
    //             marginVertical: 8,
    //             height: 30,
    //             width: 60,
    //             backgroundColor: '#39579A',
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             borderRadius: 5,
    //           }}>
    //           <Text style={{color: 'white'}}>Clear</Text>
    //         </View>
    //       }
    //       eraseComponent={
    //         <View
    //           style={{
    //             marginHorizontal: 2.5,
    //             marginVertical: 8,
    //             height: 30,
    //             width: 60,
    //             backgroundColor: '#39579A',
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             borderRadius: 5,
    //           }}>
    //           <Text style={{color: 'white'}}>Eraser</Text>
    //         </View>
    //       }
    //       strokeComponent={color => (
    //         <View
    //           style={{
    //             marginHorizontal: 2.5,
    //             marginVertical: 8,
    //             width: 30,
    //             height: 30,
    //             borderRadius: 15,
    //             backgroundColor: color,
    //           }}
    //         />
    //       )}
    //       strokeSelectedComponent={(color, index, changed) => {
    //         return (
    //           <View
    //             style={{
    //               backgroundColor: color,
    //               borderWidth: 2,
    //               marginHorizontal: 2.5,
    //               marginVertical: 8,
    //               width: 30,
    //               height: 30,
    //               borderRadius: 15,
    //             }}
    //           />
    //         );
    //       }}
    //       strokeWidthComponent={w => {
    //         return (
    //           <View
    //             style={{
    //               marginHorizontal: 2.5,
    //               marginVertical: 8,
    //               width: 30,
    //               height: 30,
    //               borderRadius: 15,
    //               justifyContent: 'center',
    //               alignItems: 'center',
    //               backgroundColor: '#39579A',
    //             }}>
    //             <View
    //               style={{
    //                 backgroundColor: 'white',
    //                 marginHorizontal: 2.5,
    //                 width: Math.sqrt(w / 3) * 10,
    //                 height: Math.sqrt(w / 3) * 10,
    //                 borderRadius: (Math.sqrt(w / 3) * 10) / 2,
    //               }}
    //             />
    //           </View>
    //         );
    //       }}
    //       saveComponent={
    //         <View
    //           style={{
    //             marginHorizontal: 2.5,
    //             marginVertical: 8,
    //             height: 30,
    //             width: 60,
    //             backgroundColor: '#39579A',
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             borderRadius: 5,
    //           }}>
    //           <Text style={{color: 'white'}}>Save</Text>
    //         </View>
    //       }
    //       onSketchSaved={(success, filePath) => {
    //         console.log('filePath',filePath);
    //       }}
    //       savePreference={async() => {

    //         // return {
    //         //   folder: 'RNSketchCanvas',
    //         //   filename: String(Math.ceil(Math.random() * 100000000)),
    //         //   transparent: false,
    //         //   imageType: 'png',
    //         // };
    //       }}
    //     />
    //     {/* <Image source={{ uri: 'file://storage/emulated/0/Pictures/RNSketchCanvas/5507324.png' }} style={{ width: 200, height: 200, }} /> */}
    //   </View>
    // </View>
    <>
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <RNSketchCanvas
            ref={sketchRef}
            containerStyle={{backgroundColor: 'transparent', flex: 1}}
            canvasStyle={{backgroundColor: 'transparent', flex: 1}}
            defaultStrokeIndex={0}
            defaultStrokeWidth={5}
            closeComponent={
              <View style={styles.functionButton}>
                <Text style={{color: 'white'}}>Close</Text>
              </View>
            }
            undoComponent={
              <View style={styles.functionButton}>
                <Text style={{color: 'white'}}>Undo</Text>
              </View>
            }
            clearComponent={
              <View style={styles.functionButton}>
                <Text style={{color: 'white'}}>Clear</Text>
              </View>
            }
            eraseComponent={
              <View style={styles.functionButton}>
                <Text style={{color: 'white'}}>Eraser</Text>
              </View>
            }
            strokeComponent={color => (
              <View
                style={[{backgroundColor: color}, styles.strokeColorButton]}
              />
            )}
            onStrokeEnd={handleStrokeEnd}
            strokeSelectedComponent={(color, index, changed) => {
              return (
                <View
                  style={[
                    {backgroundColor: color, borderWidth: 2},
                    styles.strokeColorButton,
                  ]}
                />
              );
            }}
            strokeWidthComponent={w => {
              return (
                <View style={styles.strokeWidthButton}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      marginHorizontal: 2.5,
                      width: Math.sqrt(w / 3) * 10,
                      height: Math.sqrt(w / 3) * 10,
                      borderRadius: (Math.sqrt(w / 3) * 10) / 2,
                    }}
                  />
                </View>
              );
            }}
            // localSourceImage={{
            //   filename:
            //     '/storage/emulated/0/Pictures/RNSketchCanvas/2328567.png',
            //   directory: '', // The directory where the image is saved
            //   mode: 'ScaleToFill',
            // }}
            // saveComponent={
            //   <View style={styles.functionButton}>
            //     <Text style={{color: 'white'}}>Save</Text>
            //   </View>
            // }
            // savePreference={() => {
            //   return {
            //     folder: 'RNSketchCanvas',
            //     filename: String(Math.ceil(Math.random() * 100000000)),
            //     transparent: false,
            //     imageType: 'png',
            //   };
            // }}
            // onSketchSaved={(success, path) => {
            //   console.log('path', path);
            //   alert(success ? 'Image saved!' : 'Failed to save image!', path);
            // }}
          />
          <Button title="Savefff" onPress={handleSave} />
          <Button title="Edit" onPress={handleEdit} />
          {/* <View
          style={[
            styles.textInputContainer,
            {left: position.x, top: position.y},
          ]}
          {...panResponder.panHandlers}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={styles.textInput}
            placeholder="Type your text here"
          />
        </View> */}
        </View>
      </View>

      {/* <Image
        source={{uri: `file://path/storage/emulated/0/Pictures/RNSketchCanvas/2328567.png`}}
        style={{width: 400, height: 500}}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  textInputContainer: {
    position: 'absolute',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39579A',
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: '#39579A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
