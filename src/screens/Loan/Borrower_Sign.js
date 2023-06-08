import { View, Text } from 'react-native';
import React from 'react';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import { Button } from 'react-native-paper';

export default function Borrower_Sign(props) {
  const { setCanvas, show_canvas,showCanvas,navigation } = props
  return (
    <>
      <View style={{ flex: 1, padding: 5, margin: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
            margin: 10,
          }}>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Borrower Name</Text>
            <Text> Date 17/05/2023</Text>
          </View>

          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Sign</Text>
            <Button
              onPress={() =>setCanvas(!show_canvas)}
              mode="contained"
              buttonColor={'#6870C3'}
            >
              OK
            </Button>
            {/* <View style={{width: 300, height: 300,backgroundColor:'red'}}>
            <SketchCanvas
              style={{flex: 1}}
              strokeColor="#000000"
              strokeWidth={3}
            />
          </View> */}
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
            margin: 10,
          }}>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
              Co Borrower Name
            </Text>
            <Text> Date 17/05/2023</Text>
          </View>

          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Sign</Text>
          </View>
        </View>
      </View>
      

     
        </>

      );
}
