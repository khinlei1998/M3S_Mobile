import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { List, Button } from 'react-native-paper';
import { style } from '../../style/Exceptional_Approvla_style';
import DatePicker from '../../components/DatePicker';
import { reduxForm, Field, change, reset } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import TextInputFile from '../../components/TextInputFile';
import { questions } from '../../common';
import RadioButtonFile from '../../components/RadioButtonFile';
import DividerLine from '../../components/DividerLine';
import Icon from 'react-native-vector-icons/Feather';
import validate from './Validate';
function Exceptional_Approval_Info(props) {
  const { handleSubmit, onSubmit ,exceptional_update_status} = props;

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
              name={'excpt_aprv_rqst_no'}
              title={'Exceptional Approval Request No '}
              component={TextInputFile}
              input_mode
              inputmax={100}
              editable
            />
            <Field
              name={'exception_rqst_date'}
              component={DatePicker}
              label={'Request Date'}
              icon={'calendar'}
              editable
            />
          </View>
        </View>

        <View style={{
          width: '90%',
          alignSelf: 'center',
          backgroundColor: '#FAFAFA',
          padding: 10,
        }}>
          <View style={{
            flexDirection: 'row',
            padding: 5,
            justifyContent: 'space-between',
          }}>
            <Text style={{ fontSize: 15, flexWrap: 'wrap' }}>အသက်(၆၀) အထက် (Over-60 years old)</Text>
            <Field
              data={questions}
              name={'excpt_aprv_rsn_1'}
              component={RadioButtonFile}
              disabled={exceptional_update_status == true ? false : true}
            />
          </View>
        </View>

        <View style={{
          width: '90%',
          alignSelf: 'center',
          backgroundColor: '#FAFAFA',
          padding: 10,
        }}>
          <View style={{
            flexDirection: 'row',
            padding: 5,
            justifyContent: 'space-between',

          }}>
            <Text style={{ fontSize: 15, maxWidth: '70%' }}>ချေးငွေပြန်လည်ပေးဆပ်မှုနောက်ကျသောအဖွဲ့အားချေးငွေပြန်လည်ထုတ်ချေးပေးပါရန်</Text>
            <Field
              data={questions}
              name={'excpt_aprv_rsn_2'}
              component={RadioButtonFile}
              disabled={exceptional_update_status == true ? false : true}
            />
          </View>
        </View>

        <View style={{
          width: '90%',
          alignSelf: 'center',
          backgroundColor: '#FAFAFA',
          padding: 10,
        }}>
          <View style={{
            flexDirection: 'row',
            padding: 5,
            justifyContent: 'space-between',
          }}>
            <Text style={{ fontSize: 15, maxWidth: '70%' }}>MCIX Data ထဲတွင်MFI (3)ခုထက်ကျော်လွန်နေပါသဖြင့် ချေးငွေထုတ်ယူခွင့်ပြုပါရန်</Text>
            <Field
              data={questions}
              name={'excpt_aprv_rsn_3'}
              component={RadioButtonFile}
              disabled={exceptional_update_status == true ? false : true}
            />
          </View>
        </View>

        <View style={style.sub_container}>
          <Field
            name={'exception_reason'}
            title={'Exceptional Reason '}
            component={TextInputFile}
            input_mode
            inputmax={100}
            input_cusstyle
            require
            editable={exceptional_update_status == true ? false : true}
          />
        </View>

        <View style={style.sub_container}>
          <View style={style.sub_list_container}>
            <Field
              name={'recommend_nm'}
              title={'Recommended By'}
              component={TextInputFile}
              input_mode
              inputmax={100}
              editable={exceptional_update_status == true ? false : true}
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
            onPress={handleSubmit(onSubmit)}
            mode="contained"
            buttonColor={'#6870C3'}
            style={{
              borderRadius: 0,
              marginTop: 10,
              color: 'black',
              borderRadius: 5,
              padding: 5
            }}>
            <Icon name="paperclip" size={18} color="#fff" />
            Document Submit
          </Button>
        </View>
      </List.Accordion>
    </>
  );
}

function mapStateToProps(state) {
  return {
    exceptional_update_status: state.loan.exceptional_update_status
  };
}

export default reduxForm({
  form: 'Edit_Exceptional_Approvel_Form',
  // validate,
})(connect(mapStateToProps, {})(Exceptional_Approval_Info));
