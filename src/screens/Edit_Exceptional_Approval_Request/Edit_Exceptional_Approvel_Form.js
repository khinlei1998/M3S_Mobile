import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { style } from '../../style/Exceptional_Approvla_style';
import { operations } from '../../common';
import { Button, RadioButton, List } from 'react-native-paper';
import DividerLine from '../../components/DividerLine';
import { reduxForm, Field, change, reset } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import TextInputFile from '../../components/TextInputFile';
import DatePicker from '../../components/DatePicker';
import Exceptional_Approval_Info from './Edit_Exceptional_Approval_Info';
import validate from './Validate';
import { storeExceptionalApproval } from '../../query/Exceptional_Approval_query';
import { useNavigation } from '@react-navigation/native';
import { setExcept_UPDATEStatus } from '../../redux/LoanReducer';
import { deleteExceptional_approval_ByID } from '../../query/Exceptional_Approval_query';
import { updateExceptionalApproval } from '../../query/Exceptional_Approval_query';
function Edit_Exceptional_Approvel_Form(props) {
  const navigation = useNavigation();
  const { handleSubmit, exceptional_update_status, setExcept_UPDATEStatus } = props;
  const retrive_exceptional_data = props.route.params.exceptional_data[0]
  const [show_operation, setOperation] = useState('2');
  const [loanexpanded, setLoanExpanded] = React.useState(true);
  const onSubmit = async (values) => {
    if (show_operation == '4') {
      await deleteExceptional_approval_ByID(values.excpt_aprv_rqst_no).then(response => {
        if (response == 'success') {
          alert('Delete Success');
          navigation.goBack();
          // setUpdateStatus(false);
          // props.navigation.navigate('Home');
        }
      });
    } else {
      const exceptional_data = Object.assign({}, values, {
        tablet_sync_sts:
          values.tablet_sync_sts == '01' ? '02' : values.tablet_sync_sts,
      });
      await updateExceptionalApproval(exceptional_data).then(result => {
        if (result == 'success') {
          ToastAndroid.show(`Update Success`, ToastAndroid.SHORT);
          navigation.goBack();
          // navigation.goBack('exceptionl_success');
        }
      })
    }

  };
  const handleLoanToggle = () => {
    setLoanExpanded(!loanexpanded);
  };

  const filtered_operations = operations.filter(item => item.value != 1);
  useEffect(() => {
    const exceptional_data = Object.assign({}, retrive_exceptional_data, {
      application_amt: retrive_exceptional_data.application_amt
        ? retrive_exceptional_data.application_amt.toString()
        : '',
      borrower_age: retrive_exceptional_data.borrower_age
        ? retrive_exceptional_data.borrower_age.toString()
        : '',
      net_income: retrive_exceptional_data.net_income
        ? retrive_exceptional_data.net_income.toString()
        : '',
      group_member_num: retrive_exceptional_data.group_member_num
        ? retrive_exceptional_data.group_member_num.toString()
        : '',
    })
    props.initialize(exceptional_data);


  }, [])
  const btnChangeOperation = newValue => {
    setOperation(newValue);
    if (newValue == 2 || newValue == 4) {
      setExcept_UPDATEStatus(false);
    } else {
      setExcept_UPDATEStatus(true);
    }
  };
  useEffect(() => {
    if (exceptional_update_status == true) {
      setOperation('3');
    }
  }, [exceptional_update_status]);
  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Text style={style.title_style}>Exceptional Approval Request Form</Text>
            <DividerLine />
            <View style={style.continer}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {operations.map((option, index) => (
                  <RadioButton.Group
                    key={index}
                    onValueChange={newValue => btnChangeOperation(newValue)}
                    value={show_operation}>
                    <View
                      key={option.value}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <RadioButton.Item
                       disabled={option.value == '1'}
                        label={option.label}
                        value={option.value}
                        color="#000"
                        labelStyle={{ marginLeft: 5 }}
                      />
                    </View>
                  </RadioButton.Group>
                ))}
              </View>
              {/* {exceptional_update_status == true && (
                <Button
                  onPress={handleSubmit(onSubmit)}
                  mode="contained"
                  buttonColor={'#6870C3'}
                  style={style.btnStyle}>
                  OK
                </Button>
              )} */}
            </View>
            <DividerLine />
            <List.Accordion
              expanded={loanexpanded}
              onPress={handleLoanToggle}
              style={style.list_container}
              titleStyle={style.list_title}
              title="Loan Info">
              <View style={style.sub_container}>
                <View style={style.sub_list_container}>
                  <Field
                    name={'application_no'}
                    title={'Application No'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                  />
                  <Field
                    name={'application_date'}
                    component={DatePicker}
                    label={'Application Date'}
                    editable={true}
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'resident_rgst_id'}
                    title={'Borrower NRC'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                    editable
                  />

                  <Field
                    name={'borrower_name'}
                    title={'Borrower Name'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                    editable
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'application_amt'}
                    title={'Loan Apply Amount'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                    editable
                  />

                  <Field
                    name={'birth_date'}
                    component={DatePicker}
                    label={'Date Of Birth'}
                    editable={true}
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'net_income'}
                    title={'Total Net Income'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                    editable={exceptional_update_status == true ? false : true}
                  />

                  <Field
                    name={'borrower_age'}
                    title={'Age'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                    editable={exceptional_update_status == true ? false : true}

                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'group_member_num'}
                    title={'Group Members'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                    editable={exceptional_update_status == true ? false : true}

                  />

                  <Field
                    name={'occupation'}
                    title={'Main Occuaptions'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable={exceptional_update_status == true ? false : true}
                  />
                </View>
              </View>
            </List.Accordion>
            <Exceptional_Approval_Info onSubmit={onSubmit} handleSubmit={handleSubmit} />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  );
}

function mapStateToProps(state) {
  console.log('exceptional_update_status', state.loan.exceptional_update_status);
  return {
    exceptional_update_status: state.loan.exceptional_update_status
  };
}

export default reduxForm({
  form: 'Edit_Exceptional_Approvel_Form',
  validate,
})(connect(mapStateToProps, { setExcept_UPDATEStatus })(Edit_Exceptional_Approvel_Form));
