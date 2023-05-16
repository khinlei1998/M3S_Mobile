import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Feather';
import { property_type } from '../../common';
import CheckBoxFile from '../../components/CheckBoxFile';
import { Field, reduxForm, setInitialValues, initialize } from 'redux-form';
import TextInputFile from '../../components/TextInputFile';
import DividerLine from '../../components/DividerLine';
import { style } from '../../style/Property_Info_style';
export default function Property_Info() {
    const [show_propertyinfo, setOpenPropertyInfo] = useState(false)

    const PropertyInfoFun = () => {
        setOpenPropertyInfo(!show_propertyinfo);
    };

    return (
        <>
            <View
                style={style.container}>
                <Text style={style.titlestyle}>Property Information</Text>
                <TouchableOpacity onPress={PropertyInfoFun}>
                    <Icon name="arrow-up" size={30} style={{ marginTop: 10 }} />
                </TouchableOpacity>
            </View>
            <Collapsible collapsed={show_propertyinfo}>
                <View
                    style={style.collasible_container}>
                    <View style={{ flexDirection: 'row', }}>
                        <Field
                            data={property_type}
                            name={'password'}
                            title={'Business Name'}
                            component={CheckBoxFile}
                          
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

                    <View style={style.input_container_style}>
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