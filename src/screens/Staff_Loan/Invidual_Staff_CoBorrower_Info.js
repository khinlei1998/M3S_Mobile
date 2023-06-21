import {View, Text} from 'react-native';
import React, { useState } from 'react'
import { List } from 'react-native-paper'
import DatePicker from '../../components/DatePicker';
import TextInputFile from '../../components/TextInputFile';
import { style } from '../../style/Individula_staff_Loan_Style';
import { Field } from 'redux-form';
export default function Invidual_Staff_CoBorrower_Info(props) {
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
              name={'co_brwer_birth_dt'}
              component={DatePicker}
              label={'Date Of Birth'}
              icon={'calendar'}
            />

            <Field
              name={'co_brwer_tel_no'}
              title={'Tel No'}
              component={TextInputFile}
              cus_width
              input_mode
              keyboardType={'numeric'}
              inputmax={30}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'co_occupation'}
              title={'Occupation'}
              component={TextInputFile}
              cus_width
              input_mode
              inputmax={50}
            />

            <Field
              name={'borrower_rltn'}
              title={'Relation with Phone Number'}
              component={TextInputFile}
              cus_width
              input_mode
              inputmax={50}
              keyboardType={'numeric'}
            />
          </View>
        </View>
      </List.Accordion>
    </>
  );
}
