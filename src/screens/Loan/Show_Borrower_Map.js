import { View, Text } from 'react-native'
import React from 'react'
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';

export default function Show_Borrower_Map() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF', }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <RNSketchCanvas
                    containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
                    canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
                    defaultStrokeIndex={0}
                    defaultStrokeWidth={5}
                    closeComponent={<View style={{
                        marginHorizontal: 2.5, marginVertical: 8, height: 30, width: 60,
                        backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
                    }}><Text style={{ color: 'white' }}>Close</Text></View>}
                    undoComponent={<View style={{
                        marginHorizontal: 2.5, marginVertical: 8, height: 30, width: 60,
                        backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
                    }}><Text style={{ color: 'white' }}>Undo</Text></View>}
                    clearComponent={<View style={{
                        marginHorizontal: 2.5, marginVertical: 8, height: 30, width: 60,
                        backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
                    }}><Text style={{ color: 'white' }}>Clear</Text></View>}
                    eraseComponent={<View style={{
                        marginHorizontal: 2.5, marginVertical: 8, height: 30, width: 60,
                        backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
                    }}><Text style={{ color: 'white' }}>Eraser</Text></View>}
                    strokeComponent={color => (
                        <View style={{ marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15, backgroundColor: 'red' }} />
                    )}
                    strokeSelectedComponent={(color, index, changed) => {
                        return (
                            <View style={{
                                backgroundColor: color, borderWidth: 2, marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
                            }} />
                        )
                    }}
                    strokeWidthComponent={(w) => {
                        return (<View style={{
                            marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
                            justifyContent: 'center', alignItems: 'center', backgroundColor: '#39579A'
                        }}>
                            <View style={{
                                backgroundColor: 'white', marginHorizontal: 2.5,
                                width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                            }} />
                        </View>
                        )
                    }}
                    saveComponent={<View style={{
                        marginHorizontal: 2.5, marginVertical: 8, height: 30, width: 60,
                        backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5
                    }}><Text style={{ color: 'white' }}>Save</Text></View>}
                    savePreference={() => {
                        return {
                            folder: 'RNSketchCanvas',
                            filename: String(Math.ceil(Math.random() * 100000000)),
                            transparent: false,
                            imageType: 'png'
                        }
                    }}
                />
                {/* <Image source={{ uri: 'file://storage/emulated/0/Pictures/RNSketchCanvas/5507324.png' }} style={{ width: 200, height: 200, }} /> */}
            </View>
        </View>
    )
}