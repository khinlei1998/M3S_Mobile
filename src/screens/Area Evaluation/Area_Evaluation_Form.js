import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableHighlight,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect, createRef } from 'react';
import DividerLine from '../../components/DividerLine';
import { reduxForm, Field, change, reset } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { storeAreaEvaluation } from '../../query/AreaEvaluation_query';
import {
  Button,
  RadioButton,
  List,
  Provider,
  Portal,
  Modal,
  TextInput,
} from 'react-native-paper';
import { operations } from '../../common';
import { style } from '../../style/Area_Evaluation_style';
import TextInputFile from '../../components/TextInputFile';
import DatePicker from '../../components/DatePicker';
import Area_Info from './Area_Info';
import Area_Evaluation from './Area_Evaluation';
import { area_evaluation_result } from '../../common';
import Area_Evaluation_Score from './Area_Evaluation_Score';
import { getAllLoan_By_application_no } from '../../query/AllLoan_query';
import { useNavigation } from '@react-navigation/native';

function Area_Evaluation_Form(props) {
  const navigation = useNavigation();

  const { handleSubmit, total_score } = props;
  const [show_operation, setOperation] = useState('1');
  const [total_sts_flag, setTotal_sts_flag] = useState('');

  const [area_evaluation_expanded, setAreaEvaluationExpanded] = useState(true);
  const retrive_loan_data = props.route.params.retrive_loan_data;

  const loadData = async () => {
    await getAllLoan_By_application_no(retrive_loan_data.application_no).then(
      indi_data => {
        let initialize_data = {
          application_no: retrive_loan_data.application_no,
          application_date: indi_data[0].application_date,
          borrower_nrc: indi_data[0].resident_rgst_id,
          borrower_name: indi_data[0].borrower_name,
          application_amt: indi_data[0].application_amt.toString()
            ? indi_data[0].application_amt.toString()
            : '',
          area_evaluation_no: retrive_loan_data.application_no.replace(
            /.*?(M)/,
            'AEM',
          ),
        };
        props.initialize(initialize_data);
      },
    );
    // setGuaranteeDate(moment().format('YYYY/MM/DD'))
  };
  useEffect(() => {
    loadData();
  }, []);

  const handleAreaEvaluationToggle = () => {
    setAreaEvaluationExpanded(!area_evaluation_expanded);
  };
  const onSubmit = async values => {
    const area_data = Object.assign({}, values, {
      total_sts_flag: total_sts_flag,
    });
    console.log('area_data', area_data);
    await storeAreaEvaluation(area_data).then(result => {
      if (result == 'success') {
        ToastAndroid.show(`Insert Success`, ToastAndroid.SHORT);
        navigation.goBack();
      }
    });
  };


  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                marginTop: 20,
                color: '#273050',
                fontWeight: 'bold',
              }}>
              Area Evaluation Form
            </Text>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
              (Attached To Application)
            </Text>
            <DividerLine />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 15,
              }}>
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
                        labelStyle={{ marginLeft: 5 }}
                      />
                    </View>
                  </RadioButton.Group>
                ))}
              </View>
            </View>
            <DividerLine />
            <List.Accordion
              expanded={area_evaluation_expanded}
              onPress={handleAreaEvaluationToggle}
              style={style.list_container}
              titleStyle={style.list_title}
              title="Borrower Info">
              <View style={style.sub_container}>
                <View style={style.sub_list_container}>
                  <Field
                    name={'application_no'}
                    title={'Application No'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                    require
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'resident_rgst_id'}
                    title={'Borrower NRC'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                  />

                  <Field
                    name={'borrower_name'}
                    title={'Borrower Name'}
                    component={TextInputFile}
                    cus_width
                    input_mode
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
                    editable
                  />

                  <Field
                    name={'application_date'}
                    component={DatePicker}
                    label={'Application Date'}
                    editable={true}
                  />
                </View>
              </View>
            </List.Accordion>
            <Area_Info />
            <Area_Evaluation setTotal_sts_flag={setTotal_sts_flag} />
            <Area_Evaluation_Score setTotal_sts_flag={setTotal_sts_flag} total_sts_flag={total_sts_flag} />
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
                  padding: 5,
                }}>
                <Icon name="paperclip" size={18} color="#fff" />
                Document Submit
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  );
}
function mapStateToProps(state) {
  return {
    total_score: state.loan.evaluation_score,
  };
}

export default reduxForm({
  form: 'Area_Evaluation_Form',
  initialValues: {
    total_sts_remark: '2',
  },
})(connect(mapStateToProps, {})(Area_Evaluation_Form));
