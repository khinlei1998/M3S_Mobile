import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {List, Button} from 'react-native-paper';
import {style} from '../../style/Exceptional_Approvla_style';
import DatePicker from '../../components/DatePicker';
import {reduxForm, Field, change, reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import TextInputFile from '../../components/TextInputFile';
import {questions} from '../../common';
import RadioButtonFile from '../../components/RadioButtonFile';
import DividerLine from '../../components/DividerLine';

function Exceptional_Approval_Info(props) {
  const {} = props;

  const [exceptional_approval_expanded, setExceptionalApproval] =
    useState(true);
  const handleExceptonalApprovalToggle = () => {
    setExceptionalApproval(!exceptional_approval_expanded);
  };
  return (
    <>
      <List.Accordion
        expanded={exceptional_approval_expanded}
        onPress={handleExceptonalApprovalToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Business Info">
        <View style={style.sub_container}>
          <View style={style.sub_list_container}>
            <Field
              name={'workplace_name'}
              title={'Business Name '}
              component={TextInputFile}
              input_mode
              inputmax={100}
            />
            <Field
              name={'application_date'}
              component={DatePicker}
              label={'Application Date'}
              icon={'calendar'}
            />
          </View>
        </View>

        <View style={style.sub_container}>
          <View style={style.sub_list_container}>
            <Text style={{fontSize: 15}}>Over 60 Years old</Text>
            <Field
              data={questions}
              name={'cst_new_exist_flg'}
              component={RadioButtonFile}
            />
          </View>
        </View>

        <View style={style.sub_container}>
          <View style={style.sub_list_container}>
            <Text style={{fontSize: 15}}>Over 60 Years old</Text>
            <Field
              data={questions}
              name={'cst_new_exist_flg'}
              component={RadioButtonFile}
            />
          </View>
        </View>

        <View style={style.sub_container}>
          <View style={style.sub_list_container}>
            <Text style={{fontSize: 15}}>Over 60 Years old</Text>
            <Field
              data={questions}
              name={'cst_new_exist_flg'}
              component={RadioButtonFile}
            />
          </View>
        </View>

        <View style={style.sub_container}>
          <Field
            name={'workplace_name'}
            title={'Exceptional Reason '}
            component={TextInputFile}
            input_mode
            inputmax={100}
            input_cusstyle
          />
        </View>

        <View style={style.sub_container}>
          <View style={style.sub_list_container}>
            <Field
              name={'workplace_name'}
              title={'Recommended By'}
              component={TextInputFile}
              input_mode
              inputmax={100}
            />
          </View>
        </View>
        <DividerLine />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          <Button
            mode="contained"
            buttonColor={'#6870C3'}
            style={{
              borderRadius: 0,
              marginTop: 10,
              color: 'black',
              borderRadius: 5,
            }}>
            Document Submit
          </Button>
        </View>
      </List.Accordion>
    </>
  );
}

function mapStateToProps(state) {
  return {};
}

export default reduxForm({
  form: 'Exceptional_Approval_Info',
  // validate,
})(connect(mapStateToProps, {})(Exceptional_Approval_Info));
