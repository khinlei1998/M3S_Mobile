import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, SafeAreaView, ImageProcessing } from 'react-native'
import React, { useRef, useState } from 'react'
import { RNCamera, FaceDetector } from 'react-native-camera';
import { Button } from 'react-native-paper';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/Feather';
import BarcodeMask from 'react-native-barcode-mask';

export default function TestScreen() {
    const [isCameraReady, setIsCameraReady] = useState(false);
    const cameraRef = useRef(null);
    const PendingView = () => (
        <View
            style={{
                flex: 1,
                backgroundColor: 'lightgreen',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text>Waiting</Text>
        </View>
    );
    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);

            try {
                const fileName = Math.random()`.jpg`;
                const directory = `/storage/emulated/0/Pictures/Camera/`;
                const filePath = directory + fileName;
                await RNFS.mkdir(directory);
                // Rename the captured image file
                await RNFS.moveFile(data.uri, filePath);
                ToastAndroid.show(`Image Save Successfully!`, ToastAndroid.SHORT);

                // const fileExists = await RNFS.exists(filePath);
                // if (fileExists) {
                //   setCapturedFiles(true);
                // }
            } catch (error) {
                console.log('Image saving error:', error);
            }
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.preview}>
                <RNCamera
                    ratio={'4:4'}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onCameraReady={() => setIsCameraReady(true)}
                    ref={cameraRef}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    onBarCodeRead={(data) => handleBarcodeRead(data)}
                >
                    {/* <BarcodeMask /> */}
                </RNCamera>
                {/* <RNCamera
                    ref={cameraRef}
                    style={styles.camera}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    ratio={'16:9'}
                /> */}

            </View>
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={takePicture} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
            </View>
        </View>
        // <View style={styles.container}>
        //     <RNCamera
        //         flashMode={RNCamera.Constants.FlashMode.on}
        //         androidCameraPermissionOptions={{
        //             title: 'Permission to use camera',
        //             message: 'We need your permission to use your camera',
        //             buttonPositive: 'Ok',
        //             buttonNegative: 'Cancel',
        //         }}
        //         androidRecordAudioPermissionOptions={{
        //             title: 'Permission to use audio recording',
        //             message: 'We need your permission to use your audio',
        //             buttonPositive: 'Ok',
        //             buttonNegative: 'Cancel',
        //         }}
        //         onCameraReady={() => setIsCameraReady(true)}
        //         ref={cameraRef}
        //         style={styles.preview}
        //         type={RNCamera.Constants.Type.back}
        //         onBarCodeRead={(data) => handleBarcodeRead(data)}
        //     >
        //         {/* <BarcodeMask /> */}
        //     </RNCamera>
        //     <Button title="Download Image" onPress={takePicture} />
        // </View>
        // <View style={styles.container}>
        //     <RNCamera
        //         style={styles.preview}
        //         type={RNCamera.Constants.Type.back}
        //         flashMode={RNCamera.Constants.FlashMode.on}
        //         androidCameraPermissionOptions={{
        //             title: 'Permission to use camera',
        //             message: 'We need your permission to use your camera',
        //             buttonPositive: 'Ok',
        //             buttonNegative: 'Cancel',
        //         }}
        //         androidRecordAudioPermissionOptions={{
        //             title: 'Permission to use audio recording',
        //             message: 'We need your permission to use your audio',
        //             buttonPositive: 'Ok',
        //             buttonNegative: 'Cancel',
        //         }}
        //         onCameraReady={() => setIsCameraReady(true)}
        //         ref={cameraRef}
        //     >
        //         <BarcodeMask width={300} height={300} showAnimatedLine={false} outerMaskOpacity={0.8} />


        //         {/* <SafeAreaView style={[styles.cameraSafeArea]} >
        //             <View style={[styles.header, styles.maskFrame]}>
        //             </View>

        //             <View style={[{ flex: 40 }, styles.maskFrame]} ></View>
        //             <View style={[styles.grid]}>
        //             </View>
        //             <View style={[{ flex: 32 }, styles.maskFrame]} ></View>

        //             <View style={[styles.footer, styles.maskFrame]}>
        //                 <TouchableOpacity onPress={takePicture}>
        //                     <View style={styles.snapButton}>
        //                         <View style={[styles.innerSnapButton, { backgroundColor:'blue' }]}>
        //                             <Icon color="white" name="camera" />
        //                         </View>
        //                     </View>
        //                 </TouchableOpacity>
        //             </View>
        //         </SafeAreaView> */}
        //         {/* {({ status }) => {
        //             if (!isCameraReady || status !== 'READY') return <PendingView />;
        //             return (
        //                 <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        //                     <TouchableOpacity onPress={takePicture} style={styles.capture}>
        //                         <Text style={{ fontSize: 14 }}> SNAP </Text>
        //                     </TouchableOpacity>
        //                 </View>
        //             );
        //         }} */}
        //     </RNCamera>

        //     {/* <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        //                     <TouchableOpacity onPress={takePicture} style={styles.capture}>
        //                         <Text style={{ fontSize: 14 }}> SNAP </Text>
        //                     </TouchableOpacity>
        //                 </View>
        //     <View
        //         style={{
        //             position: 'absolute',
        //             top: 0,
        //             left: 0,
        //             width: '100%',
        //             height: '100%',
        //             backgroundColor: 'rgba(0.2, 0.2, 0.2, 0.2)',
        //             alignItems: 'center',
        //             justifyContent: 'space-around',
        //         }}
        //     >
        //         <View
        //             style={{
        //                 width: 300,
        //                 height: 300,
        //                 backgroundColor: 'transparent',
        //                 borderColor: 'white',
        //                 borderWidth: 1,
        //             }}
        //         />
        //     </View> */}

        //     <View style={styles.lowerSection}>

        //         <Button
        //             onPress={onGetItemPress}
        //         >
        //             <Text>Get Item</Text>
        //         </Button>
        //     </View>
        // </View>


    )
}

