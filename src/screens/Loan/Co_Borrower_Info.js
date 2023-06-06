import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { List } from 'react-native-paper'
import { style } from '../../style/Individual_Loan_style';
import TextInputFile from '../../components/TextInputFile';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import DatePicker from '../../components/DatePicker';
function Co_Borrower_Info(props) {
    const [co_borrower_expanded, setCoBorrowerExpanded] = useState(true);
    const { showCoBorrowerSearch } = props

    const handleCoBorrowerToggle = () => {
        setCoBorrowerExpanded(!co_borrower_expanded);
    };
    return (
        <>
            <List.Accordion
                expanded={co_borrower_expanded}
                onPress={handleCoBorrowerToggle}
                style={style.list_container}
                titleStyle={style.list_title}
                title="Co-Borrower Info">

                <View style={style.sub_container}>
                    <Field
                        name={'co_customer_no'}
                        title={'Customer No'}
                        component={TextInputFile}
                        input_cusstyle
                        input_mode
                        editable
                    />
                    <View style={style.sub_list_container}>
                        <Field
                            name={'co_brwer_rgst_id'}
                            title={'NRC'}
                            icon={'magnify'}
                            component={TextInputFile}
                            cus_width
                            inputmax={20}
                            input_mode
                            editable
                            handleTextInputFocus={showCoBorrowerSearch}
                            focusTextInput
                        />

                        <Field
                            name={'co_brwer_name'}
                            title={'Co Borrower Name'}
                            component={TextInputFile}
                            cus_width
                            input_mode
                            editable
                        />
                    </View>

                    <View style={style.sub_list_container}>
                        <Field
                            name={'birthDate'}
                            component={DatePicker}
                            label={'Date Of Birth'}
                            icon={'calendar'}
                        />

                        <Field
                            name={'tel_no'}
                            title={'Phone Number'}
                            component={TextInputFile}
                            cus_width
                            input_mode
                            editable
                            inputmax={30}
                        />
                    </View>

                    <View style={style.sub_list_container}>
                        <Field
                            name={'tel_no'}
                            title={'Occupation'}
                            component={TextInputFile}
                            cus_width
                            input_mode
                            editable
                            inputmax={50}
                        />

                        <Field
                            name={'tel_no'}
                            title={'Relation with Phone Number'}
                            component={TextInputFile}
                            cus_width
                            input_mode
                            editable
                            inputmax={50}
                        />
                    </View>

                </View>
            </List.Accordion>


        </>
    )
}

function mapStateToProps(state) {
    return {};
}

export default reduxForm({
    form: 'Individual_Loan_Form',
    // validate,
})(connect(mapStateToProps, {})(Co_Borrower_Info));