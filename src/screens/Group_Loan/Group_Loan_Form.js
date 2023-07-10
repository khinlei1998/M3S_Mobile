import {
    View,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList,
    TouchableHighlight,
    ToastAndroid,
} from 'react-native';
import React, { useState, useEffect, createRef } from 'react';
import DividerLine from '../../components/DividerLine';
import { operations, emp_filter_item } from '../../common';
import { style } from '../../style/Group_Loan_style';
import { RadioButton } from 'react-native-paper';
import Group_Leader_Info from './Group_Leader_Info';
export default function Group_Loan_Form() {
    const [show_operation, setOperation] = useState('1');
    return (
        <>
            <ScrollView nestedScrollEnabled={true}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 20,
                                marginTop: 20,
                                color: '#273050',
                                fontWeight: 'bold',
                            }}>
                            Group Loan Application
                        </Text>
                       
                        <DividerLine />
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                marginTop: 15,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}>
                                {operations.map((option, index) => (
                                    <RadioButton.Group
                                        key={index}
                                        onValueChange={newValue => setOperation(newValue)}
                                        value={show_operation}>
                                        <View
                                            key={option.value}
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                            <RadioButton.Item
                                                disabled={option.value !== show_operation}
                                                label={option.label}
                                                value={option.value}
                                                color="#000"
                                                labelStyle={{ marginLeft: 5 }}
                                            />
                                        </View>
                                    </RadioButton.Group>
                                ))}
                            </View>
                        </View>
                        <DividerLine />
                        <Group_Leader_Info/>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </>

    )
}