import { View, Text, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React from 'react'
import { Field, reduxForm, setInitialValues, initialize } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import { Divider } from 'react-native-paper';


function Customer_Management() {
    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{ flex: 1 }} >
                    <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 10, color: '#273050' }}>Customer Information Management</Text>
                    <Divider style={{ backgroundColor: '#000', height: 1, marginTop: 15,width:'80%',textAlign:'center' }} />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

export default reduxForm({
    form: 'Customer_ManagementForm',
})(connect(null)(Customer_Management));