const styles = StyleSheet.create({
    preview: {
        height: 240,
        width: 240,
        borderRadius: 120,
        overflow: 'hidden'
    },
    camera: {
        height: 240,
        width: 240
    },
    // container: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // preview: {
    //     height: '40%',
    //     width: '40%',
    //     borderRadius: '20%',
    //     // width:200,
    //     // height:100,
    //     // borderRadius:50
    //     // flex: 1,
    //     // justifyContent: 'flex-end',
    //     // alignItems: 'center',
    // },
    // container: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     backgroundColor: 'black',
    // },
    // preview: {
    //     flex: 1,
    //     justifyContent: 'flex-end',
    //     alignItems: 'center',
    // },
    // capture: {
    //     flex: 0,
    //     backgroundColor: '#fff',
    //     borderRadius: 5,
    //     padding: 15,
    //     paddingHorizontal: 20,
    //     alignSelf: 'center',
    //     margin: 20,
    // },
    // camera: {
    //     flex: 1
    // },
    // cameraSafeArea: {
    //     flex: 1,
    //     justifyContent: 'flex-start',
    //     // backgroundColor: StyleGuide.palette.transparent
    // },
    // header: {
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     // padding: StyleGuide.spacing.small,
    // },
    // footer: {
    //     flexDirection: "row",
    //     justifyContent: "space-around",
    //     alignItems: "center",
    //     // padding: StyleGuide.spacing.small
    // },
    // grid: {
    //     alignItems: 'center',
    //     justifyContent: 'space-around',
    //     top: 0,
    //     left: 0,
    //     // borderColor: StyleGuide.palette.white,
    //     borderWidth: 4,
    //     width: 800,
    //     height: 200,
    //     // marginLeft: StyleGuide.spacing.small,
    //     // width: width - (StyleGuide.spacing.small * 2),
    //     // height: ( width - (StyleGuide.spacing.small * 2) ) * 2 / 3,
    //     borderRadius: 5,
    // },
    // maskFrame: {
    //     backgroundColor: 'rgba(1,1,1,0.6) !important',
    // },
    // maskCenter: { flexDirection: 'row' },
});