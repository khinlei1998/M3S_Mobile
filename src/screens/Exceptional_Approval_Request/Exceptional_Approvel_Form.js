import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {style} from '../../style/Exceptional_Approvla_style';
import {operations} from '../../common';
import {Button, RadioButton, List} from 'react-native-paper';
import DividerLine from '../../components/DividerLine';
import {reduxForm, Field, change, reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import TextInputFile from '../../components/TextInputFile';
import DatePicker from '../../components/DatePicker';
import Exceptional_Approval_Info from './Exceptional_Approval_Info';
import validate from './Validate';
import {storeExceptionalApproval} from '../../query/Exceptional_Approval_query';
import {useNavigation} from '@react-navigation/native';
import {setExcept_ApprovalStatus} from '../../redux/LoanReducer';
import {getAllLoan_By_application_no} from '../../query/AllLoan_query';
import moment from 'moment';
function Exceptional_Approvel_Form(props) {
  const navigation = useNavigation();
  const {handleSubmit, setExcept_ApprovalStatus, onSuccess} = props;
  const [show_operation, setOperation] = useState('1');
  const [loanexpanded, setLoanExpanded] = React.useState(true);
  const retrive_loan_data = props.route.params.retrive_loan_data;

  const onSubmit = async values => {
    await storeExceptionalApproval(values).then(result => {
      if (result == 'success') {
        ToastAndroid.show(`Insert Success`, ToastAndroid.SHORT);
        navigation.goBack('exceptionl_success');
      }
    });
  };
  const handleLoanToggle = () => {
    setLoanExpanded(!loanexpanded);
  };
  const loadData = async () => {
    await getAllLoan_By_application_no(retrive_loan_data.application_no).then(
      indi_data => {
        let initialize_data = {
          application_no: retrive_loan_data.application_no,
          application_date: indi_data[0].application_date,
          resident_rgst_id: retrive_loan_data.resident_rgst_id,
          borrower_name: indi_data[0].borrower_name,
          application_amt: indi_data[0].application_amt.toString()
            ? indi_data[0].application_amt.toString()
            : '',
          birth_date: indi_data[0].birth_date,
          tot_net_income: indi_data[0].tot_net_income,
          exception_rqst_date: moment().format('YYYY-MM-DD'),
          excpt_aprv_rqst_no: retrive_loan_data.application_no.replace(
            /^[^M]*M/,
            'EAM',
          ),
        };
        props.initialize(initialize_data);
      },
    );
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Text style={style.title_style}>
              Exceptional Approval Request Form
            </Text>
            <DividerLine />
            <View style={style.continer}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {operations.map((option, index) => (
                  <RadioButton.Group
                    key={index}
                    onValueChange={newValue => setOperation(newValue)}
                    value={show_operation}>
                    <View
                      key={option.value}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <RadioButton.Item
                        disabled={option.value !== show_operation}
                        label={option.label}
                        value={option.value}
                        color="#000"
                        labelStyle={{marginLeft: 5}}
                      />
                    </View>
                  </RadioButton.Group>
                ))}
              </View>
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
                  />

                  <Field
                    name={'borrower_age'}
                    title={'Age'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
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
                  />

                  <Field
                    name={'occupation'}
                    title={'Main Occuaptions'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                  />
                </View>
              </View>
            </List.Accordion>
            <Exceptional_Approval_Info
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  );
}

function mapStateToProps(state) {
  return {};
}

export default reduxForm({
  form: 'Exceptional_Approvel_Form',
  validate,
})(
  connect(mapStateToProps, {setExcept_ApprovalStatus})(
    Exceptional_Approvel_Form,
  ),
);
