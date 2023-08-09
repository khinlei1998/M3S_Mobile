import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { Provider, Portal, Modal, TextInput, Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { Township_code } from '../common';
export default function Township_Modal(props) {
    const {handleTownshipItemValueChange,all_township,loading, btnTownshipSearch, onChangeTownshipText, township_text, hideTownshipModal, modal_township_visible, townshipselectedItemValue,township_item } = props

   
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
                    visible={modal_township_visible}
                    onDismiss={hideTownshipModal}
                    contentContainerStyle={containerStyle}>
                    <View
                        style={{ backgroundColor: '#232D57', padding: 25 }}
                        onStartShouldSetResponder={() => hideTownshipModal()}>
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
                    <View style={{ padding: 10, height: 550 }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginRight: 10, fontWeight: 'bold' }}>
                                    Search Item:
                                </Text>

                                <Picker
                                    selectedValue={townshipselectedItemValue}
                                    onValueChange={handleTownshipItemValueChange}
                                    style={{ width: 200, backgroundColor: 'white', marginTop: 7 }}
                                    mode="dropdown">
                                    {Township_code.length > 0 &&
                                        Township_code.map(val => (
                                            <Picker.Item
                                                label={val.label}
                                                value={val.value}
                                                key={val.id}
                                            />
                                        ))}
                                </Picker>
                            </View>

                            <View style={{ width: '50%' }}>
                                <TextInput
                                    style={{
                                        backgroundColor: '#fff',
                                        marginTop: 10,
                                        width: 301,
                                        borderColor: '#303030',
                                        borderWidth: 0.5,
                                    }}
                                    value={township_text}
                                    onChangeText={onChangeTownshipText}
                                    right={
                                        <TextInput.Icon
                                            icon={'magnify'}
                                            onPress={() => btnTownshipSearch()}
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
                                    flex: 0.5,
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
                                Township Code
                            </Text>
                            <Text
                                style={{
                                    flex: 1,

                                    padding: 10,
                                    fontWeight: 'bold',
                                }}>
                                Township Name
                            </Text>

                        </View>
                        {loading ? ( // Show ActivityIndicator while loading is true
                            <ActivityIndicator size="large" color="#636Dc6" />
                        ) : (
                            <>
                                <FlatList
                                    data={all_township}
                                    renderItem={township_item}
                                    keyExtractor={(item, index) => index.toString()}
                                />


                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Button
                                        onPress={() => hideTownshipModal()}
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
                            </>
                        )}
                    </View>
                </Modal>
            </Portal>
        </Provider>
    )
}