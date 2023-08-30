import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { Provider, Portal, Modal, TextInput, Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { city_code } from '../common';
import { useTranslation } from 'react-i18next';


export default function City_Modal(props) {

    const { t } = useTranslation();
    const containerStyle = {
        backgroundColor: '#e8e8e8',
        width: '85%',
        alignSelf: 'center',
    };

    const { selectedCityItemValue,selected_cityvalue, btnCitySearch, all_city, modal_city_visible,
        hideCityModal, selectedItemValue, handleCityItemValueChange, city_text, onChangeCityText, loading, city_items } = props

    return (
        <Provider>
            <Portal>
                <Modal
                    dismissable={false}
                    visible={modal_city_visible}
                    onDismiss={hideCityModal}
                    contentContainerStyle={containerStyle}>
                    <View
                        style={{ backgroundColor: '#232D57', padding: 25 }}
                        onStartShouldSetResponder={() => hideCityModal()}>
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
                                    selectedValue={selectedCityItemValue}
                                    onValueChange={handleCityItemValueChange}
                                    style={{ width: 200, backgroundColor: 'white', marginTop: 7 }}
                                    mode="dropdown">
                                    {city_code.length > 0 &&
                                        city_code.map(val => (
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
                                    value={city_text}
                                    onChangeText={onChangeCityText}
                                    right={
                                        <TextInput.Icon
                                            icon={'magnify'}
                                            onPress={() => btnCitySearch()}
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
                                City Code
                            </Text>
                            <Text
                                style={{
                                    flex: 1,

                                    padding: 10,
                                    fontWeight: 'bold',
                                }}>
                                City Name
                            </Text>

                        </View>
                        {loading ? ( // Show ActivityIndicator while loading is true
                            <ActivityIndicator size="large" color="#636Dc6" />
                        ) : (
                            <>
                                <FlatList
                                    data={all_city}
                                    renderItem={city_items}
                                    keyExtractor={(item, index) => index.toString()}
                                />


                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Button
                                        onPress={() => hideCityModal()}
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