import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DividerLine from '../../components/DividerLine';
import {style} from '../../style/Individual_Loan_style';
import {operations} from '../../common';
import {RadioButton, Button, List} from 'react-native-paper';
import {reduxForm, Field, change} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import TextInputFile from '../../components/TextInputFile';
import DropDownPicker from '../../components/DropDownPicker';
import {loan_type} from '../../common';
import DatePicker from '../../components/DatePicker';
import RadioButtonFile from '../../components/RadioButtonFile';
import {
  borrower_type,
  gender,
  maritail_status,
  condition_house,
} from '../../common';
import {getAllLoan} from '../../query/AllLoan_query';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Borrower_Info from './Borrower_Info';
function Individual_Loan(props) {
  const dispatch = useDispatch();

  const [show_operation, setOperation] = useState('1');
  const [loanexpanded, setLoanExpanded] = React.useState(true);
  const [borrower_expanded, setBorrowerExpanded] = React.useState(true);
  const {handleSubmit} = props;
  const onSubmit = (values) => {
    alert(JSON.stringify(values))
  };

  const handleLoanToggle = () => {
    setLoanExpanded(!loanexpanded);
  };
  const handleBorrowerToggle = () => {
    setBorrowerExpanded(!borrower_expanded);
  };

  const loadData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    await getAllLoan().then(loan_data => {
      dispatch(
        change(
          'Individual_Loan_Form',
          'application_no',
          `10${user_id}TB${moment().format('YYYYMMDD')}${loan_data.length + 1}`,
        ),
      );
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Text style={style.title_style}>Individual Loan Application</Text>
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
                        label={option.label}
                        value={option.value}
                        color="#000"
                        labelStyle={{marginLeft: 5}}
                      />
                    </View>
                  </RadioButton.Group>
                ))}
              </View>
              <Button
                onPress={handleSubmit(onSubmit)}
                mode="contained"
                buttonColor={'#6870C3'}
                style={style.btnStyle}>
                OK
              </Button>
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
                    name={'product_type'}
                    title={'Product Type'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    data={loan_type}
                    name={'application_no'}
                    title={'Type of Loan'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 300,
                    }}
                  />

                  <Field
                    name={'workplacePeriod'}
                    component={DatePicker}
                    label={'Application Date'}
                    icon={'calendar'}
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'application_no'}
                    title={'Loan Cycle'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                    keyboardType={'numeric'}
                  />

                  <Field
                    name={'application_no'}
                    title={'Loan Term'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'application_no'}
                    title={'Loan Apply Amount'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                    keyboardType={'numeric'}
                  />

                  <Field
                    name={'application_no'}
                    title={'Loan Code'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                  />
                </View>
              </View>
            </List.Accordion>

            {/* <List.Accordion
              expanded={borrower_expanded}
              onPress={handleBorrowerToggle}
              style={style.list_container}
              titleStyle={style.list_title}
              title="Borrower Info">
              <View style={style.sub_container}>
                <Field
                  data={borrower_type}
                  name={'curr_business_date_status'}
                  component={RadioButtonFile}
                />

                <Field
                  name={'customer_no'}
                  title={'Customer No'}
                  component={TextInputFile}
                  cus_width
                  input_mode
                  editable
                />
                <View style={style.sub_list_container}>
                  <Field
                    name={'nrc'}
                    title={'NRC'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                    handleTextInputFocus={showEmplyeeSearch}
                    focusTextInput
                  />

                  <Field
                    name={'application_no'}
                    title={'Borrower Name'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'application_no'}
                    title={'Saving Code'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                  />

                  <Field
                    name={'application_no'}
                    title={'Phone Number'}
                    component={TextInputFile}
                    cus_width
                    input_mode
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
                    name={'birthDate'}
                    component={DatePicker}
                    label={'date of birth'}
                    icon={'calendar'}
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    data={maritail_status}
                    name={'maritalStatus'}
                    title={'Maritial Status'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 300,
                    }}
                  />

                  <Field
                    name={'application_no'}
                    title={'Address'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'birthDate'}
                    component={DatePicker}
                    label={'Living Time in current address'}
                    icon={'calendar'}
                  />

                  <Field
                    name={'application_no'}
                    title={'Number of family'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'birthDate'}
                    component={DatePicker}
                    label={'Number of Students'}
                    icon={'calendar'}
                  />

                  <Field
                    name={'application_no'}
                    title={'Number of Students'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    data={condition_house}
                    name={'maritalStatus'}
                    title={'Condition of house'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 300,
                    }}
                  />

                  <Field
                    name={'application_no'}
                    title={'OwnerShip of business'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                  />
                </View>
              </View>
            </List.Accordion> */}
            <Borrower_Info/>
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
  form: 'Individual_Loan_Form',
  // validate,
})(connect(mapStateToProps, {})(Individual_Loan));
