import React, { useRef, useState, useEffect } from 'react';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
// import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
// import RNFS from 'react-native-fs';
import RNFS from 'react-native-fs';

import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    TextInput,
    PanResponder,
    Image,
    PermissionsAndroid
} from 'react-native';

export default function Sign1() {
    useEffect(() => {
        requestStoragePermission();
    }, []);

    const requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            ]);

            if (
                granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
                granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
            ) {
                console.log('Storage permissions granted');
            } else {
                console.log('Storage permissions denied');
            }
        } catch (error) {
            console.warn('Error requesting storage permissions:', error);
        }
    };
    const sketchRef = useRef();
    const isDarkMode = useColorScheme() === 'dark';
    const handleSave = async () => {
        console.log('sketchRef.current', sketchRef.current);
        if (sketchRef.current) {
            var imageData; // Image data obtained from somewhere

            // Generate a unique file name
            const fileName = `image_${Date.now()}.jpg`;

            // Define the file path where the image will be saved
            const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
            await RNFS.writeFile(filePath, imageData, 'base64');
            console.log('filePath', filePath);
            try {
                const result = await sketchRef.current.save(

                );
                console.log('Save successful:', result);
            } catch (error) {
                console.error('Save failed:', error);
            }
        }
    };

  
    const handleTouchMove = (x, y) => {
        const canvasWidth = 600; // Specify your desired canvas width
        const canvasHeight = 400; // Specify your desired canvas height

        if (x >= 0 && x <= canvasWidth && y >= 0 && y <= canvasHeight) {
            // Inside the canvas boundaries, allow drawing
            sketchRef.current.addPath({ x, y });
        }
    };

    return (

        // <View style={styles.container}>
        //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //         <RNSketchCanvas
        //             onStrokeStart={({ nativeEvent }) => handleTouchMove(nativeEvent.locationX, nativeEvent.locationY)}
        //             onStrokeChanged={({ nativeEvent }) => handleTouchMove(nativeEvent.locationX, nativeEvent.locationY)}
        //             ref={sketchRef}
        //             containerStyle={{ backgroundColor: 'transparent',width: 600, height: 400, }}
        //             canvasStyle={{ backgroundColor: 'transparent', width: 600, height: 400, }}
        //             defaultStrokeIndex={0}
        //             defaultStrokeWidth={5}
        //             closeComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Close</Text></View>}
        //             undoComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Undo</Text></View>}
        //             clearComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Clear</Text></View>}
        //             eraseComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Eraser</Text></View>}
        //             onPathsChange={(pathsCount) => {
        //                 console.log('pathsCount', pathsCount)
        //             }}
        //             saveComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Save</Text></View>}
        //             savePreference={() => {
        //                 return {
        //                     folder: "Test1",
        //                     filename: String(Math.ceil(Math.random() * 100000000)),
        //                     transparent: false,
        //                     imageType: "png"
        //                 }
        //             }}
        //             promptForExternalWritePermissions={false}
        //             permissionDialogTitle="Message"
        //             permissionDialogMessage="Message"
        //             onSketchSaved={(success, path) => {
        //                 console.log('path', path);
        //                 console.log('success', success);
        //                 alert(success ? 'Image saved!' : 'Failed to save image!', path)
        //             }}

        //         />
        //         {/* <Image source={{ uri: 'file://storage/emulated/0/Pictures/RNSketchCanvas/5507324.png' }} style={{ width: 200, height: 200, }} /> */}
        //     </View>
        // </View>
        <View style={{  flex: 1,
            backgroundColor: 'red',}}>
        <SketchCanvas
          ref={sketchRef}
          style={{ flex: 1,
            backgroundColor: 'blue',
            width: 600,
            height: 400,}}
          strokeColor="#000000"
          strokeWidth={3}
          onStrokeStart={({ nativeEvent }) => handleTouchMove(nativeEvent.locationX, nativeEvent.locationY)}
          onStrokeChanged={({ nativeEvent }) => handleTouchMove(nativeEvent.locationX, nativeEvent.locationY)}
        />
      </View>
    );
};


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
        // width:600,height:300,
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
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
