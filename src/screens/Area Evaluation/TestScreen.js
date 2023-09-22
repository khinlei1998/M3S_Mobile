import { View, Text, TouchableOpacity } from 'react-native'
import React,{useEffect}from 'react'
import RNImageTools from "react-native-image-tools";

export default function TestScreen() {
    useEffect(async () => {
        const hasPermission = await RNImageTools.checkImageLibraryPermission();
        if (!hasPermission) {
            await RNImageTools.requestImageLibraryPermission();
        }


    }, [])

    const callfun = async () => {
        try {
            const selected = await RNImageTools.selectImage({});

            console.log("chosen image", selected);

            // const uri = selected.uri;

            // this.setState({
            //   originalImageUri: uri,
            //   editedImageUri: null,
            //   selectedImage: uri
            // });
        } catch (e) {
            console.log("cancelled", e);
        }
    }
    return (
        <View>
            <TouchableOpacity onPress={() => callfun()}>
                <Text>TestScreen</Text>
            </TouchableOpacity>
        </View>
    )
}