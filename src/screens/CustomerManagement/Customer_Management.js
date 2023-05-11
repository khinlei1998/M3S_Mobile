import { View, Text, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Field, reduxForm, setInitialValues, initialize } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import { Divider, RadioButton } from 'react-native-paper';
import { operations } from '../../common';
function Customer_Management() {
    const [checked, setChecked] = useState();

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{ flex: 1, }} >
                    <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 10, color: '#273050' }}>Customer Information Management</Text>
                    <Divider style={{ backgroundColor: '#000', height: 1, marginTop: 15, width: '80%', alignSelf: 'center' }} />
                    {operations.map((val) => {
                        return (
                            <View style={{ flexDirection: "row", width: "100%" }} >

                                <RadioButton.Group onValueChange={value => setChecked(value)} value={checked} style={{ flexDirection: 'row', backgroundColor: 'red' }}>
                                    <RadioButton.Item label={val.label} value={val.value} />
                                </RadioButton.Group>
                            </View>
                        )
                    })}

                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

export default reduxForm({
    form: 'Customer_ManagementForm',
})(connect(null)(Customer_Management));