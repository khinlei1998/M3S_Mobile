import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Feather';
import { property_type } from '../../common';
import CheckBoxFile from '../../components/CheckBoxFile';
import { Field, reduxForm, setInitialValues, initialize } from 'redux-form';
import TextInputFile from '../../components/TextInputFile';
import DividerLine from '../../components/DividerLine';
export default function Property_Info() {
    const [show_propertyinfo, setOpenPropertyInfo] = useState(false)

    const PropertyInfoFun = () => {
        setOpenPropertyInfo(!show_propertyinfo);
    };

    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 5,
                    marginLeft: 30,
                    marginRight: 20,
                    marginTop: 15,
                }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Property Information</Text>
                <TouchableOpacity onPress={PropertyInfoFun}>
                    <Icon name="arrow-up" size={30} style={{ marginTop: 10 }} />
                </TouchableOpacity>
            </View>
            <Collapsible collapsed={show_propertyinfo}>
                <View
                    style={{
                        width: '90%',
                        alignSelf: 'center',
                        backgroundColor: '#FAFAFA',
                        margin: 10,
                    }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Field
                            data={property_type}
                            name={'password'}
                            title={'Business Name'}
                            component={CheckBoxFile}
                            // disability_checkedfun={val => checked_disability(val)}
                            // disability_uncheckedfun={(val, id) => unchecked_disability(val, id)}
                        />

                    </View>
                    <View style={{marginRight:20,marginLeft:15}}>
                        <Field
                            name={'employeeNo'}
                            title={'Estimated Value'}
                            component={TextInputFile}
                            input_mode
                            input_cusstyle
                        />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 }}>
                        <Field
                            name={'employeeNo'}
                            title={'Other Property'}
                            component={TextInputFile}
                            input_mode

                        />
                        <Field
                            name={'employeeNo'}
                            title={'Estimated Value'}
                            component={TextInputFile}
                            input_mode

                        />
                    </View>

                </View>
            </Collapsible>
            <DividerLine />
        </>
    )
}