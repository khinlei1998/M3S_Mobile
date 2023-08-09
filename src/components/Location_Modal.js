import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import React from 'react';
import {Provider, Portal, Modal, TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';
import {location_code} from '../common';
export default function Location_Modal(props) {
  const {
    location_item,
    btnLocationSearch,
    location_text,
    modal_location_visible,
    hideLocationModal,
    selectedLocationItemValue,
    handleLocationItemValueChange,
    onChangeLocationText,
    all_location,
    setLocationSelectedItemValue
  } = props;
  const containerStyle = {
    backgroundColor: '#e8e8e8',
    width: '85%',
    alignSelf: 'center',
  };
  return (
    <Provider>
      <Portal>
        <Modal
          dismissable={false}
          visible={modal_location_visible}
          onDismiss={hideLocationModal}
          contentContainerStyle={containerStyle}>
          <View
            style={{backgroundColor: '#232D57', padding: 25}}
            onStartShouldSetResponder={() => hideLocationModal()}>
            <Icon
              name="x-circle"
              size={25}
              color="#fff"
              style={{
                marginLeft: 20,
                position: 'absolute',
                top: 0,
                right: 10,
                top: 10,
              }}
            />
          </View>
          <View style={{padding: 10, height: 550}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{marginRight: 10}}>Search Item:</Text>

                <Picker
                  selectedValue={selectedLocationItemValue}
                  onValueChange={setLocationSelectedItemValue}
                  style={{width: 200, backgroundColor: 'white', marginTop: 7}}
                  mode="dropdown">
                  {location_code.length > 0 &&
                    location_code.map(val => (
                      <Picker.Item
                        label={val.label}
                        value={val.value}
                        key={val.id}
                      />
                    ))}
                </Picker>
              </View>

              <View style={{width: '50%'}}>
                <TextInput
                  style={{
                    backgroundColor: '#fff',
                    marginTop: 10,
                    width: 301,
                    borderColor: '#303030',
                    borderWidth: 0.5,
                  }}
                  value={location_text}
                  onChangeText={onChangeLocationText}
                  right={
                    <TextInput.Icon
                      icon={'magnify'}
                      onPress={() => btnLocationSearch()}
                    />
                  }
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                borderRadius: 5,
                padding: 5,
                margin: 20,
              }}>
              <Text
                style={{
                  padding: 10,
                  flex: 1,
                  fontWeight: 'bold',
                }}>
                #
              </Text>
              <Text
                style={{
                  flex: 1,

                  padding: 10,
                  fontWeight: 'bold',
                }}>
                Location Code
              </Text>
              <Text
                style={{
                  flex: 1,

                  padding: 10,
                  fontWeight: 'bold',
                }}>
                Location Name
              </Text>
            </View>
            <View>
              <FlatList
                data={all_location}
                renderItem={location_item}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 0,
                marginBottom: 10,
                alignSelf: 'center',
              }}>
              <Button
                onPress={() => hideLocationModal()}
                mode="contained"
                buttonColor={'#6870C3'}
                style={{
                  borderRadius: 0,
                  width: 100,
                  marginTop: 10,
                  color: 'black',
                  marginLeft: 5,
                }}>
                OK
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
}
