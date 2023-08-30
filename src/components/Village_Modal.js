import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { Provider, Portal, Modal, TextInput, Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { village_code } from '../common';
import { useTranslation } from 'react-i18next';

export default function Village_Modal(props) {
    const { setVillageSelectedValue,loading,all_village, village_item, btnVillageSearch, onChangeVillageText, village_text, modal_village_visible, hideVillageModal, villageselectedItemValue, } = props
    const containerStyle = {
        backgroundColor: '#e8e8e8',
        width: '85%',
        alignSelf: 'center',
    };
    const { t } = useTranslation();
    return (
        <Provider>
            <Portal>
                <Modal
                    dismissable={false}
                    visible={modal_village_visible}
                    onDismiss={hideVillageModal}
                    contentContainerStyle={containerStyle}>
                    <View
                        style={{ backgroundColor: '#232D57', padding: 25 }}
                        onStartShouldSetResponder={() => hideVillageModal()}>
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
                                    selectedValue={villageselectedItemValue}
                                    onValueChange={setVillageSelectedValue}
                                    style={{ width: 200, backgroundColor: 'white', marginTop: 7 }}
                                    mode="dropdown">
                                    {village_code.length > 0 &&
                                        village_code.map(val => (
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
                                    value={village_text}
                                    onChangeText={onChangeVillageText}
                                    right={
                                        <TextInput.Icon
                                            icon={'magnify'}
                                            onPress={() => btnVillageSearch()}
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
                                Village Code
                            </Text>
                            <Text
                                style={{
                                    flex: 1,

                                    padding: 10,
                                    fontWeight: 'bold',
                                }}>
                                Village Name
                            </Text>

                        </View>
                        {loading ? ( // Show ActivityIndicator while loading is true
                            <ActivityIndicator size="large" color="#636Dc6" />
                        ) : (
                            <>
                                <FlatList
                                    data={all_village}
                                    renderItem={village_item}
                                    keyExtractor={(item, index) => index.toString()}
                                />


                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Button
                                        onPress={() => hideVillageModal()}
                                        mode="contained"
                                        buttonColor={'#21316C'}
                                        style={{
                                            borderRadius: 0,
                                            width: 117,
                                            marginTop: 10,
                                            color: 'black',
                                            marginLeft: 5,
                                            height:44
                                        }}>
                                        {t("OK")}
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