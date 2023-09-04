import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { Modal, Provider, Portal, TextInput, Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { emp_filter_item } from '../common';
import { useTranslation } from 'react-i18next';

export default function Employee_Modal(props) {
    const { all_emp, loading, btnCusSearch, modalVisible, hideModal, selectedItemValue, handleItemValueChange,
        emp_text, onChangeEmpText,item } = props
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
                    visible={modalVisible}
                    onDismiss={hideModal}
                    contentContainerStyle={containerStyle}>
                    <View
                        style={{ backgroundColor: '#232D57', padding: 25 }}
                        onStartShouldSetResponder={() => hideModal()}>
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
                                    selectedValue={selectedItemValue}
                                    onValueChange={handleItemValueChange}
                                    style={{ width: 200, backgroundColor: 'white', marginTop: 7 }}
                                    mode="dropdown">
                                    {emp_filter_item.length > 0 &&
                                        emp_filter_item.map(val => (
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
                                    value={emp_text}
                                    onChangeText={onChangeEmpText}
                                    right={
                                        <TextInput.Icon
                                            icon={'magnify'}
                                            onPress={() => btnCusSearch()}
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
                                {t('Employee No')}
                            </Text>
                            <Text
                                style={{
                                    flex: 1,

                                    padding: 10,
                                    fontWeight: 'bold',
                                }}>
                                {t('Employee Name')}
                            </Text>
                            <Text
                                style={{
                                    flex: 1,

                                    padding: 10,
                                    fontWeight: 'bold',
                                }}>
                                {t('Positon Name')}
                            </Text>
                        </View>
                        {loading ? ( // Show ActivityIndicator while loading is true
                            <ActivityIndicator size="large" color="#636Dc6" />
                        ) : (
                            <>
                                <FlatList
                                    data={all_emp}
                                    renderItem={item}
                                    keyExtractor={(item, index) => index.toString()}
                                />

                                <View
                                    style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Button
                                        onPress={() => hideModal()}
                                        mode="contained"
                                        buttonColor={'#21316C'}
                                        style={{
                                            borderRadius: 0,
                                            width: 117,
                                            marginTop: 10,
                                            color: 'black',
                                            marginLeft: 5,
                                            height: 44
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