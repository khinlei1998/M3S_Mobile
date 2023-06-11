import {View, Text} from 'react-native';
import React from 'react';
import { Modal } from 'react-native-paper';
export default function Sign_Modal(props) {
    const {}=props
  return (
    <>
      <Modal
        visible={show_canvas}
        animationType="slide"
        transparent={true}
        useNativeDriver
        hideModalContentWhileAnimating
        dismissable={false}
        onDismiss={hideSignModal}>
        <View
          style={{
            backgroundColor: '#232D57',
            padding: 25,
            width: 400,
            alignSelf: 'center',
          }}
          onStartShouldSetResponder={() => setCanvas(!show_canvas)}>
          <Icon
            name="x-circle"
            size={25}
            color="#fff"
            style={style.cancel_icon_style}
          />
        </View>
        <View
          style={{
            backgroundColor: '#F5FCFF',
            width: 400,
            height: 300,
            alignSelf: 'center',
          }}>
          <SignatureCapture
            style={{
              flex: 1,
            }}
            ref={sign}
            onSaveEvent={_onSaveEvent}
            onDragEvent={_onDragEvent}
            showNativeButtons={false}
            showTitleLabel={false}
            saveImageFileInExtStorage
            minStrokeWidth={10}
            maxStrokeWidth={10}
            // backgroundColor="transparent"
            viewMode={'portrait'}
          />
          <View style={{flexDirection: 'row'}}>
            <TouchableHighlight
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                height: 50,
                backgroundColor: '#6870C3',
                margin: 10,
              }}
              onPress={() => {
                saveSign();
              }}>
              <Text style={{color: '#fff'}}>Save</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                height: 50,
                backgroundColor: '#6870C3',
                margin: 10,
              }}
              onPress={() => {
                resetSign();
              }}>
              <Text style={{color: '#fff'}}>Reset</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </>
  );
}
