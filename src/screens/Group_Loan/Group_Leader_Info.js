import { View, Text } from 'react-native'
import React, { useState, useEffect, createRef } from 'react';
import { style } from '../../style/Group_Loan_style';
import { List } from 'react-native-paper';
export default function Group_Leader_Info() {
    const [Group_expand, setGroupInfoExpand] = useState(true);
    const handleGroupToggle = () => {
        setGroupInfoExpand(!Group_expand);
    };
    return (
        <>
            <List.Accordion
                expanded={Group_expand}
                onPress={handleGroupToggle}
                style={style.list_container}
                titleStyle={style.list_title}
                title="Borrower Info">
                <View style={style.sub_container}>
                    {/* <View style={style.sub_list_container}>
                        <Field
                            name={'guarantee_no'}
                            title={'Guarantee No'}
                            component={TextInputFile}
                            cus_width
                            input_mode
                            editable
                        />

                        <Field
                            name={'guarantor_no'}
                            title={'Guarantor No'}
                            component={TextInputFile}
                            cus_width
                            input_mode
                            keyboardType={'numeric'}
                            editable
                        />
                    </View>

                    <View style={style.sub_list_container}>
                        <Field
                            name={'resident_rgst_id'}
                            title={'NRC'}
                            icon={'magnify'}
                            component={TextInputFile}
                            cus_width
                            input_mode
                            editable
                            require
                            handleTextInputFocus={showGuarantorSearch}

                        />

                        <Field
                            name={'guarantor_nm'}
                            title={'Guarantor Name'}
                            component={TextInputFile}
                            cus_width
                            input_mode
                            editable
                        />
                    </View>

                    <View style={style.sub_list_container}>
                        <Field
                            data={gender}
                            name={'gender'}
                            title={'Gender'}
                            component={DropDownPicker}
                            pickerStyle={{
                                width: 300,
                            }}
                        />

                        <Field
                            name={'birth_date'}
                            component={DatePicker}
                            label={'date of birth'}
                            icon={'calendar'}
                        />
                    </View>

                    <View style={style.sub_list_container}>
                        <Field
                            data={maritail_status}
                            name={'marital_status'}
                            title={'Maritial Status'}
                            component={DropDownPicker}
                            pickerStyle={{
                                width: 300,
                            }}
                        />

                        <Field
                            data={address_type}
                            name={'address_type'}
                            title={'Address Type'}
                            component={DropDownPicker}
                            pickerStyle={{
                                width: 300,
                            }}
                        />
                    </View>

                    <Field
                        name={'addr'}
                        title={'No,Street '}
                        component={TextInputFile}
                        input_mode
                        inputmax={100}
                        input_cusstyle
                    />
                    <View style={style.sub_list_container}>
                        <Field
                            name={'curr_resident_date'}
                            component={DatePicker}
                            label={'Start Living Date in current address'}
                            icon={'calendar'}
                        />

                        <Field
                            name={'tel_no'}
                            title={'Tel No'}
                            component={TextInputFile}
                            cus_width
                            input_mode
                            keyboardType={'numeric'}
                        />
                    </View>

                    <View style={style.sub_list_container}>
                        <Field
                            name={'borrower_rltn'}
                            title={'Relationship with borrower'}
                            component={TextInputFile}
                            cus_width
                            input_mode
                            keyboardType={'numeric'}
                        />
                        <Field
                            name={'relation_period'}
                            component={DatePicker}
                            label={'Relationship Period'}
                            icon={'calendar'}
                        />
                    </View>
                    <View style={style.sub_list_container}>
                        <Field
                            data={condition_house}
                            name={'house_ocpn_type'}
                            title={'Condition of house'}
                            component={DropDownPicker}
                            pickerStyle={{
                                width: 300,
                            }}
                        />

                        <Field
                            name={'business_own_type'}
                            title={'OwnerShip of business'}
                            component={TextInputFile}
                            cus_width
                            input_mode
                        />
                    </View> */}

                </View>
            </List.Accordion>
        </>
    )
}